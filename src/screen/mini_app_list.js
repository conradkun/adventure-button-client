import React, {Component} from 'react';
import {withRouter} from "react-router-dom";

import MenuIcon from 'grommet/components/icons/base/Menu';
import Title from 'grommet/components/Title';
import Box from 'grommet/components/Box';
import Search from 'grommet/components/Search';
import Header from 'grommet/components/Header';
import Anchor from 'grommet/components/Anchor';
import LinkPrevious from 'grommet/components/icons/base/LinkPrevious';

import Tiles from 'grommet/components/Tiles';
import MiniAppCard from '../components/miniAppList/mini_app_card';
import MiniAppCardMultiple from '../components/miniAppList/mini_app_card_multiple';

import AppSettings from '../utils/app_settings';
import {miniAppsList} from '../miniApps';

class miniAppList extends Component{
    constructor(props) {
        super(props);
        this._renderHeader = this._renderHeader.bind(this);
        this._generateCards = this._generateCards.bind(this);
        this.state = {
            searchString: ""
        }
    }

    _generateCards(){
        return miniAppsList.map((miniApp) => {
            //Check if the name of the MiniApp match the Search String
            if(miniApp.name.toLowerCase().indexOf(this.state.searchString.toLowerCase())!==-1){
                if(miniApp.code instanceof Array){
                  return <MiniAppCardMultiple key={miniApp.name} client={this.props.client} responsive={this.props.responsive} miniApp={miniApp}/>
                } else {
                  return <MiniAppCard key={miniApp.name} responsive={this.props.responsive} miniApp={miniApp}/>
                }
            }
        });
    }

    _renderHeader () {
        /**
         * First create the header and add some button if the user is mobile
         */
        let appLogo;
        let mobileButton;
        let search;
        let colorIndex = 'light-1';
        let justify='between';
        if ('single' === this.props.responsive) {
            justify='end';
            appLogo = this.props.renderAppLogo();
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
            <Header size='small' className="drop-shadow-bottom" colorIndex={colorIndex} fixed={true}>
                {appLogo}
                <Box flex={true}
                     justify={justify}
                     pad="small"
                     direction='row'
                     responsive={false}>
                    {search}
                    {mobileButton}
                </Box>
            </Header>
        );
    }
    render(){
        let card = this._generateCards();
        return(
        <Box full='vertical' colorIndex={AppSettings.backgroundColor}>
            {this._renderHeader()}
            <Tiles fill={true} responsive={false}
                    >
                {card}
            </Tiles>
        </Box>
        )
    }
}
export default withRouter(miniAppList);
