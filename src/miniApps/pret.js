import React from 'react';
import Pret from '../components/miniApps/pret';
import Bareme from '../utils/bareme';

function getSetting(shortcode, settings){
  let setting;
  settings.forEach((s) => {
    if(s.shortcode === shortcode){
      setting = s
    }
  })
  if(!setting){
    console.error("Nonexistent Setting");
    return 0;
  }
  return setting.value;
}
const miniApp =
{
  code: 'pret',
  name: 'Prêt',
  mainField: 'pret',
  input: <Pret/>,
  defaultValue: {
    pret: 0,
    droitEnregistrement: 1,
    reductionHonoraire: false,
    annexe: false
  },
  compute: (settings, value) => {
    const bareme = new Bareme("F");
    const tauxTva = 0.21
    let honoraire = bareme.compute(value.pret).total;
    if(value.reductionHonoraire){
      honoraire = honoraire / 2;
    }
    if (honoraire < 7.5) {
      honoraire = 7.5
    }
    let droitEnregistrement = (value.droitEnregistrement / 100 * value.pret);

    if (value.annexe) {
      droitEnregistrement += 100;
    }

    let droitInscription = (0.003 * value.pret);

    let eRegistration = getSetting('e_registration', settings);

    let fraisDivers = getSetting('frais_divers_credit', settings);

    let droitEcriture = getSetting('droit_ecriture', settings);

    let tva = +((tauxTva) * (honoraire + droitEcriture + fraisDivers + eRegistration)).toFixed(2);

    var salaireConservateur = 210;

    if(value.pret > 300000) {
      salaireConservateur = 900;
    }

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
          label: 'Salaire du conservateur',
          value: salaireConservateur,
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
