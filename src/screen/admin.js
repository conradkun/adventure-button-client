import React, {Component} from 'react';
import Box from 'grommet/components/Box';
import Search from 'grommet/components/Search';
import Header from 'grommet/components/Header';
import Anchor from 'grommet/components/Anchor';
import Title from 'grommet/components/Title';
import Add from 'grommet/components/icons/base/Add';
import Edit from 'grommet/components/icons/base/Edit';
import Close from 'grommet/components/icons/base/Close';
import MenuIcon from 'grommet/components/icons/base/Menu';
import LinkPrevious from 'grommet/components/icons/base/LinkPrevious';
import Tiles from 'grommet/components/Tiles';
import Tile from 'grommet/components/Tile';
import Card from 'grommet/components/Card';
import AppSettings from '../utils/app_settings';
import AddUserModal from '../components/admin/add_user_modal';
import EditUserModal from '../components/admin/edit_user_modal';
import DeleteUserModal from '../components/admin/delete_user_modal';
import AddOrganisationModal from '../components/admin/add_organisation_modal';
import EditOrganisationModal from '../components/admin/edit_organisation_modal';
import DeleteOrganisationModal from '../components/admin/delete_organisation_modal';
import OrganisationCard from '../components/admin/organisation_card';
import Spinner from 'react-spinkit';
import {sleep} from 'wait-promise';

class Admin extends Component {

  constructor(props) {
    super(props);
    const client = props.client;
    const organisation = client.service('organisation');
    const users = client.service('users');
    //TODO Write the updated and patched method for users and org
    //organisation.on('updated', message => this._load());
    //organisation.on('patched', message => this._load());
    organisation.on('created', org => this.setState({
      organisations:  [...this.state.organisations, org]
    }))
    organisation.on('removed', org => {
      const newOrgnisationList = this.state.organisations.filter((o) => {return o._id !== org._id});
      this.setState({
        organisations: newOrgnisationList
      })
    });
    //users.on('updated', message => this._load());
    //users.on('patched', message => this._load());
    users.on('created', user => this.setState({
      users:  [...this.state.users, user]
    }));
    users.on('removed', user => {
      const newUserList = this.state.users.filter((u) => {return u._id !== user._id});
      this.setState({
        users: newUserList
      })
    });
    this._onRequestForAddUser = this._onRequestForAddUser.bind(this);
    this._onRequestForAddUserClose = this._onRequestForAddUserClose.bind(this);
    this._onRequestForEditUser = this._onRequestForEditUser.bind(this);
    this._onRequestForEditUserClose = this._onRequestForEditUserClose.bind(this);
    this._onRequestForDeleteUser = this._onRequestForDeleteUser.bind(this);
    this._onRequestForDeleteUserClose = this._onRequestForDeleteUserClose.bind(this);
    this._onRequestForPromoteUser = this._onRequestForPromoteUser.bind(this);

    this._onAddUser = this._onAddUser.bind(this);
    this._onEditUser = this._onEditUser.bind(this);
    this._onDeleteUser = this._onDeleteUser.bind(this);



    this._onRequestForAddOrganisation = this._onRequestForAddOrganisation.bind(this);
    this._onRequestForAddOrganisationClose = this._onRequestForAddOrganisationClose.bind(this);
    this._onRequestForEditOrganisation = this._onRequestForEditOrganisation.bind(this);
    this._onRequestForEditOrganisationClose = this._onRequestForEditOrganisationClose.bind(this);
    this._onRequestForDeleteOrganisation = this._onRequestForDeleteOrganisation.bind(this);
    this._onRequestForDeleteOrganisationClose = this._onRequestForDeleteOrganisationClose.bind(this);

    this._onAddOrganisation = this._onAddOrganisation.bind(this);
    this._onEditOrganisation = this._onEditOrganisation.bind(this);
    this._onDeleteOrganisation = this._onDeleteOrganisation.bind(this);




    this._search = this._search.bind(this);
    this._load = this._load.bind(this);
    this._renderHeader = this._renderHeader.bind(this);
    this._renderContent = this._renderContent.bind(this);
    this.state = {
      isLoading: true,
      organisations: [],
      users: [],
      searchString: "",
      addUser: false,
      editUser: false,
      deleteUser: false,
      addUserOption: {
        organisation: undefined
      },
      editUserOption: {
        id: undefined,
        email: undefined,
        role: undefined
      },
      deleteUserOption: {
        id: undefined,
        email: undefined
      },
      addOrganisation: false,
      editOrganisation: false,
      deleteOrganisation: false,
      editOrganisationOption: {
        id: undefined,
        name: undefined,
        seats: undefined
      },
      deleteOrganisationOption: {
        id: undefined,
        name: undefined
      }
    }
  }

  componentDidMount() {
    //TODO Fix the setState console.error();
    this._load();
  }

  _onRequestForAddUser(organisation = this.state.addUserOption.organisation) {
    this.setState({
      addUserOption: {
        organisation: organisation
      },
      addUser: true
    });
  }

  _onRequestForAddUserClose() {
    this.setState({addUser: false});
  }

  _onAddUser(User) {
    const client = this.props.client;
    const users = client.service('users');
    users.create({email: User.email, password: User.password, role: User.role, organisation: User.organisation}).then(this.setState({addUser: false}));
    this.setState({addUser: false});
  }

  _onRequestForPromoteUser(id, newRole){
    const client = this.props.client;
    const users = client.service('users');
    users.patch(id, {
      role: newRole
    });
  }

  _onRequestForEditUser() {
    this.setState({editUser: true});
  }

  _onRequestForEditUserClose() {
    this.setState({editUser: false});
  }

