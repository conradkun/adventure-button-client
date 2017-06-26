import React, {Component} from 'react';
import Box from 'grommet/components/Box';
import Button from 'grommet/components/Button';
import Search from 'grommet/components/Search';
import Header from 'grommet/components/Header';
import Anchor from 'grommet/components/Anchor';
import Title from 'grommet/components/Title';
import Add from 'grommet/components/icons/base/Add';
import Close from 'grommet/components/icons/base/Close';
import MenuIcon from 'grommet/components/icons/base/Menu';
import LinkPrevious from 'grommet/components/icons/base/LinkPrevious';
import Tiles from 'grommet/components/Tiles';
import Tile from 'grommet/components/Tile';
import Card from 'grommet/components/Card';
import ListPlaceholder from 'grommet-addons/components/ListPlaceholder';

import AppSettings from '../utils/app_settings';
import CaseCard from '../components/cases/case_card';
import ExpandModal from '../components/cases/expand_modal';
import WarnModal from '../components/cases/warn_modal';
import EditModal from '../components/cases/edit_modal';
import DeleteModal from '../components/cases/delete_modal';
import {miniApps} from '../miniApps';
import Viewer from '../components/miniApps/viewer/viewer';
import Spinner from 'react-spinkit';
//import {sleep} from 'wait-promise';

class Cases extends Component {

  constructor(props) {
    super(props);
    /**
    * Event Listeners
    **/
    const client = props.client;
    const cases = client.service('cases');
    const saves = client.service('saves');
    cases.on('patched', cas => {
      const newCasesList = this.state.cases.filter((c) => {return c._id !== cas._id});
      newCasesList.push(cas);
      this.setState({
        cases: newCasesList
      })
    });
    cases.on('created', cas => {
        if(cas.saves){
          this.setState({
            cases:  [...this.state.cases, cas]
          })
        }
      }
    )
    cases.on('removed', cas => {
      const newCasesList = this.state.cases.filter((c) => {return c._id !== cas._id});
      this.setState({
        cases: newCasesList
      })
    });
    saves.on('patched',  save => {
      this._load();
    });
    saves.on('created', save => {
      this._load();
    });
    saves.on('removed', save => {
      this._load();
    });


    this._onSearch = this._onSearch.bind(this);
    this._getCases = this._getCases.bind(this);
    this._load = this._load.bind(this);
    this._renderHeader = this._renderHeader.bind(this);
    this._renderContent = this._renderContent.bind(this);
    this._getMiniApp = this._getMiniApp.bind(this);
    this._onRequestForExpand = this._onRequestForExpand.bind(this);
    this._onRequestForExpandClose = this._onRequestForExpandClose.bind(this);
    this._onRequestForEdit = this._onRequestForEdit.bind(this);
    this._onRequestForEditClose = this._onRequestForEditClose.bind(this);
    this._onRequestForDeleteCase = this._onRequestForDeleteCase.bind(this);
    this._onDeleteCase = this._onDeleteCase.bind(this);

    this.state = {
      isLoading: true,
      cases: [],
      searchString: "",
      expand: false,
      warn: false,
      edit: false
    }
  }

  componentDidMount() {
    //TODO Fix the setState console.error();
    this._load();
  }

  _getMiniApp(code) {
    let miniApp = undefined;
    miniApps.forEach((ma) => {
      if (ma.code === code) {
        miniApp = ma;
      }
    });
    return miniApp;
  }

  _getCases(query={
    query: {
      $limit: 10,
      $sort: {
        createdAt: -1
      }
    }
  }){
    return new Promise((resolve,reject)=>{
      const client = this.props.client;
      const cases = client.service('cases');
      let casesList = [];
      Promise.all([cases.find(query)])
      .then((data)=>{
        data[0].data.forEach((data)=>{
          casesList.push(data);
        });
        resolve(casesList);
      })
    });
  }

  _load() {
    this._getCases()
    .then((cl)=>{
      this.setState({
        isLoading: false,
        cases: cl
      })
    })
  }

  _onRequestForExpand(code, value, result){
    const miniApp = this._getMiniApp(code);
    const computedResult = miniApp.compute(this.props.client.get('organisation').settings, value);
    const equal = this._checkResult(result, computedResult);
    this.setState({
      expand: true,
      expandDBResult: result,
      expandResult: computedResult,
      expandEqual: equal
    })
  }

  _onRequestForExpandClose(){
    this.setState({
      expand: false,
      expandDBResult: undefined,
      expandResult : undefined,
      expandEqual: undefined
    })
  }

  _checkResult(result, DBResult){
    let resultValueArray = [];
    let DBResultValueArray=  [];
    result.forEach((r)=>{
      resultValueArray.push(r.value);
    })
    resultValueArray.sort();
    DBResult.forEach((r)=>{
      DBResultValueArray.push(r.value);
    })
    DBResultValueArray.sort();
    return JSON.stringify(resultValueArray) === JSON.stringify(DBResultValueArray);
  }

