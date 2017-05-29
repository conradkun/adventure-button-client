import React, {Component} from 'react';


import MenuIcon from 'grommet/components/icons/base/Menu';
import Menu from 'grommet/components/Menu';
import Title from 'grommet/components/Title';
import Box from 'grommet/components/Box';
import Search from 'grommet/components/Search';
import Header from 'grommet/components/Header';
import Anchor from 'grommet/components/Anchor';
import LinkPrevious from 'grommet/components/icons/base/LinkPrevious';
import Actions from 'grommet/components/icons/base/Actions';


import AppSettings from '../utils/app_settings';
import Types from '../types';


export default class MiniAppContainer extends Component{
    constructor(props){
        super(props);
        this.miniApp = this._getMiniAppComponent(this.props.match.params.miniApp);
        if (!this.miniApp){
            this.miniApp = <p>Error, this mini App doesnt exist</p>;
        }
    }
    _getMiniAppComponent(code){
        let component = undefined;
        Types.forEach((type) => {
            if(type.code === code) {
                component = type.component;
            }
        });
        return component;
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
    _renderHeader () {
        /**
         * First create the header and add some button if the user is mobile
         */
        let title;
        let mobileButton;
        let goBack;
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
        goBack = (
            <Anchor icon={<LinkPrevious />} primary={false} animateIcon={true} path="/app">
            </Anchor>
        );
        return (
            <Header size='small' colorIndex={colorIndex} fixed={true}>
                {title}
                <Box flex={true}
                     justify={justify}
                     pad="small"
                     direction='row'
                     responsive={false}>
                    {goBack}
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

    render(){

        return(
            <Box full='vertical' colorIndex={AppSettings.backgroundColor}>
                {this._renderHeader()}
                <Box full='horizontal'>
                    {this.miniApp}
                </Box>
            </Box>
        )
    }
}