  _onEditUser(id, User) {
    //TODO Implement user edit
    this.setState({editUser: false});
  }

  _onRequestForDeleteUser(id = this.state.deleteUserOption.id, email = this.state.deleteUserOption.email) {
    this.setState({
      deleteUserOption:{
        id: id,
        email: email
      },
      deleteUser: true
    });
  }

  _onRequestForDeleteUserClose() {
    this.setState({deleteUser: false});
  }

  _onDeleteUser(id) {
    const client = this.props.client;
    const users = client.service('users');
    users.remove(id).then(this.setState({deleteUser: false}));
  }

  _onRequestForAddOrganisation() {
    this.setState({addOrganisation: true});
  }

  _onRequestForAddOrganisationClose() {
    this.setState({addOrganisation: false});
  }

  _onAddOrganisation(Organisation) {
    const client = this.props.client;
    const organisation = client.service('organisation');
    organisation.create({name: Organisation.name, seats: Organisation.seats}).then(this.setState({addOrganisation: false}))
  }

  _onRequestForEditOrganisation(id=this.state.editOrganisationOption.id, name=this.state.editOrganisationOption.name, seats=this.editOrganisationOption.seats) {
    this.setState({
      editOrganisation: true,
      editOrganisationOption: {
        id: id,
        name: name,
        seats: seats
      }
    });
  }

  _onRequestForEditOrganisationClose() {
    this.setState({editOrganisation: false});
  }

  _onEditOrganisation(id, Organisation) {
    const client = this.props.client;
    const organisation = client.service('organisation');
    organisation.patch(id, {name: Organisation.name, seats: Organisation.seats}).then(this.setState({editOrganisation: false}))
  }

  _onRequestForDeleteOrganisation(id=this.deleteOrganisationOption.id, name=this.deleteOrganisationOption.name) {
    this.setState({
        deleteOrganisation: true,
        deleteOrganisationOption: {
          id: id,
          name: name
        }
    });
  }

  _onRequestForDeleteOrganisationClose() {
    this.setState({deleteOrganisation: false});
  }

  _onDeleteOrganisation(id) {
    const client = this.props.client;
    const organisation = client.service('organisation');
    organisation.remove(id).then(this.setState({deleteOrganisation: false}))
  }
  _search(organisation) {
    let name = organisation.name;
    return name.toLowerCase().indexOf(this.state.searchString.toLowerCase()) !== -1;
  }
  _load() {
    const client = this.props.client;
    const organisation = client.service('organisation');
    const users = client.service('users');
    /**
    setTimeout(
      () => {
        this.setState({
          isLoading: false,
          organisations: [
            {
              _id: 'ffff',
              name: 'TEST',
              seats: 4
            }
          ]
        })
      }
      , 5000);
      **/
    Promise.all([organisation.find(), users.find()]).then((data) => {
      this.setState({
        isLoading: false,
        organisations: data[0].data,
        users: data[1].data
      })
    })
  }

  _renderContent() {
    let cards;
    cards = this.state.organisations.filter(this._search).map((org) => {
      let users = this.state.users.filter((u) => {return u.organisation === org._id});
      return (
        <OrganisationCard users={users} key={org._id} id={org._id} name={org.name} seats={org.seats} onAddUser={this._onRequestForAddUser} onEditOrganisation={this._onRequestForEditOrganisation} onDeleteOrganisation={this._onRequestForDeleteOrganisation} onDeleteUsers={this._onRequestForDeleteUser}/>
      )
    })


    let modal;
    if (this.state.addUser) {
      modal = <AddUserModal msg={this.props.msg} organisation={this.state.addUserOption.organisation} onClose={this._onRequestForAddUserClose} onSubmit={this._onAddUser}/>

    } else if (this.state.editUser) {
      modal = <EditUserModal id={this.state.editUserOption.id} email={this.state.editUserOption.email} role={this.state.editUserOption.role} onClose={this._onRequestForEditUserClose} onSubmit={this._onEditUser}/>
    } else if (this.state.deleteUser) {
      modal = <DeleteUserModal onClose={this._onRequestForDeleteUserClose} id={this.state.deleteUserOption.id} email={this.state.deleteUserOption.email} onSubmit={this._onDeleteUser}/>
    } else if (this.state.addOrganisation) {
      modal = <AddOrganisationModal onClose={this._onRequestForAddOrganisationClose} onSubmit={this._onAddOrganisation}/>

    } else if (this.state.editOrganisation) {
      modal = <EditOrganisationModal id={this.state.editOrganisationOption.id} name={this.state.editOrganisationOption.name} seats={this.state.editOrganisationOption.seats} onClose={this._onRequestForEditOrganisationClose} onSubmit={this._onEditOrganisation}/>
    } else if (this.state.deleteOrganisation) {
      modal = <DeleteOrganisationModal onClose={this._onRequestForDeleteOrganisationClose} id={this.state.deleteOrganisationOption.id} name={this.state.deleteOrganisationOption.name} onSubmit={this._onDeleteOrganisation}/>
    }

    return (
      <Box colorIndex={AppSettings.backgroundColor} margin='small'>
        <Tiles fill={true}
               flush={false}>
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
          <span>Administration</span>
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
      this.setState({searchString: e.target.value})
    }}/>);
    return (
      <Header size='small' className="drop-shadow-bottom" colorIndex={colorIndex} fixed={true}>
        {appLogo}
        <Box flex={true} justify={justify} pad="small" direction='row' responsive={false}>
          {title}
          {search}
          <Anchor icon={< Add />} onClick={this._onRequestForAddOrganisation}/> {mobileButton}
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

export default Admin
