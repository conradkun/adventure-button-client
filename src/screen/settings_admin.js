import React, {Component} from 'react';
import Box from 'grommet/components/Box';
import Header from 'grommet/components/Header';
import Anchor from 'grommet/components/Anchor';
import Title from 'grommet/components/Title';
import Tiles from 'grommet/components/Tiles';
import UserAdd from 'grommet/components/icons/base/UserAdd';
import PriceInput from '../components/settings/input/price_input';
import AppSettings from '../utils/app_settings';



class SettingsAdmin extends Component {

    constructor() {
        super();

        this._onEditSetting = this._onEditSetting.bind(this);
        this._search = this._search.bind(this);

        this.state = {
        }
    }

    _onEditSetting (setting) {
        this.setState({editUser: false});
    }


    _search(setting){
        let name = setting.name;
        return name.toLowerCase().indexOf(this.props.searchedString.toLowerCase()) !== -1;
    }



    render() {
        let card = [].filter(this._search).map((setting) => {
            if (setting.type === "PRICE") {
                console.log("check");
                return(
                    <PriceInput defaultValue={setting.value} name={setting.name} onChange={(value)=>{
                        console.log(value);
                    }}/>
                )

            }
        });
        return (
            <Box colorIndex={AppSettings.cardColor} margin='small'>
                <Header size='small' colorIndex='light-2' fixed={true}>
                    <Title margin='medium'>
                        Paramètres de l'étude
                    </Title>
                    <Box flex={true}
                         justify='end'
                         pad="small"
                         direction='row'
                         responsive={false}>
                        <Anchor icon={<UserAdd/>} onClick={this._onRequestForAdd} />
                    </Box>
                </Header>
                <Tiles fill={false}
                       flush={false} colorIndex={AppSettings.backgroundColor}>
                       <PriceInput defaultValue={1000} name={'Babe'} onChange={(value)=>{
                           console.log(value);
                       }}/>
                </Tiles>
            </Box>
        )
    }
}

export default SettingsAdmin;
