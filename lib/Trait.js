'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Allows for the implementation of traits on a given class.
 * @class ImplementsTrait
 * @classdesc Allows for the implementation of traits on
 * a given class.
 */

var ImplementsTrait = function () {

    /**
     * Class constructor
     * @param  {Class} implement - The class for traits to be implemented on.
     * @param  {...*} params - Any parameters to be used and instatiates the class.
     * @return {Object}           Returns either `this` or value of _()
     */

    function ImplementsTrait(implement) {
        _classCallCheck(this, ImplementsTrait);

        /**
         * The target class to have traits implemented on.
         * @type {Object}
         */
        this.implements = implement;

        /**
         * Don't attach the following.
         * @type {Array}
         */
        this.except_methods = ['constructor', 'prototype', 'name'];

        /**
         * Arrays of traits and methods attached to
         * the target class.
         * @type {Object}
         */
        this.attached = {
            'traits': [],
            'methods': []
        };

        this.addArray();

        for (var _len = arguments.length, params = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            params[_key - 1] = arguments[_key];
        }

        if (params.length > 0) {
            return this._.apply(this, params);
        }

        return this;
    }

    /**
     * @public
     * Instanciates and returns the implemented class.
     * @param   {...*} params - List of parameters to pass to implements
     * @returns {Object} - Instanciates and returns the implemented class.
     */


    _createClass(ImplementsTrait, [{
        key: '_',
        value: function _() {
            for (var _len2 = arguments.length, params = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                params[_key2] = arguments[_key2];
            }

            return new (Function.prototype.bind.apply(this.implements, [null].concat(params)))();
        }

        /**
         * Getter for the traits method values attached to
         * the implemented class.
         * @return {Array} - Value of the traits method or empty array.
         */

    }, {
        key: 'addArray',


        /**
         * Loops through the list of traits to create them.
         *
         * @param  {Object} traits A number of traits to be processed
         * @return {void}
         */
        value: function addArray() {
            var traits = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];

            var trait_array = traits || this.traits;

            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = trait_array[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var trait = _step.value;

                    this.add(trait);

                    // Add a the traits list to the class.
                    this.attached.traits.push(trait.name);
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            return this;
        }

        /**
         * Loops through and adds the trait methods to the
         * given class defined by this.implement
         * @todo tidy up and create better method of checking
         * if the key is a constructor, prototype or name.
         *
         * @param  {Object} trait={} Trait to be added
         * @return {void}
         */

    }, {
        key: 'add',
        value: function add() {
            var trait = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = Reflect.ownKeys(trait.prototype)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var key = _step2.value;

                    this.addMethod(key, this._getDescriptor(trait.prototype, key));
                }
            } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
                        _iterator2.return();
                    }
                } finally {
                    if (_didIteratorError2) {
                        throw _iteratorError2;
                    }
                }
            }

            return this;
        }

        /**
         * Add a given method to the implements class.
         * @param {String} key        Name of the new key. Should be duplicate of
         * the one found in the trait.
         * @param {function} descriptor The function to attach to the implemented class.
         * @return {void}
         */

    }, {
        key: 'addMethod',
        value: function addMethod(key, descriptor) {
            if (this.except_methods.indexOf(key) === -1 && this.implementProps.indexOf(key) === -1) {
                Object.defineProperty(this.implements.prototype, key, descriptor);
                this.attached.methods.push(key);
            }
        }

        /**
         * Returns the descriptor of a given prototype.
         * @param  {Object} trait Prototype of the trait.
         * @param  {String} key   Method name to get the descriptor of.
         * @return {Function}     Descriptor of the requested method.
         */

    }, {
        key: '_getDescriptor',
        value: function _getDescriptor(trait, key) {
            return Object.getOwnPropertyDescriptor(trait, key);
        }
    }, {
        key: 'traits',
        get: function get() {
            if (this.traits_is_func && this.traits_is_object) {
                return this.implements.prototype.traits();
            }

            return [];
        }

        /**
         * Typeof to check whether the traits method exists by checking
         * if it's a function.
         * @return {Boolean} Whether traits method exists.
         */

    }, {
        key: 'traits_is_func',
        get: function get() {
            return typeof this.implements.prototype.traits === 'function';
        }

        /**
         * Typeof to check whether the traits method returns an Array.
         * @return {Boolean} Whether traits method returns an array.
         */

    }, {
        key: 'traits_is_object',
        get: function get() {
            return Array.isArray(this.implements.prototype.traits());
        }

        /**
         * Get the methods from this.implement
         * @return {Array} Array of method names
         */

    }, {
        key: 'implementProps',
        get: function get() {
            return Object.getOwnPropertyNames(this.implements.prototype);
        }
    }]);

    return ImplementsTrait;
}();

exports.default = ImplementsTrait;