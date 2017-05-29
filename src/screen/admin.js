
import React, {Component} from 'react';
import Box from 'grommet/components/Box';
import Search from 'grommet/components/Search';
import Header from 'grommet/components/Header';
import Anchor from 'grommet/components/Anchor';
import Menu from 'grommet/components/Menu';
import Actions from 'grommet/components/icons/base/Actions';
import Title from 'grommet/components/Title';
import UserAdd from 'grommet/components/icons/base/UserAdd';
import Edit from 'grommet/components/icons/base/Edit';
import Close from 'grommet/components/icons/base/Close';
import MenuIcon from 'grommet/components/icons/base/Menu';
import LinkPrevious from 'grommet/components/icons/base/LinkPrevious';
import Table from 'grommet/components/Table';
import TableRow from 'grommet/components/TableRow';
import AppSettings from '../utils/app_settings';
import AddUserModal from '../components/admin/add_user_modal';
import EditUserModal from '../components/admin/edit_user_modal';
import DeleteUserModal from '../components/admin/delete_user_modal';
import AddOrganisationModal from '../components/admin/add_organisation_modal';
import EditOrganisationModal from '../components/admin/edit_organisation_modal';
import DeleteOrganisationModal from '../components/admin/delete_organisation_modal';
import Spinner from 'react-spinkit';



class Admin extends Component {

