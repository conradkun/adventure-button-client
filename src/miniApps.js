import React from 'react';
import VenteGreGre from './components/miniApps/vente-gre-gre'
import Bareme from './utils/bareme';

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

let miniApps = [
  {
    code: 'vente-gre-gre',
    name: 'Vente de Gré à Gré',
    input: <VenteGreGre/>,
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

      bruxelles:{
        region: 'bruxelles',
        prix: 0,
        annexe: false,
        abattement: false
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

          let fraisDivers = getSetting('frais_divers_vente_gre_a_gre', settings);


          let tva = +((0.21) * (honoraire + droitEcriture + fraisDivers + eRegistration)).toFixed(2);



          let transcription = 220;

          var result = [
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

          /*------------------------------------*\
              #Reduction honoraire après le calcul de la tva
          \*------------------------------------*/
          if (value.droitEnregistrement === 5) {
            result.push({
              label: 'Reduction d\'honoraire',
              value: -(250 * 1.21)
            });
          }


          return result;
        }
      if(value.region === 'bruxelles') {
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

        let droitEcriture = 50;

        let eRegistration = 45;

        let fraisDivers = getSetting('frais_divers_vente_gre_a_gre', settings);

        let tva = +((0.21) * (honoraire + droitEcriture + fraisDivers + eRegistration)).toFixed(2);



        let transcription = 220;

        var result = [
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
    }
  },
]

export default miniApps;
