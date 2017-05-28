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
import Types from '../types';

class CardList extends Component{
    constructor(props) {
        super(props);
        this._renderHeader = this._renderHeader.bind(this);
        this.state = {
            searchString: ""
        }
    }
    _generateCards(){
        return Types.map((type) => {
            //Check if the name of the MiniApp match the Search String
            if(type.name.toLowerCase().indexOf(this.state.searchString.toLowerCase())!==-1){
                let link = `app/b/${type.code}`;
                return (
                    <Tile align='start' key={type.name} colorIndex={AppSettings.cardColor}>
                        <Card
                              heading={type.name}
                              description={type.description}
                              link={<Anchor onClick={() => {
                                  this.props.history.push(link);
                              }}
                                            icon={<LinkNext />}
                                            label='Go'/>}/>
                    </Tile>
                );
            }
        });
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
    render(){
        let card = this._generateCards();
        return(
        <Box full='vertical' colorIndex={AppSettings.backgroundColor}>
            {this._renderHeader()}
            <Tiles fill={true}
                   flush={false} colorIndex={AppSettings.backgroundColor}>
                {card}
            </Tiles>
        </Box>
        )
    }
}
export default withRouter(CardList);
