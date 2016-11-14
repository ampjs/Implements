'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Trait = exports.Interface = exports.Implements = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Interface = require('./Interface.js');

var _Interface2 = _interopRequireDefault(_Interface);

var _Trait = require('./Trait.js');

var _Trait2 = _interopRequireDefault(_Trait);

require('babel-polyfill');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * A class for implementation of Interfaces and Traits.
 * @class Implements
 * @classdesc Base class for implementation of Interfaces and Traits.
 */

var Implements = function () {

    /**
     * Class constructor
     * @param  {Class} implement_class - Class to have implementation on.
     * @param  {...*} trait_params - Parameters to be passed to the traits.
     * @return {Class}                Return the implemented class.
     */

    function Implements(implement_class) {
        _classCallCheck(this, Implements);

        /**
         * The target class to have traits implemented on.
         * @type {Object}
         */
        this.implements = implement_class;

        this._CheckInterfaces();

        for (var _len = arguments.length, trait_params = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            trait_params[_key - 1] = arguments[_key];
        }

        this._AttachTraits.apply(this, trait_params);

        return this.implements;
    }

    /**
     * Attaches traits to the implementation target.
     * @param  {...*} params Parameters that could be passed to the implementation class.
     * @return {void}
     */


    _createClass(Implements, [{
        key: '_AttachTraits',
        value: function _AttachTraits() {
            for (var _len2 = arguments.length, params = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                params[_key2] = arguments[_key2];
            }

            /**
             * Instanciates a new Trait class.
             * @type {Object}
             */
            this.attach(new (Function.prototype.bind.apply(_Trait2.default, [null].concat([this.implements], params)))());
        }

        /**
         * Checks the interfaces of required by the implementation target.
         * @return {void}
         */

    }, {
        key: '_CheckInterfaces',
        value: function _CheckInterfaces() {

            /**
             * Instanciates a new Interface class.
             * @type {Object}
             */
            this.attach(new _Interface2.default(this.implements));
        }

        /**
         * Attaches the a given class to the implemented class.
         * @param  {Object} attachment Class to attach.
         * @return {void}
         */

    }, {
        key: 'attach',
        value: function attach(attachment) {
            if (typeof attachment.implements === 'undefined') {
                throw new Error('Cannot attach an unimplemented class.');
            }

            this.implements = attachment.implements;

            Object.defineProperty(this.implements.prototype, attachment.constructor.name, {
                'enumerable': false,
                'editable': false,
                'writable': false,
                'value': attachment
            });
        }

        /**
         * Dependancy Injection method.
         * @todo Check and sort the dependancies into the right order
         * as shown in http://stackoverflow.com/questions/20058391/javascript-dependency-injection
         *
         * @param  {Class} Depend Dependancy to inject
         * @param  {...Mixed} param  Parameters to use.
         * @return {Class}        Returns the dependancy
         */

    }], [{
        key: 'dependancy',
        value: function dependancy(Depend) {
            for (var _len3 = arguments.length, params = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
                params[_key3 - 1] = arguments[_key3];
            }

            if (params[0] instanceof Depend) {
                return params;
            }

            var args = [];

            for (var param in params) {
                args.push(params[param]);
            }

            return new (Function.prototype.bind.apply(Depend, [null].concat(args)))();

            // return new (Function.prototype.bind.apply(depend, [null].concat(param)));
        }
    }]);

    return Implements;
}();

exports.Implements = Implements;
exports.Interface = _Interface2.default;
exports.Trait = _Trait2.default;