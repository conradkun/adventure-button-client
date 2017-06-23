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
import miniApps from '../miniApps';
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


    this._search = this._search.bind(this);
    this._getCases = this._getCases.bind(this);
    this._load = this._load.bind(this);
    this._renderHeader = this._renderHeader.bind(this);
    this._renderContent = this._renderContent.bind(this);
    this._getMiniApp = this._getMiniApp.bind(this);
    this._onRequestForExpand = this._onRequestForExpand.bind(this);
    this._onRequestForExpandClose = this._onRequestForExpandClose.bind(this);

    this.state = {
      isLoading: true,
      cases: [],
      searchString: "",
      expand: false,
      expandResult: undefined
    }
  }

  componentDidMount() {
    //TODO Fix the setState console.error();
    this._load();
  }

  _search(cas) {
    let name = cas.name;
    return name.toLowerCase().indexOf(this.state.searchString.toLowerCase()) !== -1;
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

  _onRequestForExpand(code, value){
    const miniApp = this._getMiniApp(code);
    this.setState({
      expand: true,
      expandResult: miniApp.compute(this.props.client.get('organisation').settings, value)
    })
  }
  _onRequestForExpandClose(){
    this.setState({
      expand: false,
      expandResult : undefined
    })
  }
  _compareWithCreatedAt(a, b) {
    return new Date(a.createdAt) < new Date(b.createdAt);
  }

  _renderContent() {
    let cards;
    let cases = this.state.cases;
    cards = cases.map((c) => {
      return (
        <CaseCard key={c._id} client={this.props.client} msg={this.props.msg} onExpand={this._onRequestForExpand} cas={c}/>
      )
    });

    let modal;
    if(this.state.expand){
      modal = <ExpandModal value={this.state.expandResult} onClose={this._onRequestForExpandClose}/>
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
    }} onDOMChange={(e) => {
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
    }}/>);
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
