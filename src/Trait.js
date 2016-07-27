/**
 * Allows for the implementation of traits on a given class.
 * @class ImplementsTrait
 * @classdesc Allows for the implementation of traits on
 * a given class.
 */
class ImplementsTrait {

    /**
     * Class constructor
     * @param  {Class} implement - The class for traits to be implemented on.
     * @param  {...*} params - Any parameters to be used and instatiates the class.
     * @return {Object}           Returns either `this` or value of _()
     */
    constructor(implement, ...params) {

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
            'methods': [],
        };

        this.addArray();

        if(params.length > 0) {
            return this._(...params);
        }

        return this;
    }

    /**
     * @public
     * Instanciates and returns the implemented class.
     * @param   {...*} params - List of parameters to pass to implements
     * @returns {Object} - Instanciates and returns the implemented class.
     */
    _(...params) {
        return new this.implements(...params);
    }

    /**
     * Getter for the traits method values attached to
     * the implemented class.
     * @return {Array} - Value of the traits method or empty array.
     */
    get traits() {
        if(this.traits_is_func && this.traits_is_object) {
            return this.implements.prototype.traits();
        }

        return [];
    }

    /**
     * Typeof to check whether the traits method exists by checking
     * if it's a function.
     * @return {Boolean} Whether traits method exists.
     */
    get traits_is_func() {
        return typeof this.implements.prototype.traits === 'function';
    }

    /**
     * Typeof to check whether the traits method returns an Array.
     * @return {Boolean} Whether traits method returns an array.
     */
    get traits_is_object() {
        return Array.isArray(this.implements.prototype.traits());
    }

    /**
     * Get the methods from this.implement
     * @return {Array} Array of method names
     */
    get implementProps() {
        return Object.getOwnPropertyNames(this.implements.prototype);
    }

    /**
     * Loops through the list of traits to create them.
     *
     * @param  {Object} traits A number of traits to be processed
     * @return {void}
     */
    addArray(traits = null) {
        let trait_array = traits || this.traits;

        for(let trait of trait_array) {
            this.add(trait);

            // Add a the traits list to the class.
            this.attached.traits.push(trait.name);
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
    add(trait = {}) {
        for(let key of Reflect.ownKeys(trait.prototype)) {
            this.addMethod(key, this._getDescriptor(trait.prototype, key));
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
    addMethod(key, descriptor) {
        if(this.except_methods.indexOf(key) === -1 && this.implementProps.indexOf(key) === -1) {
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
    _getDescriptor(trait, key) {
        return Object.getOwnPropertyDescriptor(trait, key);
    }
}

export default ImplementsTrait;
