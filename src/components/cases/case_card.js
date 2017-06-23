import React, {Component} from 'react';
import Box from 'grommet/components/Box';
import Header from 'grommet/components/Header';
import Anchor from 'grommet/components/Anchor';
import UserAdd from 'grommet/components/icons/base/UserAdd';
import Edit from 'grommet/components/icons/base/Edit';
import Expand from 'grommet/components/icons/base/Expand';
import Trash from 'grommet/components/icons/base/Trash';
import Close from 'grommet/components/icons/base/Close';
import Tiles from 'grommet/components/Tiles';
import Heading from 'grommet/components/Heading';
import Meter from 'grommet/components/Meter';
import Value from 'grommet/components/Value';


import Card from 'grommet/components/Card';
class CaseCard extends Component {

  constructor(props){
    super(props);
    this._deleteSave = this._deleteSave.bind(this);
    this._deleteCase = this._deleteCase.bind(this);
  }

  _deleteCase(){
    const client = this.props.client
    const cases = client.service('cases');
    cases.remove(this.props.cas._id)
    .then(()=>{
      this.props.msg.success("Supprimé!")
    })
  }
  _deleteSave(id){
    const client = this.props.client
    const saves = client.service('saves');
    const cases = client.service('cases');
    if(!(this.props.cas.saves) || !(this.props.cas.saves instanceof Array)){
      cases.remove(this.props.cas._id)
      .then(()=>{
        this.props.msg.success("Supprimé!")
      })
    }
    else {
      saves.remove(id)
      .then(()=>{
        this.props.msg.success("Supprimé!")
      })
    }
  }

  render() {
    if(!this.props.cas.saves){
      return <b>Damn</b>
    }
    let header = (
      <Header>
        <Box flex={true} responsive={true} justify='end' align="start" pad={{
          between: "small"
        }} direction='column'>
        <Heading strong={true} tag='h2'>
          {this.props.cas.name}
        </Heading>
      </Box>
        <Box flex={true} responsive={false} justify='end' align="center" pad={{
          between: "medium"
        }} direction='row' disabled={false}>
        <Anchor icon={< Trash />} onClick={() => {
          this._deleteCase();
        }} animateIcon={true} primary={true}/>
        </Box>
      </Header>
    );

    let savesCards;
    let saves = this.props.cas.saves;
    if(!(saves instanceof Array))
      saves = [saves]

    savesCards = saves.map((save) => {
      let header = (
        <Header>
          <Heading strong={false} tag='h3'>
            {save.miniAppName}
          </Heading>

          <Box responsive={false} flex={true} justify='end' align="center" pad={{
            between: "small"
          }} direction='row'>
          <Anchor icon={< Expand />} onClick={() => {
            this.props.onExpand(save.miniAppCode, save.value);
          }} animateIcon={true} primary={false}/>
          <Anchor icon={< Close />} onClick={() => {
            this._deleteSave(save._id);
          }} animateIcon={true} primary={false}/>
          </Box>
        </Header>
      )
      return (<Card basis="full" colorIndex="light-1" key={save._id} heading={header}/>)
    });

    let description = (
      <Tiles fill={true}>
        {savesCards}
      </Tiles>
    )
    return (<Card margin={{
      top: 'large'
    }} responsive={false} className="drop-shadow" basis="full" colorIndex="light-1" key={this.props.name} heading={header} description={description}/>)
  }

}
export default CaseCard;
