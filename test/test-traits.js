let {
    Implements,
    Interfaces,
    Traits,
    Class,
    MyInterface,
    MyTrait,
    MyDependancy
} = require('../examples/lib/MyClass.js');


describe('Do traits work in self?', function() {

    it('Trait in self.', function() {
        console.log((new Class).interfaceMethod());
    });
});
