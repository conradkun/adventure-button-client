import React, {Component} from 'react';
import Box from 'grommet/components/Box';
import Header from 'grommet/components/Header';
import Anchor from 'grommet/components/Anchor';
import Title from 'grommet/components/Title';
import Tiles from 'grommet/components/Tiles';
import SingleValue from '../components/settings/single_value';
import AppSettings from '../utils/app_settings';
import Spinner from 'react-spinkit';
import MenuIcon from 'grommet/components/icons/base/Menu';
import Search from 'grommet/components/Search';

class Settings extends Component {

    constructor() {
        super();

        this._search = this._search.bind(this);
        this._load = this._load.bind(this);

        this.state = {
          isLoading: true,
          settings: undefined,
          searchString: ""
        }
    }

    componentDidMount() {
      //TODO Fix the setState console.error();
      this._load();
    }

    _load() {
      const client = this.props.client;
      const settings = client.service('settings');

      settings.find({
        query:{
          organisationId: client.get('organisation')._id
        }
      }).then((data) => {
        this.setState({
          isLoading: false,
          settings: data.data,
        })
      })
    }

    _search(setting){
        let name = setting.name;
        return name.toLowerCase().indexOf(this.state.searchString.toLowerCase()) !== -1;
    }

    _compareWithCreatedAt(a, b) {
      return new Date(a.createdAt) < new Date(b.createdAt);
    }

    _renderContent() {
      let card = this.state.settings.filter(this._search).sort(this._compareWithCreatedAt).map((setting) => {
          if (setting.values.length === 1) {
              return(
                  <SingleValue id={setting._id} key={setting._id} client={this.props.client} responsive={this.props.responsive} defaultValue={setting.values[0].value} name={setting.name} />
              )

          }
      });
      return (
          <Box basis='full' margin='large'>
              <Tiles fill={true}
                     responsive={false}>
                     {card}
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
