import React from 'react';
import VenteGreGreWallonie from './components/miniApps/vente-gre-gre-wallonie'
import Bareme from './utils/bareme';
class miniApp {
    constructor(code,name,description,component) {
        this.code = code;
        this.name = name;
        this.description = description;
        this.component = component;
    }
}

let miniApps = [
  {
    code: 'vente-gre-gre-wallonie',
    name: 'Vente de Gré à Gré en Wallonie',
    input: <VenteGreGreWallonie/>,
    defaultValue: {
      prix: 0,
      droitEnregistrement: 12,
      annexe: false,
      reductionHonoraire: 0
    },
    compute: (value) => {
      const bareme = new Bareme("J");
      let honoraire = +(bareme.compute(value.prix).total).toFixed(2);
      //TODO ask for rounding problem
      //Use that ? https://www.npmjs.com/package/money-math
      //Reduction d'honoraire
      if (value.reductionHonoraire) {
          honoraire -= 250;
      }


      if (honoraire < 7.5) {
          honoraire = 7.5
      }

      let droitEnregistrement = (value.droitEnregistrement / 100) * (value.prix);
      if (droitEnregistrement < 50) {
          droitEnregistrement = 50;
      }

      if (value.annexe) {
          droitEnregistrement += 50;
      }

      let droitEcriture = 50;

      let eRegistration = 45;

      let fraisDivers = 1000;

      let tva = +((0.21) * (honoraire + droitEcriture + fraisDivers + eRegistration)).toFixed(2);

      let transcription = 220;

      let result = [
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

      return result;
    }
  },
  {
    name: 'test'
  }
]

export default miniApps;
