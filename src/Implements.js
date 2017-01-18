import Interface from './Interface.js';
import Trait from './Trait.js';
import "babel-polyfill";

/**
 * A class for implementation of Interfaces and Traits.
 * @class Implements
 * @classdesc Base class for implementation of Interfaces and Traits.
 */
class Implements {

    /**
     * Class constructor
     * @param  {Class} implement_class - Class to have implementation on.
     * @param  {...*} trait_params - Parameters to be passed to the traits.
     * @return {Class}                Return the implemented class.
     */
    constructor(implement_class, ...trait_params) {

        /**
         * The target class to have traits implemented on.
         * @type {Object}
         */
        this.implements = implement_class;

        this._CheckInterfaces();
        this._AttachTraits(...trait_params);

        return this.implements;
    }

    /**
     * Attaches traits to the implementation target.
     * @param  {...*} params Parameters that could be passed to the implementation class.
     * @return {void}
     */
    _AttachTraits(...params) {

        /**
         * Instanciates a new Trait class.
         * @type {Object}
         */
        this.attach(new Trait(this.implements, ...params));
    }

    /**
     * Checks the interfaces of required by the implementation target.
     * @return {void}
     */
    _CheckInterfaces() {

        /**
         * Instanciates a new Interface class.
         * @type {Object}
         */
        this.attach(new Interface(this.implements));
    }

    /**
     * Attaches the a given class to the implemented class.
     * @param  {Object} attachment Class to attach.
     * @return {void}
     */
    attach(attachment) {
        if(typeof attachment.implements === 'undefined') {
            throw new Error('Cannot attach an unimplemented class.');
        }

        this.implements = attachment.implements;

        Object.defineProperty(this.implements.prototype, attachment.constructor.name, {
            'configurable': true,
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
}

export {
    Implements,
    Interface,
    Trait
};
