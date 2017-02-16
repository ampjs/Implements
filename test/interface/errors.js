import chai from 'chai';
import Interface from '../../src/Interface.js';

describe('Errors', () => {
    it('Expect test class to throw missing method Error.', () => {
        class TestInterface {
            interfaceMethod() {}
        }

        class TestClass {
            interfaces() {
                return [TestInterface];
            }
        }

        chai.expect(() => {
            let MyClassImplemented = new (new Interface(TestClass)).implements;
        }).to.throw('Interface: interfaceMethod required in TestClass');
    });

    it('Expect test class to throw missing arguments Error.', () => {
        class TestInterface {
            interfaceMethod(arg, another) {}
        }

        class TestClass {
            interfaces() {
                return [TestInterface];
            }

            interfaceMethod() {
                return 'interfaceMethod without arguments.';
            }
        }

        chai.expect(() => {
            let MyClassImplemented = new (new Interface(TestClass)).implements;
        }).to.throw('Interface: interfaceMethod arguments do not match.');
    });

    it('Expect test class to not throw Errors.', () => {
        class TestInterface {
            interfaceMethod(arg) {}
        }

        class TestClass {
            interfaces() {
                return [TestInterface];
            }

            interfaceMethod(arg) {
                return 'interfaceMethod with argument; ' + arg;
            }
        }

        let createInterfaceCall = () => {
            let MyClassImplemented = new (new Interface(TestClass)).implements;
            return MyClassImplemented;
        }

        chai.expect(createInterfaceCall).to.not.throw('Interface: interfaceMethod required in TestClass');
        chai.expect(createInterfaceCall).to.not.throw('Interface: interfaceMethod arguments do not match.');
        chai.expect(createInterfaceCall().interfaceMethod('foo')).to.have.string('interfaceMethod with argument; foo');
    });
})
