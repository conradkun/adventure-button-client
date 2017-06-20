import React from 'react';
import MainLevee from '../components/miniApps/mainlevee';
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
  code: 'mainlevee',
  name: 'Mainlevée',
  input: <MainLevee/>,
  defaultValue: {
    inscription: 0,
    annexe: false
  },
  compute: (settings, value) => {
    const bareme = new Bareme("B");
    const tauxTva = 0.21
    let honoraire = bareme.compute(value.inscription).total;
    if (honoraire < 7.5) {
      honoraire = 7.5
    }
    let droitEnregistrement = 75;
    if (value.annexe) {
      droitEnregistrement += 100;
    }

    let eRegistration = getSetting('e_registration', settings);

    let fraisDivers = getSetting('frais_divers_mainlevee', settings);

    let tva = +((tauxTva) * (honoraire + fraisDivers + eRegistration)).toFixed(2);

    let salaireRadiation = 270;

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
          label: 'Provision pour salaire de radiation',
          value: salaireRadiation,
          etat: true,
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
