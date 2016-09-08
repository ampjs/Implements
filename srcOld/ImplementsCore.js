class ImplementsCore {
    constructor(implement) {
        this.implements = implement;
        this.implement.traits = [];

        return this;
    }

    /**
     * Get the super of a given class.
     *
     * @param  {Object} implement The class to check.
     * @return {Object|Null}      Returns super props if matches.
     */
    static getSuper(implement) {
        let superOf = Reflect.getPrototypeOf(implement.prototype);

        // Compare the prototypeof implement with implement.
        // Produces a false-negative so treat that as true.
        if(!superOf.isPrototypeOf(implement)) {
            return superOf;
        }

        return null;
    }

    /**
     * List of names from any super found in this.implement
     *
     * @param  {Object} implement Object to get names of
     * @return {Array} Array of method names
     */
    superProps(implement) {
        let prototypes = Reflect.getPrototypeOf(implement.prototype);

        return Reflect.getOwnPropertyNames(prototypes);

    }
}

export default ImplementsCore;
