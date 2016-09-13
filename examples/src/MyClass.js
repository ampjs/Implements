import { Implements, Interface, Trait } from '../../implements.js';
import MyInterface from './MyInterface.js';
import MyTrait from './MyTrait.js';
import MyDependancy from './MyDependancy.js';

class TestClass {
    interfaces() {
        return [MyInterface];
    }

    traits() {
        return [MyTrait];
    }
}

class MyClass extends TestClass {
    constructor() {
        super();
    }

    interfaces() {
        return [MyInterface];
    }

    traits() {
        return [MyTrait];
    }

    overwriteTrait() {
        return 'Overwritten';
    }

    interfaceMethod(exampleArgument, withDefault) {
        console.log(this.baseTrait());
        return this;
    }

    someMethod() {
        return this;
    }

    addDependancy(...depParams) {
        return Implements.dependancy(MyDependancy, ...depParams);
    }
}

let Class = new Implements(MyClass);

export {
    Implements,
    Interface,
    Trait,
    Class,
    MyInterface,
    MyTrait,
    MyDependancy
};
