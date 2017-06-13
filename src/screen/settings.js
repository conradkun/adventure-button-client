import React, {Component} from 'react';
import Box from 'grommet/components/Box';
import Header from 'grommet/components/Header';
import Anchor from 'grommet/components/Anchor';
import Title from 'grommet/components/Title';
import Tiles from 'grommet/components/Tiles';
import PriceInput from '../components/settings/input/price_input';
import AppSettings from '../utils/app_settings';
import Spinner from 'react-spinkit';
import MenuIcon from 'grommet/components/icons/base/Menu';
import Search from 'grommet/components/Search';

class Settings extends Component {

    constructor() {
        super();

        this._search = this._search.bind(this);

        this.state = {
          isLoading: false
        }
    }

    _search(setting){
        let name = setting.name;
        return name.toLowerCase().indexOf(this.props.searchedString.toLowerCase()) !== -1;
    }

    _compareWithCreatedAt(a, b) {
      return new Date(a.createdAt) < new Date(b.createdAt);
    }

    _renderContent() {
      let card = [].filter(this._search).map((setting) => {
          if (setting.type === "PRICE") {
              console.log("check");
              return(
                  <PriceInput responsive={this.props.responsive} defaultValue={setting.value} name={setting.name} onChange={(value)=>{
                      console.log(value);
                  }}/>
              )

          }
      });
      return (
          <Box basis='full' margin='large'>
              <Tiles fill={true}
                     responsive={false}>
                     <PriceInput defaultValue={1000} name={'Droit d´enregistrement'} onChange={(value)=>{
                         console.log(value);
                     }}/>
              </Tiles>
          </Box>
      )
  }

    _renderHeader() {

      let appLogo;
      let title = (
        <Title pad='small' responsive={true}>
          <Box align='center' direction='row'>
            <span>Paramètres de l´Etude</span>
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
            {mobileButton}
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

export default Settings;
