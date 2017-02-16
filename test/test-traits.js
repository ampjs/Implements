import {
    Implements,
    Interfaces,
    Traits,
    Class,
    MyInterface,
    MyTrait,
    MyDependancy
} from '../examples/src/MyClass.js';


describe('Do traits work in self?', function() {

    it('Trait in self.', function() {
        console.log((new Class).interfaceMethod());
    });
});
