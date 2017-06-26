import React from 'react';
import MandatHypothecaire from '../components/miniApps/mandat_hypothecaire';
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
  code: 'mandat_hypothecaire',
  name: 'Mandat Hypothécaire',
  mainField: 'montant',
  input: <MandatHypothecaire/>,
  defaultValue: {
    montant: 0,
    annexe: false,
    operationComplementaire: 0,
  },
  compute: (settings, value) => {
    const bareme = new Bareme("F");
    const tauxTva = 0.21
    let honoraire = bareme.compute(value.montant).total / 4;
    if (honoraire < 7.5) {
      honoraire = 7.5
    }
    let droitEnregistrement = 50;
    if (value.annexe) {
      droitEnregistrement += 100;
    }

    let eRegistration = getSetting('e_registration', settings);

    let droitEcriture = getSetting('droit_ecriture', settings);

    let fraisDivers = getSetting('frais_divers_mandat_hypothecaire', settings);

    if(value.operationComplementaire){
      if(value.operationComplementaire === 1){
        fraisDivers = getSetting('frais_divers_mandat_hypothecaire_complementaire_2', settings);
      }
      else if(value.operationComplementaire === 2){
        fraisDivers = getSetting('frais_divers_mandat_hypothecaire_complementaire_3', settings);
      }
    }

    let tva = +((tauxTva) * (honoraire + fraisDivers + droitEcriture +eRegistration)).toFixed(2);

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
          label: 'TVA',
          value: tva,
          etat: true
        },

    ];
    return result;
  }
}

export default miniApp;
