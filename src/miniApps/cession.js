import React from 'react';
import Cession from '../components/miniApps/cession';
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
  code: 'cession',
  name: 'Cession',
  input: <Cession/>,
  mainField: 'valeur', 
  defaultValue: {
    valeur: 0,
    valeurDroitEnregistrement: 0,
    annexe: false,
    flandre: false
  },
  compute: (settings, value) => {
    console.log(value);
    const bareme = new Bareme("J");
    const tauxTva = 0.21
    let honoraire = bareme.compute(value.valeur).total;
    if (honoraire < 7.5) {
      honoraire = 7.5
    }
    let droitEnregistrement = value.flandre ? (0.025 * value.valeurDroitEnregistrement) : (0.01 * value.valeurDroitEnregistrement);

    if (value.annexe) {
      droitEnregistrement += 100;
    }

    let eRegistration = getSetting('e_registration', settings);

    let fraisDivers = getSetting('frais_divers_cession', settings);

    let droitEcriture = getSetting('droit_ecriture', settings);

    let tva = +((tauxTva) * (honoraire + droitEcriture + fraisDivers + eRegistration)).toFixed(2);

    let transcription = 220;

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
          label: 'Droits d\'écriture',
          value: droitEcriture,
          etat: true
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
