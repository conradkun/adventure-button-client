import React, {Component} from 'react';
import Box from 'grommet/components/Box';
import Header from 'grommet/components/Header';
import Anchor from 'grommet/components/Anchor';
import UserAdd from 'grommet/components/icons/base/UserAdd';
import Edit from 'grommet/components/icons/base/Edit';
import Trash from 'grommet/components/icons/base/Trash';
import UserAdmin from 'grommet/components/icons/base/UserAdmin';
import Tiles from 'grommet/components/Tiles';
import Heading from 'grommet/components/Heading';
import Meter from 'grommet/components/Meter';
import Value from 'grommet/components/Value';


import Card from 'grommet/components/Card';
class CaseCard extends Component {
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
          <b>Icon here</b>
        </Box>
      </Header>
    );

    let savesCards;
    if(this.props.cas.saves instanceof Array){
      savesCards = this.props.cas.saves.map((save) => {
        let header = (
          <Header>
            <Heading strong={false} tag='h3'>
              {save.miniApp}
            </Heading>

            <Box responsive={false} flex={true} justify='end' align="center" pad={{
              between: "small"
            }} direction='row'>
              Icons
            </Box>
          </Header>
        )
        return (<Card basis="full" className="subQuest" colorIndex="light-1" key={save._id} heading={header}/>)
      });
    } else {
      const save = this.props.cas.saves;
      let header = (
        <Header>
          <Heading strong={false} tag='h3'>
            {save.miniApp}
          </Heading>

          <Box responsive={false} flex={true} justify='end' align="center" pad={{
            between: "small"
          }} direction='row'>
            Icons
          </Box>
        </Header>
      )
      savesCards = <Card basis="full" className="subQuest" colorIndex="light-1" key={save._id} heading={header}/>
    }


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
