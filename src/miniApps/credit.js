import React from 'react';
import Credit from '../components/miniApps/credit';
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
  code: 'credit',
  name: 'Crédit',
  input: <Credit/>,
  defaultValue: {
    credit: 0,
    inscription: 0,
    annexe: false
  },
  compute: (settings, value) => {
    const bareme = new Bareme("G");
    const tauxTva = 0.21
    let honoraire = bareme.compute(value.credit).total;
    if (honoraire < 7.5) {
      honoraire = 7.5
    }
    let droitEnregistrement = (0.01 * value.inscription);
    if (value.annexe) {
      droitEnregistrement += 100;
    }

    let droitInscription = (0.003 * value.inscription);

    let eRegistration = getSetting('e_registration', settings);

    let fraisDivers = getSetting('frais_divers_credit', settings);

    let droitEcriture = getSetting('droit_ecriture', settings);

    let tva = +((tauxTva) * (honoraire + droitEcriture + fraisDivers + eRegistration)).toFixed(2);

    /**
    Attention : pas bon 
    **/
    let salaireConservateur = 270;

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
          label: 'Provision pour salaire du conservateur',
          value: salaireConservateur,
          etat: true,
        },
        {
          label: 'Droits d\'inscription',
          value: droitInscription,
          etat: true
        },
        {
          label: 'Droits d\'écriture',
          value: droitEcriture,
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
