class Implements {
    constructor(implement) {
        this.implement = implement;
        this.implement.interfaces = [];
        this.implement.traits = [];

        this._interface();
        this._trait();

        return this.implement;
    }

    /**
     * Dependancy Injection method.
     * @todo Check and sort the dependancies into the right order
     * as shown in http://stackoverflow.com/questions/20058391/javascript-dependency-injection
     *
     * @param  {Class} Depend Dependancy to Injection
     * @param  {Mixed} param  Parameter(s) to use.
     * @return {Class}        Returns the dependancy
     */
    static dependancy(Depend, ...params) {
        if(params[0] instanceof Depend) {
            return params;
        }

        let args = [];

        for(let param in params) {
            args.push(params[param]);
        }

        return new Depend(...args);

        // return new (Function.prototype.bind.apply(depend, [null].concat(param)));
    }

    /**
     * Loops through the given interfaces and runs through
     * the required checks.
     *
     * @param  {Array} ...interfaces_list List of interfaces.
     * @return {void}
     */
    _interface(...interface_list) {
        let interfaces = this._GetInterfacesArray || interface_list,
            implementProps = this.implementProps,
            implementStaticProps = this.implementStaticProps;

        for(let i in interfaces) {
            let methods = Object.getOwnPropertyNames(interfaces[i].prototype),
                staticMethods = Object.getOwnPropertyNames(interfaces[i]);

            this._checkInterface(methods, implementProps, interfaces[i].name);
            this._checkStaticInterface(staticMethods, implementStaticProps, interfaces[i].name);

            this._checkInterfaceArguments(interfaces[i], methods);

            // Add a the implements list to the class.
            this.implement.interfaces.push(interfaces[i].name);
        }
    }

    /**
     * Get the arguments of a given interface method and check
     * whether the arguments have been set correctly.
     * @todo Check for default values in transpiled code.
     *
     * @param  {Array} interfaces Array of interfaces to be used.
     * @param  {Array} methods    Array of methods in the interface.
     * @return {void}
     */
    _checkInterfaceArguments(interfaces, methods) {
        for(let method in methods) {
            let classMethods = this.implement.prototype[methods[method]],
                interfaceMethod = interfaces.prototype[methods[method]],
                argsInterfaces = this._getArguments(interfaceMethod, true),
                argsClasses = this._getArguments(classMethods, true);

            if(argsInterfaces !== argsClasses) {
                throw new Error(`Interface: ${this.implement.name}.${methods[method]}() requires` +
                    `matching arguments as defined by ${interfaces.name}.${methods[method]}()`);
            }
        }
    }

    _getArguments(args_from, replace = false) {
        let args = args_from.toString().match(/function\s.*?\(([^)]*)\)/)[1];

        if(replace) {
            return args.replace(' ', '');
        }

        return args;
    }

    /**
     * Checks whether the given interface methods are in the class.
     *
     * @param  {Array} methods=[]        Array of methods to check.
     * @param  {Array} implementProps=[] Props to be implmented.
     * @param  {String} name=''           Name of the class
     * @return {void}
     */
    _checkInterface(methods = [], implementProps = [], name = '') {
        for(let method in methods) {
            if(implementProps.indexOf(methods[method]) === -1) {
                throw new Error(`Interface: ${methods[method]} required in ${this.implements.name} ` +
                    `as defined by ${name}`);
            }
        }
    }

    /**
     * Checks whether the given static interface methods are in the class.
     *
     * @param  {Array} methods=[]        Array of methods to check.
     * @param  {Array} implementProps=[] Props to be implmented.
     * @param  {String} name=''           Name of the class
     * @return {void}
     */
    _checkStaticInterface(methods = [], implementProps = [], name = '') {
        for(let method in methods) {
            if(implementProps.indexOf(methods[method]) === -1 && ['length', 'name', 'prototype'].indexOf(methods[method]) === -1) {
                throw new Error(`Interface: ${methods[method]} required in ${this.implements.name} ` +
                    `as defined by ${name}`);
            }
        }
    }

    /**
     * Loops through the list of traits to create them.
     *
     * @param  {Object} ...traits A number of traits to be processed
     * @return {void}
     */
    _trait(...traits) {
        if(typeof this.implement.prototype.traits === 'function') {
            traits = this.implement.prototype.traits();
        }

        for(let trait of traits) {
            this._createTrait(trait);

            // Add a the traits list to the class.
            this.implement.traits.push(trait.name);
        }
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
    _createTrait(trait = {}) {
        for(let key of Reflect.ownKeys(trait.prototype)) {
            if (key !== 'constructor' && key !== 'prototype' && key !== 'name' && this.implementProps.indexOf(key) === -1) {
                let desc = Object.getOwnPropertyDescriptor(trait.prototype, key);

                Object.defineProperty(this.implement.prototype, key, desc);
            }
        }
    }
}

export default Implements;
