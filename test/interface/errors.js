let chai = require('chai'),
    Interface = require('../../lib/Interface.js').default;

describe('Errors', function() {
    it('Expect test class to throw missing method Error.', function() {
        class TestInterface {
            interfaceMethod() {}
        }

        class TestClass {
            interfaces() {
                return [TestInterface];
            }
        }

        chai.expect(function() {
            let MyClassImplemented = new (new Interface(TestClass)).implements;
        }).to.throw('Interface: interfaceMethod required in TestClass');
    });

    it('Expect test class to throw missing arguments Error.', function() {
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

        chai.expect(function() {
            let MyClassImplemented = new (new Interface(TestClass)).implements;
        }).to.throw('Interface: interfaceMethod arguments do not match.');
    });

    it('Expect test class to not throw Errors.', function() {
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

        let createInterfaceCall = function() {
            let MyClassImplemented = new (new Interface(TestClass)).implements;
            return MyClassImplemented;
        }

        chai.expect(createInterfaceCall).to.not.throw('Interface: interfaceMethod required in TestClass');
        chai.expect(createInterfaceCall).to.not.throw('Interface: interfaceMethod arguments do not match.');
        chai.expect(createInterfaceCall().interfaceMethod('foo')).to.have.string('interfaceMethod with argument; foo');
    });
})
