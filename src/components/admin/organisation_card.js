import React, {Component} from 'react';
import Box from 'grommet/components/Box';
import Header from 'grommet/components/Header';
import Anchor from 'grommet/components/Anchor';
import UserAdd from 'grommet/components/icons/base/UserAdd';
import Edit from 'grommet/components/icons/base/Edit';
import Trash from 'grommet/components/icons/base/Trash';
import Checkmark from 'grommet/components/icons/base/Checkmark';
import Tiles from 'grommet/components/Tiles';
import Heading from 'grommet/components/Heading';


import Card from 'grommet/components/Card';
class OrganisationCard extends Component {
  render() {
    let header = (
            <Header>
                <Heading strong={true}
                         tag='h2'>
                    {this.props.name}
                </Heading>
                <Box
                    flex={true}
                    responsive={false}
                    justify='end'
                    align="center"
                    pad={{between: "medium"}}
                    direction='row'
                    disabled={false}>

                    <Anchor icon={<UserAdd />}
                            onClick={()=>{this.props.onAddUser(this.props.id)}}
                            animateIcon={true}
                            primary={true}
                            />
                    <Anchor icon={<Edit />}
                            onClick={()=>{this.props.onEditOrganisation(this.props.id, this.props.name, this.props.seats)}}
                            primary={true}
                            animateIcon={true}
                            />
                          <Anchor icon={<Trash />}
                            onClick={()=>{this.props.onDeleteOrganisation(this.props.id, this.props.name)}}
                            animateIcon={true}
                            primary={true}
                            />
                </Box>
            </Header>
        );
      let usersCards = this.props.users.map((user) => {
        let header = (
            <Header>
                <Heading strong={false}
                         tag='h3'>
                    {user.email}
                </Heading>
                <Box
                    responsive={false}
                    flex={true}
                    justify='end'
                    align="center"
                    pad={{between: "small"}}
                    direction='row'>
                    <Anchor icon={<Trash size='xsmall'/>}
                      onClick={()=>{this.props.onDeleteUsers(user._id, user.email)}}
                      animateIcon={true}
                      primary={false}
                      />
                </Box>
            </Header>
          )
          return (
              <Card basis="full" className="subQuest" colorIndex="light-1" key={user._id} heading={header}/>
          )
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
