'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Implements and checks for required methods.
 * @class ImplementsInterface
 * @classdesc Checks for required methods
 */

var ImplementsInterface = function () {

    /**
     * Class constructor
     * @param  {Class} implement - The class for traits to be implemented on.
     * @return {Object}           Returns `this`
     */

    function ImplementsInterface(implement) {
        _classCallCheck(this, ImplementsInterface);

        /**
         * The target class to have traits implemented on.
         * @type {Object}
         */
        this.implements = implement;

        /**
         * Arrays of interfaces and methods attached
         * or used by the target class.
         * @type {Object}
         */
        this.attached = {
            'interfaces': [],
            'methods': []
        };

        /**
         * Methods that are skipped over in
         * interface checks.
         * @todo Constructor addition is a temporary removal to prevent
         * a breakage in argument checking. Needs to be fixed.
         * @type {Array}
         */
        this.exceptions = ['constructor', 'length', 'name', 'prototype'];

        this.check();

        /**
         * The current interface in the loop.
         * @type {Object}
         */
        this.current = null;

        return this;
    }

    /**
     * Typeof to check whether the interfaces method exists by checking
     * if it's a function.
     * @return {Boolean} Whether interfaces method exists.
     */


    _createClass(ImplementsInterface, [{
        key: '_getInterfaceMethod',


        /**
         * Get a method from the current interface.
         * @todo Combine with _getClassMethod
         *
         * @param {String} method - The method name.
         * @return {Function|null} - The method of the current interface.
         */
        value: function _getInterfaceMethod(method) {
            var the_method = this.current.prototype[method];

            if (typeof the_method !== 'undefined') {
                return the_method;
            }

            // Maybe static?
            the_method = this.current[method];

            if (typeof the_method !== 'undefined') {
                return the_method;
            }

            return null;
        }

        /**
         * Get a method from the current interface.
         * @todo Combine with _getInterfaceMethod
         *
         * @param {String} method - The method name.
         * @return {Function|null} - The method of the current interface.
         */

    }, {
        key: '_getClassMethod',
        value: function _getClassMethod(method) {
            var the_method = this.implements.prototype[method];

            if (typeof the_method !== 'undefined') {
                return the_method;
            }

            // Maybe static?
            the_method = this.implements[method];

            if (typeof the_method !== 'undefined') {
                return the_method;
            }

            return null;
        }

        /**
         * Add additional method names to the exceptions array.
         * @param  {String} methods A method name, one per argument.
         * @return {Object}         Returns `this`
         */

    }, {
        key: 'except',
        value: function except() {
            for (var _len = arguments.length, methods = Array(_len), _key = 0; _key < _len; _key++) {
                methods[_key] = arguments[_key];
            }

            for (var i in methods) {
                this.exceptions.push(methods[i]);
            }

            return this;
        }

        /**
         * Get the interface methods as a Symbol iterator.
         * @param  {Object} interfaces Classes of methods.
         * @return {Object}            Symbol iterator
         */

    }, {
        key: 'interfaceMethods',
        value: function interfaceMethods() {
            var methods = [];

            for (var _len2 = arguments.length, interfaces = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                interfaces[_key2] = arguments[_key2];
            }

            for (var i in interfaces) {
                var inter = Object.getOwnPropertyNames(interfaces[i]);

                methods = methods.concat(inter);
            }

            return methods[Symbol.iterator]();
        }

        /**
         * Loops through the given interfaces and runs through
         * the required checks.
         *
         * @return {void}
         */

    }, {
        key: 'check',
        value: function check() {
            var interfaces = this.interface;

            for (var i in interfaces) {
                if (typeof interfaces[i] === 'undefined') {
                    throw new Error('Interface: cannot check an interface, the class seems to be undefined.\n' + 'Are you using named imports where you shouldn\'t?');
                }

                /**
                 * The current interface being looped through.
                 * @type {Object}
                 */
                this.current = interfaces[i];

                var _methods = this.interfaceMethods(this.current.prototype, this.current);

                this.iteratorLoop(_methods, this._checkInterface.bind(this));
                this.attached.interfaces.push(this.current.name);
            }
        }

        /**
         * Loops through any passed Array iterator and
         * and returns the value through a callback.
         * @param  {Array}   iterator Array iterator
         * @param  {Function} callback function to use as the callback
         * @return {void}
         */

    }, {
        key: 'iteratorLoop',
        value: function iteratorLoop(iterator, callback) {
            var iteration = iterator.next();

            while (iteration.done === false) {

                if (this.exceptions.indexOf(iteration.value) === -1) {
                    callback(iteration.value);
                }

                iteration = iterator.next();
            }
        }

        /**
         * Checks whether the passed method name is within the
         * implemented props/method list.
         * @param  {String} method The menthod name to Checks
         * @return {Object}        Returns `this`
         */

    }, {
        key: '_checkInterface',
        value: function _checkInterface(method) {
            if (this.implementProps.indexOf(method) === -1) {
                throw new Error('Interface: ' + method + ' required in ' + this.implements.name);
            }

            if (!this._checkInterfaceArguments(method)) {
                throw new Error('Interface: ' + method + ' arguments do not match.');
            }

            this.attached.methods.push(method);

            return this;
        }

        /**
         * Checks the interface arguments against the ones
         * set it the class.
         * @param  {String} method The method name to check
         * @return {boolean}       Whether the arguments match or not.
         */

    }, {
        key: '_checkInterfaceArguments',
        value: function _checkInterfaceArguments(method) {
            var class_method_args = this._interfaceArguments(this._getClassMethod(method)),
                interface_method_args = this._interfaceArguments(this._getInterfaceMethod(method));

            if (interface_method_args === class_method_args) {
                return true;
            }

            return false;
        }

        /**
         * Get the arguments from the given method
         * by converting the function into a String
         * and checking the declerations.
         * @param  {Function} method The method to get arguments of.
         * @return {String}          The arguments found.
         */

    }, {
        key: '_interfaceArguments',
        value: function _interfaceArguments(method) {
            var args = method.toString().match(/.*?\(([^)]*)\)/);

            if (typeof args !== 'undefined') {
                return args[1];
            }

            return '';
        }
    }, {
        key: 'interfaces_is_func',
        get: function get() {
            return typeof this.implements.prototype.interfaces === 'function';
        }

        /**
         * Typeof to check whether the interfaces method returns an Array.
         * @return {Boolean} Whether interfaces method returns an array.
         */

    }, {
        key: 'interfaces_is_object',
        get: function get() {
            return Array.isArray(this.implements.prototype.interfaces());
        }

        /**
         * Get the methods from this.implement
         * @return {Array} Array of method names
         */

    }, {
        key: 'implementNonStaticProps',
        get: function get() {
            return Object.getOwnPropertyNames(this.implements.prototype);
        }

        /**
         * Get the static methods from this.implement
         * @return {Array} Array of static method names
         */

    }, {
        key: 'implementStaticProps',
        get: function get() {
            return Object.getOwnPropertyNames(this.implements);
        }

        /**
         * Get the combined methods of non-static and static methods.
         * @return {Array} Array of method names
         */

    }, {
        key: 'implementProps',
        get: function get() {
            return this.implementNonStaticProps.concat(this.implementStaticProps);
        }

        /**
         * Getter for the interfaces method values attached to
         * the implemented class.
         * @return {Array} - Value of the interfaces method or empty array.
         */

    }, {
        key: 'interface',
        get: function get() {
            if (this.interfaces_is_func && this.interfaces_is_object) {
                return this.implements.prototype.interfaces();
            }

            return [];
        }
    }]);

    return ImplementsInterface;
}();

exports.default = ImplementsInterface;