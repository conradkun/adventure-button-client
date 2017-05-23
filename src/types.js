import React from 'react';
import VenteGreGreWallonie from './components/miniApp/vente-gre-gre-wallonie'
class Type {
    constructor(code,name,description,component) {
        this.code = code;
        this.name = name;
        this.description = description;
        this.component = component;
    }
}
let Types = [
    new Type('vente-gre-gre-wallonie', 'Vente de Gré à Gré en Wallonie', 'Desc Here', <VenteGreGreWallonie />),
    new Type('donation', 'Donation', 'Desc Here', <VenteGreGreWallonie />),
    new Type('pret', 'Prêt', 'Desc Here', <VenteGreGreWallonie />),
    new Type('test', 'Test', 'Desc Here', <VenteGreGreWallonie />),
];
export default Types;