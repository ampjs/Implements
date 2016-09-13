let assert = require('assert'),
    chai = require('chai'),
    { Implements } = require('../implements.js'),
    Class = require('../examples/example.js'),
    MyDependancy = require('../examples/lib/MyDependancy.js');

let newClass = new Class();

describe('Implements', function() {
    describe('Interfaces', function() {
        it('Class.interfaces is an array.', function() {
            let classInterfaces = Class.interfaces;

            chai.expect(classInterfaces).to.be.an('array');
            chai.expect(classInterfaces).to.deep.equal(['MyInterface']);
        });
    });

    describe('Traits', function() {
        it('Class.traits is an array.', function() {
            let classTraits = Class.traits;

            chai.expect(classTraits).to.be.an('array');
            chai.expect(classTraits).to.deep.equal(['MyTrait']);
        });

        it('Instantiated Class.baseTrait() is a string.', function() {
            let baseTrait = newClass.baseTrait();

            chai.expect(baseTrait).to.be.an('string');
            chai.expect(baseTrait).to.equal('Base trait.');
        });

        it('Instantiated Class.overwriteTrait() has been overwritten.', function() {
            let overwriteTrait = newClass.overwriteTrait();

            chai.expect(overwriteTrait).to.be.an('string');
            chai.expect(overwriteTrait).not.to.equal('This trait should be overwritten');
        });
    });

    describe('Dependancies', function() {
        it('Instantiated Class.addDependancy should return an instance of MyDependancy.', function() {
            let classDependancy = newClass.addDependancy('test', 'test2');

            chai.expect(classDependancy).to.deep.equal({ args: { first: 'test', second: 'test2' } });
        });

        it('Dependant object should have callable method.', function() {
            let classDependancy = newClass.addDependancy('test', 'test2');

            chai.expect(classDependancy.getDependancy).to.be.a('function');
            chai.expect(classDependancy.getDependancy()).to.equal('Dependancy method!');
        });
    });
});
