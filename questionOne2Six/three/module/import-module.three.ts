import helloWorld from './module.three';
helloWorld();

// multiple importing
import { absolute, phi, pi } from './math.three';
const absPhi = absolute(phi);
console.log(pi);

// An import can be renamed
import { pi as whatEveryNameYouWant } from './math.three';
console.log(whatEveryNameYouWant);

// import everything with name
import * as nameYouWantToNamed from './math.three';
console.log(nameYouWantToNamed.pi);
