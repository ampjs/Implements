/**
 * Implements and checks for required methods.
 * @class ImplementsInterface
 * @classdesc Checks for required methods
 */
class ImplementsInterface {

    /**
     * Class constructor
     * @param  {Class} implement - The class for interfaces to be implemented on.
     * @return {Object}           Returns `this`
     */
    constructor(implement) {

        /**
         * The target class to have interfaces implemented on.
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
            'methods': [],
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
    get interfaces_is_func() {
        return typeof this.implements.prototype.interfaces === 'function';
    }

    /**
     * Typeof to check whether the interfaces method returns an Array.
     * @return {Boolean} Whether interfaces method returns an array.
     */
    get interfaces_is_object() {
        return Array.isArray(this.implements.prototype.interfaces());
    }

    /**
     * Get the methods from this.implement
     * @return {Array} Array of method names
     */
    get implementNonStaticProps() {
        return Object.getOwnPropertyNames(this.implements.prototype);
    }

    /**
     * Get the static methods from this.implement
     * @return {Array} Array of static method names
     */
    get implementStaticProps() {
        return Object.getOwnPropertyNames(this.implements);
    }

    /**
     * Get the combined methods of non-static and static methods.
     * @return {Array} Array of method names
     */
    get implementProps() {
        return this.implementNonStaticProps.concat(this.implementStaticProps);
    }

    /**
     * Getter for the interfaces method values attached to
     * the implemented class.
     * @return {Array} - Value of the interfaces method or empty array.
     */
    get interface() {
        if(this.interfaces_is_func && this.interfaces_is_object) {
            return this.implements.prototype.interfaces();
        }

        return [];
    }

    /**
     * Get a method from the current interface.
     * @todo Combine with _getClassMethod
     *
     * @param {String} method - The method name.
     * @param {Object} get_from - The target.
     * @return {Function|null} - The method of the current interface.
     */
    _getMethod(method, get_from) {
        let the_method = get_from.prototype[method];

        if(typeof the_method !== 'undefined') {
            return the_method;
        }

        // Maybe static?
        the_method = get_from[method];

        if(typeof the_method !== 'undefined') {
            return the_method;
        }

        return null;
    }

    /**
     * Add additional method names to the exceptions array.
     * @param  {String} methods A method name, one per argument.
     * @return {Object}         Returns `this`
     */
    except(...methods) {
        for(let i in methods) {
            this.exceptions.push(methods[i]);
        }

        return this;
    }

    /**
     * Get the interface methods as a Symbol iterator.
     * @param  {Object} interfaces Classes of methods.
     * @return {Object}            Symbol iterator
     */
    interfaceMethods(...interfaces) {
        let methods = [];

        for(let i in interfaces) {
            let inter = Object.getOwnPropertyNames(interfaces[i]);

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
    check() {
        let interfaces = this.interface;

        for(let i in interfaces) {
            if(typeof interfaces[i] === 'undefined') {
                throw new Error('Interface: cannot check an interface, the class seems to be undefined.\n' +
                    'Are you using named imports where you shouldn\'t?');
            }

            /**
             * The current interface being looped through.
             * @type {Object}
             */
            this.current = interfaces[i];

            let methods = this.interfaceMethods(this.current.prototype, this.current);

            this.iteratorLoop(methods, this._checkInterface.bind(this));
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
    iteratorLoop(iterator, callback) {
        let iteration = iterator.next();

        while(iteration.done === false) {

            if(this.exceptions.indexOf(iteration.value) === -1) {
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
    _checkInterface(method) {
        if(this.implementProps.indexOf(method) === -1) {
            throw new Error(`Interface: ${method} required in ${this.implements.name}`);
        }

        if(!this._checkInterfaceArguments(method)) {
            throw new Error(`Interface: ${method} arguments do not match.`);
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
    _checkInterfaceArguments(method) {
        let class_method_args = this._interfaceArguments(this._getMethod(method, this.implements)),
            interface_method_args = this._interfaceArguments(this._getMethod(method, this.current));

        if(interface_method_args === class_method_args) {
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
    _interfaceArguments(method) {
        let args = method.toString().match(/.*?\(([^)]*)\)/);

        if(typeof args !== 'undefined') {
            return args[1];
        }

        return '';
    }
}

export default ImplementsInterface;
