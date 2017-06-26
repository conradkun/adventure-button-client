import React from 'react';
import Partage from '../components/miniApps/partage';
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
  code: 'partage',
  name: 'Partage',
  mainField: 'valeur',
  input: <Partage/>,
  defaultValue: {
    valeur: 0,
    valeurImmobilier: 0,
    nombreBiens: 0,
    annexe: false
  },
  compute: (settings, value) => {
    const bareme = new Bareme("H");
    const tauxTva = 0.21
    let honoraire = bareme.compute(value.valeur).total;
    if (honoraire < 7.5) {
      honoraire = 7.5
    }
    let droitEnregistrement = (0.01 * value.valeurImmobilier);

    if (value.annexe) {
      droitEnregistrement += 100;
    }

    let eRegistration = getSetting('e_registration', settings);

    let fraisDivers = getSetting('frais_divers_partage', settings);

    let droitEcriture = getSetting('droit_ecriture', settings);

    let transcription = getSetting('transcription', settings);

    fraisDivers += value.nombreBiens * getSetting('frais_divers_partage_ajout_par_bien', settings);

    let tva = +((tauxTva) * (honoraire + droitEcriture + fraisDivers + eRegistration)).toFixed(2);

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