  _onRequestForEdit(id, code, value, result){
    const miniApp = this._getMiniApp(code);
    const computedResult = miniApp.compute(this.props.client.get('organisation').settings, value);
    const equal = this._checkResult(result, computedResult);
    if(!equal){
      this.setState({
        warn: true,
        editId: id,
        editCode: code,
        editValue: value
      })
    }
    else {
      this.setState({
        edit: true,
        editId: id,
        editCode: code,
        editValue: value
      })
    }
  }

  _onRequestForEditClose(){
    this.setState({
      edit: false,
      editId: undefined,
      editCode: undefined,
      editValue: undefined
    })
  }
  _onRequestForDeleteCase(id){
    this.setState({
      delete: true,
      deleteId:id
    });
  }
  _onDeleteCase(){
    const client = this.props.client
    const cases = client.service('cases');
    cases.remove(this.state.deleteId)
    .then(()=>{
      this.setState({
        delete: false
      });
      this.props.msg.success("Supprimé!")
    })
  }
  _compareWithCreatedAt(a, b) {
    return new Date(a.createdAt) < new Date(b.createdAt);
  }

  _onSearch(e){
    if(e.target.value === ''){
      this._getCases()
      .then((cl)=>{
        this.setState({
          cases: cl
        })
      })
    }
    else {
      let query={
        query:{
          name:{
            $search: e.target.value
          },
          $limit: 10
        }
      }
      this._getCases(query)
      .then((cl)=>{
        this.setState({
          cases: cl
        })
      })
    }
  }

  _renderContent() {
    let cards;
    let cases = this.state.cases;
    cards = cases.map((c) => {
      return (
        <CaseCard key={c._id} client={this.props.client} msg={this.props.msg} onExpand={this._onRequestForExpand} onEdit={this._onRequestForEdit} onDeleteCase={this._onRequestForDeleteCase} responsive={this.props.responsive} cas={c}/>
      )
    });

    let modal;
    if(this.state.expand){
      modal = <ExpandModal result={this.state.expandResult} DBResult={this.state.expandDBResult} equal={this.state.expandEqual} onClose={this._onRequestForExpandClose}/>
    }
    else if(this.state.warn){
      modal = <WarnModal onSubmit={()=>{ this.setState({warn: false, edit: true})}} onClose={()=>{this.setState({warn: false}); this._onRequestForEditClose()}}/>
    }
    else if(this.state.edit){
      modal = <EditModal code={this.state.editCode} id={this.state.editId} value={this.state.editValue} client={this.props.client} responsive={this.props.responsive} onClose={this._onRequestForEditClose}
        msg={this.props.msg}/>
    } else if(this.state.delete){
      modal = <DeleteModal onClose={()=>{this.setState({delete: false})}} onSubmit={()=>{ this._onDeleteCase()}}/>
    }
    return (
      <Box colorIndex={AppSettings.backgroundColor} margin='large'>
        <ListPlaceholder addControl={<Button icon={<Add style={{stroke :'#FFF'}}/>}
          label='Effectuer un calcul de frais'
          path='/app'
          primary={true}
          a11yTitle='Effectuer un calcul de frais' />}
          emptyMessage="Vous n'avez aucun dossier pour le moment, sauvegarder un calcul de frais pour en créer un."
          unfilteredTotal={this.state.cases.length}
          filteredTotal={1} />
        <Tiles fill={true}
               flush={false}
               responsive={false}
               >
          {cards}
        </Tiles>
        {modal}
      </Box>
    )
  }

  _renderHeader() {
    /**
         * First create the header and add some button if the user is mobile
         */
    let appLogo;
    let title = (
      <Title pad='small' responsive={true}>
        <Box align='center' direction='row'>
          <span>Dossiers</span>
        </Box>
      </Title>
    );
    let mobileButton;
    let search;
    let colorIndex = 'light-1';
    let justify = 'between';
    if ('single' === this.props.responsive) {
      justify = 'end';
      appLogo = this.props.renderAppLogo();
      colorIndex = AppSettings.mainColor;
      mobileButton = (
        <Anchor icon={< MenuIcon />} onClick={this.props.onMenuOpen}></Anchor>
      );
    }
    search = (<Search inline={true} fill={true} size='medium' placeHolder='Rechercher' defaultValue={this.state.searchString} dropAlign={{
      "right": "right"
    }} onDOMChange={this._onSearch} />);
    return (
      <Header size='small' className="drop-shadow-bottom" colorIndex={colorIndex} fixed={true}>
        {appLogo}
        <Box flex={true} justify={justify} pad="small" direction='row' responsive={false}>
          {title}
          {search}
          {mobileButton}
        </Box>
      </Header>
    );
  }

  render() {
    let loader = (
      <Box margin='large' direction='column' align='center' justify='center' alignContent='center'>
        <Spinner spinnerName="double-bounce"/>
      </Box>
    );
    return (
      <Box full='vertical' colorIndex={AppSettings.backgroundColor}>
        {this._renderHeader()}
        {this.state.isLoading
          ? loader
          : this._renderContent()}
      </Box>
    )
  }
}

export default Cases
