let Types = {
    // Strings
    'string': String,
    // Booleans
    'boolean': Boolean,
    // Integers
    // 'integer': Number,
    'number': Number,
    // Arrays
    'array': Array,
    // Object
    'object': Object,
    // Function
    'function': Function
};

class TypeDecleration {
    constructor() {
        this.types = Types;
        this.quiet = false;

        return this;
    }

    is(type = String, value = '', quiet = false) {
        this.quiet = quiet;

        if(typeof type === 'string') {
            type = this.types[type];
        }

        let str_type = this._typeByValue(type).toLowerCase();

        if(typeof value === str_type || value instanceof type) {
            return value;
        }

        type = typeof value;

        this.throwError(`Type: Expected value to be ${str_type}, ${type} found.`);
    }

    throwError(message = '') {
        if(this.quiet) {
            console.warn(message);
        } else {
            throw new Error(message);
        }
    }

    _typeByValue(value) {
        for(let prop in this.types) {
            if(this.types.hasOwnProperty(prop)) {
                if(this.types[prop] === value) {
                    return prop;
                }
            }
        }

        return null;
    }
}

let Type = new TypeDecleration;

export {
    Type,
    Types,
    TypeDecleration
};
