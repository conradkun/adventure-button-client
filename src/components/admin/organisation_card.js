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
class OrganisationCard extends Component {
  render() {

    let canAddUser = true;

    if(this.props.userCount >= this.props.seats){
      canAddUser = false;
    }

    let header = (
      <Header>
        <Box flex={true} responsive={true} justify='end' align="start" pad={{
          between: "small"
        }} direction='column'>
        <Heading strong={true} tag='h2'>
          {this.props.name}
        </Heading>
        <Box>
          <Value value={`${this.props.userCount}/${this.props.seats}`} units={'Utilisateur(s)'} size='small' align='start' responsive={true}/>
          <Meter vertical={false} size='small' value={this.props.userCount} max={this.props.seats} responsive={true}/>
        </Box>
      </Box>
        <Box flex={true} responsive={false} justify='end' align="center" pad={{
          between: "medium"
        }} direction='row' disabled={false}>

          <Anchor icon={< UserAdd />} disabled={!canAddUser} onClick={() => {
            if(canAddUser){
            this.props.onAddUser(this.props.id)
            }
          }} animateIcon={true} primary={true}/>
          <Anchor icon={< Edit />} onClick={() => {
            this.props.onEditOrganisation(this.props.id, this.props.name, this.props.seats, this.props.userCount)
          }} primary={true} animateIcon={true}/>
          <Anchor icon={< Trash />} onClick={() => {
            this.props.onDeleteOrganisation(this.props.id, this.props.name)
          }} animateIcon={true} primary={true}/>
        </Box>
      </Header>
    );
    let usersCards = this.props.users.map((user) => {
      let header = (
        <Header>
          <Heading strong={false} tag='h3'>
            {user.email}
          </Heading>

          <Box responsive={false} flex={true} justify='end' align="center" pad={{
            between: "small"
          }} direction='row'>
            <Anchor icon={< UserAdmin size = 'xsmall' />} onClick={() => {
              this.props.onPromoteUser(user._id, (user.role !== 'manager'))
            }} animateIcon={true} primary={(user.role === 'manager')}/>
            <Anchor icon={< Trash size = 'xsmall' />} onClick={() => {
              this.props.onDeleteUser(user._id, user.email)
            }} animateIcon={true} primary={false}/>
          </Box>
        </Header>
      )
      return (<Card basis="full" className="subQuest" colorIndex="light-1" key={user._id} heading={header}/>)
    });
    let description = (
      <Tiles fill={true}>
        {usersCards}
      </Tiles>
    )
    return (<Card basis="full" className="drop-shadow" margin="small" colorIndex="light-1" pad="small" key={this.props.name} heading={header} description={description}/>)
  }

}
export default OrganisationCard;
