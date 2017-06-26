import React from 'react';
import VenteGreGreBruxelles from '../components/miniApps/vente_gre_gre_bruxelles'
import Bareme from '../utils/bareme';

function getSetting(shortcode, settings){
  let setting;
  settings.forEach((s) => {
    if(s.shortcode === shortcode){
      setting = s
    }
  })
  if(!setting){
    console.error("This setting does not exist: " + shortcode);
  }
  return setting.value;
}
const miniApp =
{
  code: 'vente-gre-gre-bxl',
  name: 'Vente de Gré à Gré (Bruxelles)',
  input: <VenteGreGreBruxelles/>,
  mainField: 'prix',
  defaultValue: {
    region: 'bruxelles',
    prix: 0,
    annexe: false,
    abattement: 0
  },
  compute: (settings, value) => {
    const bareme = new Bareme("J");
    let honoraire = bareme.compute(value.prix).total;
    const tauxTva = 0.21
    /*------------------------------------*\
        #Region : bruxelles
    \*------------------------------------*/
    if (honoraire < 7.5) {
      honoraire = 7.5
    }

    let droitEnregistrement = 0;

    /*------------------------------------*\
        #Abattement (175 000€)
    \*------------------------------------*/
    if(value.abattement){
      droitEnregistrement = (12.5 / 100) * (value.prix - 175000);
    }
    else {
      droitEnregistrement = (12.5 / 100) * (value.prix);
    }

    /*------------------------------------*\
        #Montant minimum
    \*------------------------------------*/
    if (droitEnregistrement < 50) {
      droitEnregistrement = 50;
    }

    if (value.annexe) {
      droitEnregistrement += 50;
    }

    let droitEcriture = getSetting('droit_ecriture', settings);

    let eRegistration = getSetting('e_registration', settings);

    let fraisDivers = getSetting('frais_divers_vente_gre_a_gre', settings);

    let tva = +((tauxTva) * (honoraire + droitEcriture + fraisDivers + eRegistration)).toFixed(2);



    let transcription = getSetting('transcription', settings);

    var result = [
        {
          label: 'Droits d\'enregistrement',
          value: droitEnregistrement,
          etat: true
        },
        {
          label: 'Honoraire',
          value: honoraire,
          etat: false
        },
        {
          label: 'Droits d\'écriture',
          value: droitEcriture,
          etat: true
        },
        {
          label: 'E-registration',
          value: eRegistration,
          etat: true
        },
        {
          label: 'Frais divers',
          value: fraisDivers,
          frais: true,
          etat: false
        },
        {
          label: 'Transcription',
          value: transcription,
          etat: true
        },
        {
          label: 'TVA',
          value: tva,
          etat: true
        },

    ];
    return result;
  }
}


export default miniApp;
