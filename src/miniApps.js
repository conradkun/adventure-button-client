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
      region: 'wallonie',
      prix: 0,
      droitEnregistrement: 12,
      annexe: false,
      pressionImmobiliere: 0,



      wallonie:{
        region: 'wallonie',
        prix: 0,
        droitEnregistrement: 12,
        annexe: false,
        pressionImmobiliere: 0
      },

      flandre:{
        region: 'flandre',
        prix: 10000000,
        droitEnregistrement: 12,
        annexe: false,
        pressionImmobiliere: 0
      }

    },
    compute: (settings, value) => {
      const bareme = new Bareme("J");
      let honoraire = bareme.compute(value.prix).total;

      const pressionImmobiliereForte = 164922.59;
      const pressionImmobiliereNormale = 154614.92;

      /*------------------------------------*\
          #Region : wallonie
      \*------------------------------------*/

      if(value.region === 'wallonie') {

          if (honoraire < 7.5) {
            honoraire = 7.5
          }

          let droitEnregistrement = 0;

          /*------------------------------------*\
              #Remise sur droit d'enregistrement
          \*------------------------------------*/
          if(value.droitEnregistrement === 5 | value.droitEnregistrement === 6){

            let limitePressionImmobiliere = value.pressionImmobiliere ? pressionImmobiliereForte : pressionImmobiliereNormale;
            if(value.prix <= limitePressionImmobiliere){
              droitEnregistrement = (value.droitEnregistrement / 100) * (value.prix);
            }
            else {
              droitEnregistrement = (value.droitEnregistrement / 100) * (limitePressionImmobiliere);
              droitEnregistrement += (12.5 / 100) * (value.prix - limitePressionImmobiliere);
            }
          }
          else {
            droitEnregistrement = (value.droitEnregistrement / 100) * (value.prix);
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

          let droitEcriture = 50;

          let eRegistration = 45;

          let fraisDivers = 1000;

          let tva = +((0.21) * (honoraire + droitEcriture + fraisDivers + eRegistration)).toFixed(2);

          /*------------------------------------*\
              #Reduction honoraire après le calcul de la tva
          \*------------------------------------*/
          if (value.droitEnregistrement === 5) {
            tva -= 250 * 1.21;
          }

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
      if(value.region === 'flandre') {
        return []
      }
    }
  },
]

export default miniApps;
