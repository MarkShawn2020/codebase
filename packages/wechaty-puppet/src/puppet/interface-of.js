import { interfaceOfClass, looseInstanceOfClass, } from 'clone-class';
import { Puppet, } from './puppet-abstract.js';
const interfaceOfPuppet = interfaceOfClass(Puppet)();
const looseInstanceOfPuppet = looseInstanceOfClass(Puppet);
export { interfaceOfPuppet, looseInstanceOfPuppet, };
