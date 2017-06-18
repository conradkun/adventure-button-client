import React, {Component} from 'react';

import Prix from './input/prix';
import DroitEnregistrement from './input/droit_enregistrement';
import Annexe from './input/annexe';
import ReductionHonoraire from './input/reduction_honoraire';
import Viewer from './viewer/viewer';
import RegionSelect from './input/region_select';
import Bareme from '../../utils/bareme';

import Title from 'grommet/components/Title'
import Section from 'grommet/components/Section';
import Article from 'grommet/components/Article';
import Form from 'grommet/components/Form';
import FormFields from 'grommet/components/FormFields';
import Header from 'grommet/components/Header';
import Columns from 'grommet/components/Columns';
import Box from 'grommet/components/Box';


import AppSettings from '../../utils/app_settings';

export default class VenteGreGreWallonie extends Component {
    constructor(props) {
        super(props);
        this.bareme = new Bareme("J");
        this._generateViewer = this._generateViewer.bind(this);

        this.state = {
            region: this.props.client.get('preferredRegion'),
            value: {
                montant: 0,
                droitEnregistrement: 12,
                bareme: "J",
                annexe: false,
                reductionHonoraire: 0
            }
        }

    }

    _generateViewer() {
        let honoraire = +(this.bareme.compute(this.state.value.montant).total).toFixed(2);
        //TODO ask for rounding problem
        //Use that ? https://www.npmjs.com/package/money-math
        //Reduction d'honoraire
        if (this.state.value.reductionHonoraire) {
            honoraire -= 250;
        }


        if (honoraire < 7.5) {
            honoraire = 7.5
        }

        let droitEnregistrement = (this.state.value.droitEnregistrement / 100) * (this.state.value.montant);
        if (droitEnregistrement < 50) {
            droitEnregistrement = 50;
        }

        if (this.state.value.annexe) {
            droitEnregistrement += 50;
        }

        let droitEcriture = 50;

        let eRegistration = 45;

        let fraisDivers = 1000;

        let tva = +((0.21) * (honoraire + droitEcriture + fraisDivers + eRegistration)).toFixed(2);

        let transcription = 220;

        let viewerSeries = [
            {
                label: 'Droit d\'enregistrement',
                value: droitEnregistrement
            },
            {
                label: 'Honoraire',
                value: honoraire
            },
            {
                label: 'Droits d\'écriture',
                value: droitEcriture
            },
            {
                label: 'E-registration',
                value: eRegistration
            },
            {
                label: 'Frais divers',
                value: fraisDivers
            },
            {
                label: 'Transcription',
                value: transcription
            },
            {
                label: 'TVA',
                value: tva
            },

        ];

        return viewerSeries;
    }

    render() {
        return (
            <Article>
                <Section align='center' alignContent='center'>
                    <Columns justify='center' size='large'>
                        <Box align='center'
                             className="drop-shadow"
                             pad='large'
                             margin='small'
                             colorIndex={AppSettings.cardColor}>
                            <Form>
                                <Header>
                                    <Title>
                                        Vente de Gré à Gré
                                    </Title>
                                </Header>
                                <FormFields>
                                    <fieldset>
                                        <RegionSelect
                                          small={this.props.responsive === 'single' ? true : false}
                                          client={this.props.client}
                                          onSelect={(v)=>{
                                            this.setState({
                                              region: v
                                            })
                                          }}
                                        />
                                        <Prix
                                          label="Prix de vente"
                                          defaultValue={0}
                                          onChange={
                                            (value) => {
                                                this.setState({value: {...this.state.value, montant: value}})
                                            }
                                        }
                                        />
                                        <DroitEnregistrement onChange={
                                            (value) => {
                                                this.setState({
                                                    value: {
                                                        ...this.state.value,
                                                        droitEnregistrement: value
                                                    }
                                                })
                                            }
                                        }
                                                             options={[12.5, 12, 5, 6]} default={12}/>
                                        <Annexe onChange={
                                            (value) => {
                                                this.setState({value: {...this.state.value, annexe: value}})
                                            }
                                        }/>
                                        <ReductionHonoraire onChange={
                                            (value) => {
                                                this.setState({value: {...this.state.value, reductionHonoraire: value}})
                                            }
                                        }/>
                                    </fieldset>
                                </FormFields>
                            </Form>
                        </Box>
                        <Viewer series={this._generateViewer()}/>
                    </Columns>
                </Section>
            </Article>
        )
    }
}
