import { createContainer } from 'meteor/react-meteor-data';
import React, {Component} from 'react';
import {browserHistory} from 'react-router-dom';
import { Meteor } from 'meteor-client';

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
import Spinner from 'react-spinkit';

import {Organisation} from '../../imports/api/organisation';

class Admin extends Component {

    constructor() {
        super();

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
        this._renderHeader = this._renderHeader.bind(this);
        this._renderContent = this._renderContent.bind(this);
        this._renderTitle = this._renderTitle.bind(this);

        this.state = {
            searchString: "",
            addUser: false,
            editUser: false,
            deleteUser: false,
            edit: {
                email: undefined,
                organisation: undefined,
                role: undefined
            },
            delete :{
                email: undefined
            }
        }
    }

    _onRequestForAdd () {
        this.setState({addUser: true});
    }

    _onRequestForAddClose () {
        this.setState({addUser: false});
    }

    _onAddUser (user) {
        Meteor.call('admin.addUser', user, function (error) {
            // identify the error
            if (error) {
                // show a nice error message
                //Bert.alert(error.reason, 'danger', 'fixed-top', 'fa-remove' );
            }
        });
        this.setState({addUser: false});
    }

    _onRequestForEdit () {
        this.setState({editUser: true});
    }

    _onRequestForEditClose () {
        this.setState({editUser: false});
    }

    _onEditUser (user) {
        Meteor.call('admin.editUser', user, function (error) {
            // identify the error
            if (error) {
                // show a nice error message
                //Bert.alert(error.reason, 'danger', 'fixed-top', 'fa-remove' );
            }
        });
        this.setState({editUser: false});
    }

    _onRequestForDelete () {
        this.setState({deleteUser: true});
    }

    _onRequestForDeleteClose () {
        this.setState({deleteUser: false});
    }

    _onDeleteUser (user) {
        Meteor.call('admin.deleteUser', user, function (error) {
            // identify the error
            if (error) {
                // show a nice error message
                //Bert.alert(error.reason, 'danger', 'fixed-top', 'fa-remove' );
            }
        });
        this.setState({deleteUser: false});
    }

    _search(user){
        let email = user.emails[0].address;
        return email.toLowerCase().indexOf(this.state.searchString.toLowerCase()) != -1;
    }

    _renderContent() {
        let organisationList = {
            noOrg: {
                id: undefined,
                name: "Pas d'organisation"
            }
        };
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
                                    this._onRequestForEdit()
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
                                    this._onRequestForDelete()
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

        let modal;
        if (this.state.addUser) {
            modal = (
                <AddUserModal onClose={this._onRequestForAddClose}
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
            modal = <DeleteUserModal onClose={this._onRequestForDeleteClose}
                                     email={this.state.delete.email}
                                     onSubmit={this._onDeleteUser} />
        }
        /**
         * Responsive for the header (fixed or not)
         */
        let scrollableList = true;
        if (this.props.responsive == "single"){
            scrollableList = false;
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
                        <Anchor icon={<UserAdd/>} onClick={this._onRequestForAdd} />
                    </Box>
                </Header>
                <Table scrollable={scrollableList}>
                    <thead>
                    <tr>
                        <th>
                            Email
                        </th>
                        <th>
                            Organisation
                        </th>
                        <th>
                            Role
                        </th>
                        <th>
                            Actions
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {users}
                    </tbody>
                </Table>
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
        return(
            <Box full='vertical' colorIndex={AppSettings.backgroundColor}>
                {this._renderHeader()}
                {this._renderContent()}
            </Box>
        )
    }
}

export default createContainer(() => {
    Meteor.subscribe('userList');
    Meteor.subscribe('organisation');
    Meteor.subscribe('settings');
    return {
        users: Meteor.users.find({}).fetch(),
        organisation: Organisation.find({}).fetch()
    }
}, Admin);
