import React, {Component} from 'react';
import Box from 'grommet/components/Box';
import Header from 'grommet/components/Header';
import Anchor from 'grommet/components/Anchor';
import Title from 'grommet/components/Title';
import UserAdd from 'grommet/components/icons/base/UserAdd';
import MenuIcon from 'grommet/components/icons/base/Menu';
import Search from 'grommet/components/Search';
import Value from 'grommet/components/Value';
import Meter from 'grommet/components/Meter';
import Tiles from 'grommet/components/Tiles';
import AppSettings from '../utils/app_settings';
import AddUserModal from '../components/usersAdmin/add_user_modal';
import EditUserModal from '../components/usersAdmin/edit_user_modal';
import DeleteUserModal from '../components/usersAdmin/delete_user_modal';
import UserCard from '../components/usersAdmin/user_card';
import Spinner from 'react-spinkit';

class UsersAdmin extends Component {

    constructor(props) {
        super(props);

        const client = props.client;
        const users = client.service('users');
        users.on('patched',  user => {
          let newUserList = this.state.users.filter((u) => {return u._id !== user._id});
          newUserList.push(user);
          this.setState({
            users: newUserList
          })
        });
        users.on('created', user => this.setState({
          users:  [...this.state.users, user]
        }));
        users.on('removed', user => {
          let newUserList = this.state.users.filter((u) => {return u._id !== user._id});
          this.setState({
            users: newUserList
          })
        });


        this._onRequestForAdd = this._onRequestForAdd.bind(this);
        this._onRequestForAddClose = this._onRequestForAddClose.bind(this);
        this._onRequestForEdit = this._onRequestForEdit.bind(this);
        this._onRequestForEditClose = this._onRequestForEditClose.bind(this);
        this._onRequestForDelete = this._onRequestForDelete.bind(this);
        this._onRequestForDeleteClose = this._onRequestForDeleteClose.bind(this);
        //this._onRequestForDelete = this._onRequestForDelete.bind(this);
        this._onAddUser = this._onAddUser.bind(this);
        this._onEditUser = this._onEditUser.bind(this);
        this._onDeleteUser = this._onDeleteUser.bind(this);
        this._search = this._search.bind(this);

        this.state = {
            searchString: '',
            isLoading: true,
            addUser: false,
            editUser: false,
            deleteUser: false,
            users: [],
            editOption: {
                email: undefined,
                organisation: undefined,
                role: undefined
            },
            deleteOption:{
                id: undefined,
                email: undefined
            }
        }
    }

    componentDidMount() {
      //TODO Fix the setState console.error();
      this._load();
    }

    _load() {
      const client = this.props.client;
      const users = client.service('users');
      users.find().then((data) => {
        this.setState({
          isLoading: false,
          users: data.data
        })
      })
    }

    _onRequestForAdd () {
        this.setState({addUser: true});
    }

    _onRequestForAddClose () {
        this.setState({addUser: false});
    }

    _onAddUser (User) {
        this.setState({addUser: false});
        const client = this.props.client;
        const users = client.service('users');
        if(User.password){
          users.create({email: User.email, password: User.password}).then(this.setState({addUser: false}));
        }
        else{
          users.create({email: User.email}).then(this.setState({addUser: false}));
        }
    }

    _onRequestForEdit () {
        this.setState({editUser: true});
    }

    _onRequestForEditClose () {
        this.setState({editUser: false});
    }

    _onEditUser (user) {
        this.setState({editUser: false});
    }

    _onRequestForDelete (id, email) {
        this.setState({
          deleteOption: {
            id: id,
            email: email
          }
        })
        this.setState({deleteUser: true});
    }

    _onRequestForDeleteClose () {
        this.setState({deleteUser: false});
    }

    _onDeleteUser (id) {
        const client = this.props.client;
        const users = client.service('users');
        users.remove(id).then(this.setState({deleteUser: false}));
    }

    _search(user){
        let email = user.email;
        if(email){
          return email.toLowerCase().indexOf(this.state.searchString.toLowerCase()) !== -1;
        }
        else{
          console.log(user);
          return false;
        }
    }

    _compareWithCreatedAt(a, b) {
      return new Date(a.createdAt) < new Date(b.createdAt);
    }

    _renderContent() {

        let modal;
        if (this.state.addUser) {
            modal = (
                <AddUserModal    msg={this.props.msg}
                                 onClose={this._onRequestForAddClose}
                                 onSubmit={this._onAddUser} />
            );
        } else if (this.state.editUser){
            modal = <EditUserModal email={this.state.edit.email}
                                   organisation={this.state.edit.organisation}
                                   organisationName={this.state.edit.organisationName}
                                   role={this.state.edit.role}
                                   onClose={this._onRequestForEditClose}
                                   onSubmit={this._onEditUser}/>
        } else if (this.state.deleteUser){
            modal = <DeleteUserModal
                                  msg={this.props.msg}
                                  onClose={this._onRequestForDeleteClose}
                                  email={this.state.deleteOption.email}
                                  id={this.state.deleteOption.id}
                                  onSubmit={this._onDeleteUser} />
        }

        /**
        * Responsive Settings
        **/

        /**
        * End of Responsive Settings
        */

         let users = this.state.users;
         users.sort(this._compareWithCreatedAt);
         let cards = users.filter(this._search).map((u) => {
           return (
             <UserCard me={u._id === this.props.client.get('user')._id} key={u._id} id={u._id} email={u.email} onDeleteUser={this._onRequestForDelete}/>
           )
         });
        return (
          <Box>
            <Box basis='full' margin='large'>
              <Box>
                <Value value={`${this.state.users.length}/${this.props.client.get('organisation').seats}`} units={'Utilisateur(s)'} size='small' align='start' responsive={true}/>
                <Meter vertical={false} size='small' value={this.state.users.length} max={this.props.client.get('organisation').seats} responsive={true}/>
              </Box>
              <Tiles fill={true}
                     responsive={false}>
              {cards}
              </Tiles>
            </Box>
            {modal}
          </Box>
        )
    }

    _renderHeader() {

      let canAddUser = true;
      if(this.state.users.length >= this.props.client.get('organisation').seats){
        canAddUser = false;
      }
      /**
           * First create the header and add some button if the user is mobile
           */

      let appLogo;
      let title = (
        <Title pad='small' responsive={true}>
          <Box align='center' direction='row'>
            <span>Collaborateurs</span>
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
            <Anchor disabled={!canAddUser} icon={< UserAdd />} onClick={() => {
                if(canAddUser){
                  this._onRequestForAdd();
                }
              }}/> {mobileButton}
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
export default UsersAdmin;
