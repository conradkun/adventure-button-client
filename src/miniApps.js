import VenteGreGreWallonie from './miniApps/vente-gre-gre-wallonie';
import VenteGreGreFlandre from './miniApps/vente-gre-gre-flandre';
import VenteGreGreBruxelles from './miniApps/vente-gre-gre-bruxelles';
import MainLevee from './miniApps/mainlevee';
import Credit from './miniApps/credit';
import Pret from './miniApps/pret';
import MandatHypothecaire from './miniApps/mandat-hypothecaire';
import Cession from './miniApps/cession';
import Partage from './miniApps/partage';

let miniApps = [
  VenteGreGreWallonie,
  VenteGreGreFlandre,
  VenteGreGreBruxelles,
  MainLevee,
  Credit,
  Pret,
  MandatHypothecaire,
  Cession,
  Partage
];

let miniAppsList = [
  {
    name: 'Vente de Gré à Gré',
    code: [
      {
        region: 'wallonie',
        code: VenteGreGreWallonie.code
      },
      {
        region: 'flandre',
        code: VenteGreGreFlandre.code
      },
      {
        region: 'bruxelles',
        code: VenteGreGreBruxelles.code
      },
    ]
  },
  MainLevee,
  Credit,
  Pret,
  MandatHypothecaire,
  Cession,
  Partage
]
export { miniApps , miniAppsList }
