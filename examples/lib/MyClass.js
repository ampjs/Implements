'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.MyDependancy = exports.MyTrait = exports.MyInterface = exports.Class = exports.Trait = exports.Interface = exports.Implements = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _implements = require('../../implements.js');

var _MyInterface = require('./MyInterface.js');

var _MyInterface2 = _interopRequireDefault(_MyInterface);

var _MyTrait = require('./MyTrait.js');

var _MyTrait2 = _interopRequireDefault(_MyTrait);

var _MyDependancy = require('./MyDependancy.js');

var _MyDependancy2 = _interopRequireDefault(_MyDependancy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TestClass = function () {
    function TestClass() {
        _classCallCheck(this, TestClass);
    }

    _createClass(TestClass, [{
        key: 'interfaces',
        value: function interfaces() {
            return [_MyInterface2.default];
        }
    }, {
        key: 'traits',
        value: function traits() {
            return [_MyTrait2.default];
        }
    }]);

    return TestClass;
}();

var MyClass = function (_TestClass) {
    _inherits(MyClass, _TestClass);

    function MyClass() {
        _classCallCheck(this, MyClass);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(MyClass).call(this));
    }

    _createClass(MyClass, [{
        key: 'interfaces',
        value: function interfaces() {
            return [_MyInterface2.default];
        }
    }, {
        key: 'traits',
        value: function traits() {
            return [_MyTrait2.default];
        }
    }, {
        key: 'overwriteTrait',
        value: function overwriteTrait() {
            return 'Overwritten';
        }
    }, {
        key: 'interfaceMethod',
        value: function interfaceMethod(exampleArgument, withDefault) {
            console.log(this.baseTrait());
            return this;
        }
    }, {
        key: 'someMethod',
        value: function someMethod() {
            return this;
        }
    }, {
        key: 'addDependancy',
        value: function addDependancy() {
            for (var _len = arguments.length, depParams = Array(_len), _key = 0; _key < _len; _key++) {
                depParams[_key] = arguments[_key];
            }

            return _implements.Implements.dependancy.apply(_implements.Implements, [_MyDependancy2.default].concat(depParams));
        }
    }]);

    return MyClass;
}(TestClass);

var Class = new _implements.Implements(MyClass);

exports.Implements = _implements.Implements;
exports.Interface = _implements.Interface;
exports.Trait = _implements.Trait;
exports.Class = Class;
exports.MyInterface = _MyInterface2.default;
exports.MyTrait = _MyTrait2.default;
exports.MyDependancy = _MyDependancy2.default;