    constructor() {
        super();

        this._onRequestForAddUser = this._onRequestForAddUser.bind(this);
        this._onRequestForAddUserClose = this._onRequestForAddUserClose.bind(this);
        this._onRequestForEditUser = this._onRequestForEditUser.bind(this);
        this._onRequestForEditUserClose = this._onRequestForEditUserClose.bind(this);
        this._onRequestForDeleteUser = this._onRequestForDeleteUser.bind(this);
        this._onRequestForDeleteUserClose = this._onRequestForDeleteUserClose.bind(this);

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
        this._renderTitle = this._renderTitle.bind(this);

        this.state = {
            isLoading: true,
            organisations: undefined,
            users: undefined,
            searchString: "",
            addUser: false,
            editUser: false,
            deleteUser: false,
            editUserOption: {
                id: undefined,
                email: undefined,
                role: undefined
            },
            deleteUserOption:{
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
            deleteOrganisationOption:{
                id: undefined,
                name: undefined
            }
        }
    }

    _onRequestForAddUser () {
        this.setState({addUser: true});
    }

    _onRequestForAddUserClose () {
        this.setState({addUser: false});
    }

    _onAddUser (User) {
        //TODO Implement user add
        this.setState({addUser: false});
    }

    _onRequestForEditUser () {
        this.setState({editUser: true});
    }

    _onRequestForEditUserClose () {
        this.setState({editUser: false});
    }

    _onEditUser (id, User) {
        //TODO Implement user edit
        this.setState({editUser: false});
    }

    _onRequestForDeleteUser () {
        this.setState({deleteUser: true});
    }

    _onRequestForDeleteUserClose () {
        this.setState({deleteUser: false});
    }

    _onDeleteUser (id) {
        //TODO Implement user delete
        this.setState({deleteUser: false});
    }

    _onRequestForAddOrganisation () {
        this.setState({addOrganisation: true});
    }

    _onRequestForAddOrganisationClose () {
        this.setState({addOrganisation: false});
    }

    _onAddOrganisation (Organisation) {
        const client = this.props.client;
        const organisation = client.service('organisation');
        organisation.create({
          name: Organisation.name,
          seats: Organisation.seats
        }).then(
        this.setState({addOrganisation: false}))
    }

    _onRequestForEditOrganisation () {
        this.setState({editOrganisation: true});
    }

    _onRequestForEditOrganisationClose () {
        this.setState({editOrganisation: false});
    }

    _onEditOrganisation (id, Organisation) {
        //TODO Implement Organisation edit
        this.setState({editOrganisation: false});
    }

    _onRequestForDeleteOrganisation () {
        this.setState({deleteOrganisation: true});
    }

    _onRequestForDeleteOrganisationClose () {
        this.setState({deleteOrganisation: false});
    }

    _onDeleteOrganisation (id) {
        //TODO Implement Organisation delete
        this.setState({deleteOrganisation: false});
    }
    _search(organisation){
        let name = organisation.name;
        return name.toLowerCase().indexOf(this.state.searchString.toLowerCase()) !== -1;
    }
    _load(){
      console.log("hey pello")
      //TODO FIND RETURNS TIME OUT
      const client = this.props.client;
      const organisation = client.service('organisation');
      const users = client.service('users');
      console.log(0);
      organisation.find().then(organisations => {
        this.setState({organisations : organisations})
        console.log('1');
      })
      .then(() => {
        return users.find()
      })
      .then((users) => {
        this.setState({users: users});
        this.setState({isLoading: false});
        console.log(this.state.organisations);
        console.log(this.state.users);
      })
    }

    _renderContent() {
      /**
      this.state.organisations.map((org) => {
        return(
          <p>{org.name}</p>
        )
      })
      **/
        /**
        this.props.organisation.map((organisation) => {
            organisationList[organisation._id] = organisation;
        });
        let users = this.props.users.filter(this._search).map((user) => {
            if (!user || !user.emails[0] || !user.roles || !user.profile){
                return (
                    <td>
                        Loading...
                    </td>
                )
            }
            let buttons;

            let organisationId = (user.profile.organisation) ? user.profile.organisation : "noOrg";

            let organisationName;
            if (organisationList[organisationId]) {
                organisationName = organisationList[organisationId].name;
            }
            else {
                organisationName = "Cette organisation n'existe pas!!"
            }

            let role;
            switch(user.roles[0]){
                case "admin":
                    role = "Administrateur";
                    break;
                case "user":
                    role = "Collaborateur";
                    break;
                case "organisationManager":
                    role = "Manager";
                    break;
                default:
                    role = "Error";
            }

            if (user.roles[0] !== "admin") {
                buttons = (
                    <td>
                        <Anchor icon={<Edit />}
                                onClick={() => {
                                    this.setState({
                                        edit: {
                                            email: user.emails[0].address,
                                            organisation: organisationId,
                                            organisationName: organisationName,
                                            role: user.roles[0],
                                        }
                                    });
                                    this._onRequestForEditUser()
                                }}
                                animateIcon={true}
                                primary={true}/>

                        <Anchor icon={<Close />}
                                onClick={() => {
                                    this.setState({
                                        delete: {
                                            email: user.emails[0].address,
                                        }
                                    });
                                    this._onRequestForDeleteUser()
                                }}
                                animateIcon={true}
                                primary={true}/>
                    </td>
                )
            }

            return (
                <TableRow key={user.emails[0].address}>
                    <td>
                        {user.emails[0].address}
                    </td>
                    <td>
                        {organisationName}
                    </td>
                    <td className='secondary'>
                        {role}
                    </td>
                    {buttons}
                </TableRow>
            )
        });
        **/
        /**
        * Modal Generation
        **/
        let modal;
        if (this.state.addUser) {
            modal = <AddUserModal onClose={this._onRequestForAddUserClose}
                                  onSubmit={this._onAddUser} />

        } else if (this.state.editUser){
            modal = <EditUserModal id={this.state.editUserOption.id}
                                   email={this.state.editUserOption.email}
                                   role={this.state.editUserOption.role}
                                   onClose={this._onRequestForEditUserClose}
                                   onSubmit={this._onEditUser}/>
        } else if (this.state.deleteUser){
            modal = <DeleteUserModal onClose={this._onRequestForDeleteUserClose}
                                     id={this.state.deleteUserOption.id}
                                     email={this.state.deleteUserOption.email}
                                     onSubmit={this._onDeleteUser} />
        } else if (this.state.addOrganisation) {
          modal = <AddOrganisationModal onClose={this._onRequestForAddOrganisationClose}
                                        onSubmit={this._onAddOrganisation} />

        } else if (this.state.editOrganisation) {
          modal = <EditOrganisationModal id={this.state.editOrganisationOption.id}
                                         name={this.state.editOrganisationOption.name}
                                         seats={this.state.editOrganisationOption.seats}
                                         onClose={this._onRequestForEditOrganisationClose}
                                         onSubmit={this._onEditOrganisation}/>
        } else if (this.state.deleteOrganisation) {
          modal = <DeleteOrganisationModal onClose={this._onRequestForDeleteOrganisationClose}
                                           id={this.state.deleteOrganisationOption.id}
                                           name={this.state.deleteOrganisationOption.name}
                                           onSubmit={this._onDeleteOrganisation} />
        }


        return (
            <Box colorIndex={AppSettings.cardColor} margin='small'>
                <Header size='small' colorIndex='light-2' fixed={true}>
                    <Title margin='medium'>
                        Administration
                    </Title>
                    <Box flex={true}
                         justify='end'
                         pad="small"
                         direction='row'
                         responsive={false}>
                        <Anchor icon={<UserAdd/>} onClick={this._onRequestForAddOrganisation} />
                    </Box>
                </Header>
                Content
                {modal}
            </Box>
        )
    }

    _renderTitle () {
        return (
            <Title pad='small' responsive={false}>
                <Box align='center' direction='row'>
                    <Title>Projet Bareme</Title>
                </Box>
            </Title>
        );
    }

    _renderHeader() {
        /**
         * First create the header and add some button if the user is mobile
         */
        let title;
        let mobileButton;
        let search;
        let colorIndex = 'light-1';
        let justify='between';
        if ('single' === this.props.responsive) {
            justify='end';
            title = this._renderTitle();
            colorIndex = AppSettings.mainColor;
            mobileButton = (
                <Anchor icon={<MenuIcon />} onClick={this.props.onMenuOpen}>
                </Anchor>
            );
        }
        search = (
            <Search inline={true}
                    fill={true}
                    size='medium'
                    placeHolder='Rechercher'
                    defaultValue={this.state.searchString}
                    dropAlign={{"right": "right"}}
                    onDOMChange={(e) => {this.setState({searchString: e.target.value})}}
            />
        );
        return (
            <Header size='small' colorIndex={colorIndex} fixed={true}>
                {title}
                <Box flex={true}
                     justify={justify}
                     pad="small"
                     direction='row'
                     responsive={false}>
                    {search}
                    <Menu icon={<Actions />}
                          dropAlign={{"right": "right"}}>
                        <Anchor href='#' onClick={this.props.onLogout}>
                            Déconnexion
                        </Anchor>
                        <Anchor href='#'>
                            Aide
                        </Anchor>
                    </Menu>
                    {mobileButton}
                </Box>
            </Header>
        );
    }

    render() {
        this._load();
        let loader = (
          <Box margin='large' direction='column' align='center' justify='center' alignContent='center'>
            <Spinner spinnerName="double-bounce" />
          </Box>);
        return(
            <Box full='vertical' colorIndex={AppSettings.backgroundColor}>
                {this._renderHeader()}
                {this.state.isLoading ? loader : this._renderContent()}
            </Box>
        )
    }
}

export default Admin
