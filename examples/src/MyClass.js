import { Implements, Interfaces, Traits } from '../../implements.js';
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
    Interfaces,
    Traits,
    Class,
    MyInterface,
    MyTrait,
    MyDependancy
};
