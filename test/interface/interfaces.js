import {
    Implements,
    Interface,
    Trait,
    Class
} from '../../examples/src/MyClass.js';
import chai from 'chai';

let MyClass = new Class();

describe('Interfaces Class Tests', () => {
    require('./units.js');
    require('./errors.js');
});

describe('Implemented Class Tests', () => {
    it('Class.Interface is an Object.', () => {
        chai.expect(MyClass.ImplementsInterface).to.be.an('Object');
    });

    it('Class.Interface implementation should be MyClass.', () => {
        chai.expect(MyClass.ImplementsInterface.implements.name).to.have.string('MyClass');
    });

    it('Class.Interface has correct attachements.', () => {
        let attached = MyClass.ImplementsInterface.attached;
        chai.expect(attached.interfaces).to.deep.equal(['MyInterface']);
        chai.expect(attached.methods).to.deep.equal(['interfaceMethod']);
    });

    it('Class.Interface has correct exceptions.', () => {
        let except = MyClass.ImplementsInterface.exceptions;
        chai.expect(except).to.deep.equal(['constructor', 'length', 'name', 'prototype']);
    });
});

describe('Apply seperately', () => {

    class TestInterfaceClass {
        testMethod() {
            return true;
        }
    }

    class TestInterface {
        testMethod() {}
    }

    it('Can apply.', () => {
        try {
            Interface.apply(TestInterfaceClass, [TestInterface]);
        } catch(e) {
            throw new Error(e);
        }
    });
});
