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

class UserCard extends Component {
  render() {
     let deleteUserButton = (
      <Anchor icon={< Trash />} onClick={() => {
          this.props.onDeleteUser(this.props.id, this.props.email)
      }} animateIcon={true} primary={true}/>
    );
    if (this.props.me){
      deleteUserButton = undefined;
    }
    let header = (
      <Header>
        <Box flex={true} responsive={true} justify='end' align="start" pad={{
          between: "small"
        }} direction='column'>
        <Heading strong={true} tag='h2'>
          {this.props.email}
        </Heading>

      </Box>
        <Box flex={true} responsive={false} justify='end' align="center" pad={{
          between: "medium"
        }} direction='row' disabled={false}>
        {deleteUserButton}
        </Box>
      </Header>
      );
      return (<Card margin={{
        top: 'large'
      }} responsive={false} className="drop-shadow" basis="full" colorIndex="light-1" key={this.props.email} heading={header}/>)
  }

}
export default UserCard;
