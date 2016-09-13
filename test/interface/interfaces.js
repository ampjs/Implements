let {
        Implements,
        Interface,
        Trait,
        Class
    } = require('../../examples/lib/MyClass.js'),
    chai = require('chai');

let MyClass = new Class();

describe('Interfaces Class Tests', function() {
    require('./units.js');
    require('./errors.js');
});

describe('Implemented Class Tests', function() {
    it('Class.Interface is an Object.', function() {
        chai.expect(MyClass.ImplementsInterface).to.be.an('Object');
    });

    it('Class.Interface implementation should be MyClass.', function() {
        chai.expect(MyClass.ImplementsInterface.implements.name).to.have.string('MyClass');
    });

    it('Class.Interface has correct attachements.', function() {
        let attached = MyClass.ImplementsInterface.attached;
        chai.expect(attached.interfaces).to.deep.equal(['MyInterface']);
        chai.expect(attached.methods).to.deep.equal(['interfaceMethod']);
    });

    it('Class.Interface has correct exceptions.', function() {
        let except = MyClass.ImplementsInterface.exceptions;
        chai.expect(except).to.deep.equal(['constructor', 'length', 'name', 'prototype']);
    });
});

describe('Apply seperately', function() {

    class TestInterfaceClass {

    }

    class TestInterface {
        testMethod() {}
    }

    it('Can apply.', function() {
        console.log('Processed', Interface.apply(TestInterfaceClass, [TestInterface]));
    });
});
