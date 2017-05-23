/**
 * Created by justin on 27/01/17.
 */

const tableau = {
    A: [0.25,0.20,0.15,0.10,0.05,0.02,0.01],
    B: [0.35,0.30,0.20,0.15,0.10,0.05,0.02],
    C: [0.50,0.40,0.30,0.20,0.10,0.05,0.02],
    D: [0.75,0.60,0.40,0.30,0.20,0.10,0.03],
    E: [1.00,0.75,0.50,0.40,0.25,0.10,0.03],
    F: [1.25,1.00,0.60,0.50,0.40,0.20,0.04],
    G: [1.50,1.20,0.80,0.60,0.40,0.20,0.04],
    H: [2.50,1.50,1.25,1.00,0.75,0.50,0.05],
    I: [3.00,2.25,1.50,1.00,0.75,0.50,0.05],
    J: [4.00,2.50,2.00,1.50,1.00,0.50,0.05],
    K: [5.00,4.50,4.00,3.50,2.50,1.20,0.10]
};
const tranche = [7500,10000,12500,15495,18600,186000];
function dotProduct(a,b) {
    let n = 0, lim = Math.min(a.length,b.length);
    for (let i = 0; i < lim; i++) n += a[i] * b[i];
    return n;
}

function newDotProduct(a,b) {
    let acc = 0;
    for (let i=0;i<a.length;i++){
        if (i==0) {
            acc = a[0]*b[0];
        }
        else {
            acc = acc+(a[i]*(b[i]-b[i-1]));
        }
    }

    return acc;
}
export default class Bareme {
    constructor(type) {
        this.type = type
    }
    compute(value){
        //value = 176000;
        let result = {
            tranche: [],
            total: 0
        };
        let currentBareme = tableau[this.type];

        //greatestN Index of the greatest value of tranche less than value
        let greatestN=-1;
        while (tranche[greatestN+1]<value){
            greatestN++;
        }

        //Percs is like a copy of Bareme but limited to the usefull value and divided by 100

        let percs = [];

        for (let i=0;i<=greatestN;i++)
        {
            percs.push(currentBareme[i]/100);
        }
        //Tranche N is like tranche but filled with value, ex: 8000 = [7500,500]

        let trancheN = [];

        for (let i=0;i<=greatestN;i++)
        {
            trancheN.push(tranche[i]);
        }

        let retrait= 0;
        if(greatestN > -1){
            retrait = tranche[greatestN];
        }
        result.total = ((newDotProduct(percs,trancheN))+((currentBareme[greatestN+1]/100)*(value-retrait)));

        return result
    }
}