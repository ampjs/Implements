Base trait.
MyClass {}
# TOC
   - [Implements](#implements)
   - [Interfaces](#interfaces)
     - [Interfaces Class Tests](#interfaces-interfaces-class-tests)
       - [Units](#interfaces-interfaces-class-tests-units)
       - [Errors](#interfaces-interfaces-class-tests-errors)
     - [Implemented Class Tests](#interfaces-implemented-class-tests)
     - [Apply seperately](#interfaces-apply-seperately)
   - [Traits](#traits)
     - [Do traits work in self?](#traits-do-traits-work-in-self)
   - [Dependancies](#dependancies)
<a name=""></a>
 
<a name="interfaces"></a>
# Interfaces
<a name="interfaces-interfaces-class-tests"></a>
## Interfaces Class Tests
<a name="interfaces-interfaces-class-tests-units"></a>
### Units
interfaces_is_func is a boolean..

```js
_chai2.default.expect(InterfaceClass.interfaces_is_func).to.be.true;
```

interfaces_is_object is a boolean..

```js
_chai2.default.expect(InterfaceClass.interfaces_is_object).to.be.true;
```

interfaces_is_func is an object..

```js
_chai2.default.expect(InterfaceClass.interfaces_is_object).to.be.true;
```

<a name="interfaces-interfaces-class-tests-errors"></a>
### Errors
Expect test class to throw missing method Error..

```js
var TestInterface = function () {
    function TestInterface() {
        _classCallCheck(this, TestInterface);
    }
    _createClass(TestInterface, [{
        key: 'interfaceMethod',
        value: function interfaceMethod() {}
    }]);
    return TestInterface;
}();
var TestClass = function () {
    function TestClass() {
        _classCallCheck(this, TestClass);
    }
    _createClass(TestClass, [{
        key: 'interfaces',
        value: function interfaces() {
            return [TestInterface];
        }
    }]);
    return TestClass;
}();
_chai2.default.expect(function () {
    var MyClassImplemented = new new _Interface2.default(TestClass).implements();
}).to.throw('Interface: interfaceMethod required in TestClass');
```

Expect test class to throw missing arguments Error..

```js
var TestInterface = function () {
    function TestInterface() {
        _classCallCheck(this, TestInterface);
    }
    _createClass(TestInterface, [{
        key: 'interfaceMethod',
        value: function interfaceMethod(arg, another) {}
    }]);
    return TestInterface;
}();
var TestClass = function () {
    function TestClass() {
        _classCallCheck(this, TestClass);
    }
    _createClass(TestClass, [{
        key: 'interfaces',
        value: function interfaces() {
            return [TestInterface];
        }
    }, {
        key: 'interfaceMethod',
        value: function interfaceMethod() {
            return 'interfaceMethod without arguments.';
        }
    }]);
    return TestClass;
}();
_chai2.default.expect(function () {
    var MyClassImplemented = new new _Interface2.default(TestClass).implements();
}).to.throw('Interface: interfaceMethod arguments do not match.');
```

Expect test class to not throw Errors..

```js
var TestInterface = function () {
    function TestInterface() {
        _classCallCheck(this, TestInterface);
    }
    _createClass(TestInterface, [{
        key: 'interfaceMethod',
        value: function interfaceMethod(arg) {}
    }]);
    return TestInterface;
}();
var TestClass = function () {
    function TestClass() {
        _classCallCheck(this, TestClass);
    }
    _createClass(TestClass, [{
        key: 'interfaces',
        value: function interfaces() {
            return [TestInterface];
        }
    }, {
        key: 'interfaceMethod',
        value: function interfaceMethod(arg) {
            return 'interfaceMethod with argument; ' + arg;
        }
    }]);
    return TestClass;
}();
var createInterfaceCall = function createInterfaceCall() {
    var MyClassImplemented = new new _Interface2.default(TestClass).implements();
    return MyClassImplemented;
};
_chai2.default.expect(createInterfaceCall).to.not.throw('Interface: interfaceMethod required in TestClass');
_chai2.default.expect(createInterfaceCall).to.not.throw('Interface: interfaceMethod arguments do not match.');
_chai2.default.expect(createInterfaceCall().interfaceMethod('foo')).to.have.string('interfaceMethod with argument; foo');
```

<a name="interfaces-implemented-class-tests"></a>
## Implemented Class Tests
Class.Interface is an Object..

```js
_chai2.default.expect(MyClass.ImplementsInterface).to.be.an('Object');
```

Class.Interface implementation should be MyClass..

```js
_chai2.default.expect(MyClass.ImplementsInterface.implements.name).to.have.string('MyClass');
```

Class.Interface has correct attachements..

```js
var attached = MyClass.ImplementsInterface.attached;
_chai2.default.expect(attached.interfaces).to.deep.equal(['MyInterface']);
_chai2.default.expect(attached.methods).to.deep.equal(['interfaceMethod']);
```

Class.Interface has correct exceptions..

```js
var except = MyClass.ImplementsInterface.exceptions;
_chai2.default.expect(except).to.deep.equal(['constructor', 'length', 'name', 'prototype']);
```

<a name="interfaces-apply-seperately"></a>
## Apply seperately
Can apply..

```js
try {
    _MyClass.Interface.apply(TestInterfaceClass, [TestInterface]);
} catch (e) {
    throw new Error(e);
}
```

<a name="traits"></a>
# Traits
<a name="traits-do-traits-work-in-self"></a>
## Do traits work in self?
Trait in self..

```js
console.log(new _MyClass.Class().interfaceMethod());
```

1487271999000
