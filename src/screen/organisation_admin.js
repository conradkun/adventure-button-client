import React, {Component} from 'react';
import ReactMailto from 'react-mailto';
import { createContainer } from 'meteor/react-meteor-data';
import { Organisation } from '../../imports/api/organisation';
import { Meteor } from 'meteor-client';

import MenuIcon from 'grommet/components/icons/base/Menu';
import Menu from 'grommet/components/Menu';
import Search from 'grommet/components/Search';
import LinkPrevious from 'grommet/components/icons/base/LinkPrevious';
import Actions from 'grommet/components/icons/base/Actions';


import Box from 'grommet/components/Box';
import Value from 'grommet/components/Value';
import Label from 'grommet/components/Label';
import Header from 'grommet/components/Header';
import Anchor from 'grommet/components/Anchor';
import Title from 'grommet/components/Title';
import AddCircle from 'grommet/components/icons/base/AddCircle';
import Edit from 'grommet/components/icons/base/Edit';
import Close from 'grommet/components/icons/base/Close';
import Table from 'grommet/components/Table';
import TableRow from 'grommet/components/TableRow';
import Meter from 'grommet/components/Meter';
import AppSettings from '../utils/app_settings';
import AddOrganisationModal from '../components/organisation/add_organisation_modal';
import EditOrganisationModal from '../components/organisation/edit_organisation_modal';
import DeleteOrganisationModal from '../components/organisation/delete_organisation_modal';

class OrganisationAdmin extends Component {

    constructor() {
        super();

        this._onRequestForAdd = this._onRequestForAdd.bind(this);
        this._onRequestForAddClose = this._onRequestForAddClose.bind(this);
        this._onRequestForEdit = this._onRequestForEdit.bind(this);
        this._onRequestForEditClose = this._onRequestForEditClose.bind(this);
        this._onRequestForDelete = this._onRequestForDelete.bind(this);
        this._onRequestForDeleteClose = this._onRequestForDeleteClose.bind(this);
        this._onAddOrganisation = this._onAddOrganisation.bind(this);
        this._onEditOrganisation = this._onEditOrganisation.bind(this);
        this._onDeleteOrganisation = this._onDeleteOrganisation.bind(this);
        this._search = this._search.bind(this);
        this._renderContent = this._renderContent.bind(this);
        this._renderHeader = this._renderHeader.bind(this);

        this.state = {
            searchString: "",
            addOrganisation: false,
            editOrganisation: false,
            deleteOrganisation: false,
            edit: {
                id: undefined,
                name: undefined,
                maximumNumberOfUsers: undefined
            },
            delete :{
                id: undefined,
                name: undefined
            }
        }
    }

    _onRequestForAdd () {
        this.setState({addOrganisation: true});
    }

    _onRequestForAddClose () {
        this.setState({addOrganisation: false});
    }

    _onAddOrganisation (Organisation) {
        Meteor.call('admin.addOrganisation', Organisation, function (error) {
            // identify the error
            if (error) {
                // show a nice error message
                //Bert.alert(error.reason, 'danger', 'fixed-top', 'fa-remove' );
                console.log(error);
            }
        });
        this.setState({addOrganisation: false});
    }

    _onRequestForEdit () {
        this.setState({editOrganisation: true});
    }

    _onRequestForEditClose () {
        this.setState({editOrganisation: false});
    }

    _onEditOrganisation (organisation) {
        Meteor.call('admin.editOrganisation', organisation, function (error) {
            // identify the error
            if (error) {
                // show a nice error message
                //Bert.alert(error.reason, 'danger', 'fixed-top', 'fa-remove' );
                console.log(error);
            }
        });
        this.setState({editOrganisation: false});
    }

    _onRequestForDelete () {
        this.setState({deleteOrganisation: true});
    }

    _onRequestForDeleteClose () {
        this.setState({deleteOrganisation: false});
    }

    _onDeleteOrganisation ({ id }) {
        Meteor.call('admin.deleteOrganisation', id, function (error) {
            // identify the error
            if (error) {
                // show a nice error message
                //Bert.alert(error.reason, 'danger', 'fixed-top', 'fa-remove' );
                console.log(error);
            }
        });
        this.setState({deleteOrganisation: false});
    }

    //tracker-based reactivity in action, no need for `getMeteorData`!

    userCount(id) {
        return Meteor.users.find({'profile.organisation': id}).count();
    }

    leaderEmail(id) {
        const leader =  Meteor.users.findOne({'profile.organisation': id, roles: { "$in" : ["organisationManager"]}});
        if(leader) {
        return (
            <ReactMailto email={leader.emails[0].address}>{leader.emails[0].address}</ReactMailto>
        )
        }
        else {
            return "Cette organisation n'a pas de manager !"
        }
    }

    _search(org){
        let name = org.name;
        return name.toLowerCase().indexOf(this.state.searchString.toLowerCase()) != -1;
    }

    _renderContent() {
        let Organisations = this.props.organisation.filter(this._search).map((organisation) => {
            return (
                <TableRow key={organisation.name}>
                    <td>
                        {organisation.name}
                    </td>
                    <td>
                        {this.leaderEmail(organisation._id)}
                    </td>
                    <td>
                        <Box>
                            <Value value={`${this.userCount(organisation._id)}/${organisation.maximumNumberOfUsers}`}
                                   units='Collaborateurs'
                                   size='xsmall'
                                   align='start' />
                            <Meter size='small'
                                   min={0}
                                   max={organisation.maximumNumberOfUsers}
                                   value={this.userCount(organisation._id)}
                            />
                        </Box>
                    </td>
                    <td>
                        <Anchor icon={<Edit />}
                                onClick={() => {
                                    this.setState({
                                        edit: {
                                            id: organisation._id,
                                            name: organisation.name,
                                            maximumNumberOfUsers: organisation.maximumNumberOfUsers
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
                                            id: organisation._id,
                                            name: organisation.name
                                        }
                                    });
                                    this._onRequestForDelete()
                                }}
                                animateIcon={true}
                                primary={true}/>
                    </td>
                </TableRow>
            )
        });

        let modal;
        if (this.state.addOrganisation) {
            modal = (
                <AddOrganisationModal onClose={this._onRequestForAddClose}
                                 onSubmit={this._onAddOrganisation} />
            );
        } else if (this.state.editOrganisation){
            modal = <EditOrganisationModal id={this.state.edit.id}
                                   name={this.state.edit.name}
                                   maximumNumberOfUsers={this.state.edit.maximumNumberOfUsers}
                                   onClose={this._onRequestForEditClose}
                                   onSubmit={this._onEditOrganisation}/>
        } else if (this.state.deleteOrganisation){
            modal = <DeleteOrganisationModal onClose={this._onRequestForDeleteClose}
                                             id={this.state.delete.id}
                                             name={this.state.delete.name}
                                             onSubmit={this._onDeleteOrganisation} />
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
                    Organisation
                    </Title>
                    <Box flex={true}
                         justify='end'
                         pad="small"
                         direction='row'
                         responsive={false}>
                        <Anchor icon={<AddCircle/>} onClick={this._onRequestForAdd} />
                    </Box>
                </Header>
                <Table scrollable={scrollableList}>
                    <thead>
                    <tr>
                        <th>
                            Nom
                        </th>
                        <th>
                            Manager
                        </th>
                        <th>
                            Collaborateurs
                        </th>
                        <th>
                            Actions
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {Organisations}
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
}, OrganisationAdmin);
