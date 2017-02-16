import chai from 'chai';
import Interface from '../../src/Interface.js';

describe('Units', () => {
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

    it('interfaces_is_func is a boolean.', () => {
        chai.expect(InterfaceClass.interfaces_is_func).to.be.true;
    });

    it('interfaces_is_object is a boolean.', () => {
        chai.expect(InterfaceClass.interfaces_is_object).to.be.true;
    });

    it('interfaces_is_func is an object.', () => {
        chai.expect(InterfaceClass.interfaces_is_object).to.be.true;
    })
});
