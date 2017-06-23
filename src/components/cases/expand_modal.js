// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.
import isMobile from 'is-mobile'
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import Box from 'grommet/components/Box';
import Button from 'grommet/components/Button';
import Form from 'grommet/components/Form';
import Footer from 'grommet/components/Footer';
import Layer from 'grommet/components/Layer';
import Label from 'grommet/components/Label';
import Viewer from '../miniApps/viewer/viewer';
import i18n from '../../i18n';

class ExpandModal extends Component {
    constructor (props) {
        super(props);
        this._onSubmit = this._onSubmit.bind(this);
        this.state = {

        };
    }

    _onSubmit (event){
      event.preventDefault();
      this.props.onClose();
    }
    render () {
        return (
            <Layer onClose={this.props.onClose} closer={true} align="center"
            >
                <Box pad={{vertical: 'large', horizontal: 'small'}}>
                    <Form onSubmit={this._onSubmit}>
                        <Viewer i18n={i18n} value={this.props.value}/>
                        <Footer pad={{vertical: 'medium'}} justify='center'>
                            <Button label="Fermer" primary={false}
                                    onClick={this._onSubmit} type="submit"/>
                        </Footer>
                    </Form>
                </Box>
            </Layer>
        );
    }
}
export default (ExpandModal)
