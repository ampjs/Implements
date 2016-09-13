class ImplementsInterface {
    /**
     * Loops through the given interfaces and runs through
     * the required checks.
     *
     * @param  {Array} ...interfaces_list List of interfaces.
     * @return {void}
     */
    constructor(...implement) {
        this.interfaces = [];

        this.CheckInterfaces(implement);

        return this;

        // return this.interfaces;
    }

    get interfacesArray() {
        if(typeof this.implements === 'function') {
            return this.implements.prototype.interfaces();
        }

        return null;
    }

    /**
     * Get the methods from this.implement
     * @return {Array} Array of method names
     */
    get implementProps() {
        return Object.getOwnPropertyNames(this.implements.prototype);
    }

    /**
     * Get the static methods from this.implement
     * @return {Array} Array of method names
     */
    get implementStaticProps() {
        return Object.getOwnPropertyNames(this.implement);
    }

    CheckInterfaces(interface_list) {
        let interfaces = this.interfacesArray || interface_list,
            implementProps = this.implementProps,
            implementStaticProps = this.implementStaticProps;

        for(let i in interfaces) {
            let methods = Object.getOwnPropertyNames(interfaces[i].prototype),
                staticMethods = Object.getOwnPropertyNames(interfaces[i]);

            this._checkInterface(methods, implementProps, interfaces[i].name);
            this._checkStaticInterface(staticMethods, implementStaticProps, interfaces[i].name);

            this._checkInterfaceArguments(interfaces[i], methods);

            // Add a the implements list to the class.
            this.interfaces.push(interfaces[i].name);
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
            let classMethods = this.prototype[methods[method]],
                interfaceMethod = interfaces.prototype[methods[method]],
                argsInterfaces = this._arguments(interfaceMethod, true),
                argsClasses = this._arguments(classMethods, true);

            if(argsInterfaces !== argsClasses) {
                throw new Error(`Interface: ${this.name}.${methods[method]}() requires` +
                    `matching arguments as defined by ${interfaces.name}.${methods[method]}()`);
            }
        }
    }

    _arguments(args_from, replace = false) {
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
}

export default ImplementsInterface;
