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
import Menu from 'grommet/components/Menu';
import Actions from 'grommet/components/icons/base/Actions';
import Tile from 'grommet/components/Tile';
import Card from 'grommet/components/Card';
import LinkNext from 'grommet/components/icons/base/LinkNext';

import AppSettings from '../utils/app_settings';
import miniApps from '../miniApps';

class miniAppList extends Component{
    constructor(props) {
        super(props);
        this._renderHeader = this._renderHeader.bind(this);
        this.state = {
            searchString: ""
        }
    }
    _generateCards(){
        return miniApps.map((type) => {
            //Check if the name of the MiniApp match the Search String
            if(type.name.toLowerCase().indexOf(this.state.searchString.toLowerCase())!==-1){
                let link = `app/b/${type.code}`;
                let basis = 'medium';
                let margin = {
                  top: 'large'
                }
                if(this.props.responsive === 'single'){
                  basis = 'full'
                  margin = {
                    ...margin,
                    horizontal: 'large'
                  }
                }
                return (

                        <Card
                              margin={margin}
                              basis={basis}
                              responsive={false}
                              key={type.name}
                              className="better_card"
                              heading={type.name}
                              colorIndex={AppSettings.cardColor}
                              onClick={()=>{
                                this.props.history.push(link);
                              }}
                              />

                );
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
