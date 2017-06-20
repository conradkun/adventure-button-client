import React from 'react';
import VenteGreGre from '../components/miniApps/vente-gre-gre'
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
  code: 'vente-gre-gre',
  name: 'Vente de Gré à Gré',
  input: <VenteGreGre/>,
  defaultValue: {
    region: 'wallonie',
    prix: 0,
    droitEnregistrement: 12,
    annexe: false,
    pressionImmobiliere: 0,


    flandre:{
      region: 'flandre',
      prix: 0,
      droitEnregistrement: 10,
      annexe: false,
      abattement: 0
    },

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
      abattement: 0
    }

  },
  compute: (settings, value) => {
    const bareme = new Bareme("J");
    let honoraire = bareme.compute(value.prix).total;

    const pressionImmobiliereForte = 164922.59;
    const pressionImmobiliereNormale = 154614.92;
    const tauxTva = 0.21
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

        let droitEcriture = getSetting('droit_ecriture', settings);

        let eRegistration = getSetting('e_registration', settings);

        let fraisDivers = getSetting('frais_divers_vente_gre_a_gre', settings);


        let tva = +((tauxTva) * (honoraire + droitEcriture + fraisDivers + eRegistration)).toFixed(2);



        let transcription = getSetting('transcription', settings);;

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

        /*------------------------------------*\
            #Reduction honoraire après le calcul de la tva
        \*------------------------------------*/
        if (value.droitEnregistrement === 5) {
          result.push({
            label: 'Réduction d\'honoraire',
            value: -(250 * (1 + tauxTva)),
            etat: false
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
        droitEnregistrement = (12.5 / 100) * (value.prix - value.abattement);
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
    if(value.region === 'flandre') {
      if (honoraire < 7.5) {
        honoraire = 7.5
      }

      let droitEnregistrement = 0;

      /*------------------------------------*\
          #Abattement (Au choix)
      \*------------------------------------*/
      if(value.abattement){
        droitEnregistrement = (value.droitEnregistrement / 100) * (value.prix - value.abattement);
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
}


export default miniApp;
