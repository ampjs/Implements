let chai = require('chai'),
    Interface = require('../../lib/Interface.js').default;

describe('Units', function() {
    class TestInterface {
        interfaceMethod() {}
    }

    class TestClass {
        interfaces() {
            return [TestInterface];
        }

        interfaceMethod() {
            return 'interfaceMethod';
        }
    }

    let InterfaceClass = new Interface(TestClass);

    it('interfaces_is_func is a boolean.', function() {
        chai.expect(InterfaceClass.interfaces_is_func).to.be.true;
    });

    it('interfaces_is_object is a boolean.', function() {
        chai.expect(InterfaceClass.interfaces_is_object).to.be.true;
    });

    it('interfaces_is_func is an object.', function() {
        chai.expect(InterfaceClass.interfaces_is_object).to.be.true;
    })
});
