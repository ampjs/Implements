let {
        Implements,
        Interface,
        Trait,
        Type
    } = require('../implements.js'),
    chai = require('chai');

describe('String', function() {
    it('is a String.', function() {
        chai.expect(Type.is(String, "Test string")).to.be.an('String');
        chai.expect(Type.is(String, "Test string")).to.equal("Test string");
    });

    it('is not a String.', function() {
        chai.expect(function() {
            Type.is(Object, "Test string");
        }).to.throw('Type: Expected value to be object, string found.');
    });
});

describe('Object', function() {
    it('is a Object.', function() {
        chai.expect(Type.is(Object, {})).to.be.an('Object');
        chai.expect(Type.is(Object, {})).to.deep.equal({});
    });

    it('is not a Object.', function() {
        chai.expect(function() {
            Type.is(String, {});
        }).to.throw('Type: Expected value to be string, object found.');
    });
});

describe('Boolean', function() {
    it('is a Boolean.', function() {
        chai.expect(Type.is(Boolean, true)).to.be.an('Boolean');
        chai.expect(Type.is(Boolean, true)).to.deep.equal(true);
    });

    it('is not a Boolean.', function() {
        chai.expect(function() {
            Type.is(String, true);
        }).to.throw('Type: Expected value to be string, boolean found.');
    });
});

describe('Number', function() {
    it('is a Number.', function() {
        chai.expect(Type.is(Number, 42)).to.be.an('Number');
        chai.expect(Type.is(Number, 42)).to.deep.equal(42);
    });

    it('is not a Number.', function() {
        chai.expect(function() {
            Type.is(String, 42);
        }).to.throw('Type: Expected value to be string, number found.');
    });
});

describe('Number', function() {
    it('is a Number.', function() {
        chai.expect(Type.is(Number, 42)).to.be.an('Number');
        chai.expect(Type.is(Number, 42)).to.deep.equal(42);
    });

    it('is not a Number.', function() {
        chai.expect(function() {
            Type.is(String, 42);
        }).to.throw('Type: Expected value to be string, number found.');
    });
});
