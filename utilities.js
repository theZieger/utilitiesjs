/**
 * Utility funtions for front-end JavaScript development
 */
var utilities = (function(undefined) {

    /**
     * POLYFILLING Object.setPrototypeOf if not available
     *
     * @param   {[type]} obj   [description]
     * @param   {[type]} proto [description]
     *
     * @returns {[type]}       [description]
     *
     * @todo test the inherits function inside Internet Explorer
     */
    Object.setPrototypeOf = Object.setPrototypeOf || function(obj, proto) {
        obj.__proto__ = proto;
        return obj;
    };

    /**
     * inherit the prototype of the superConstructor
     *
     * @param   {Object} constructor
     * @param   {Object} superConstructor
     *
     * @returns {Void}
     */
    var inherits = function(constructor, superConstructor) {
        if (constructor === undefined || constructor === null) {
            throw new Error('ERR_INVALID_ARG_TYPE');
        }

        if (superConstructor === undefined || superConstructor === null) {
            throw new Error('ERR_INVALID_ARG_TYPE');
        }

        if (superConstructor.prototype === undefined) {
            throw new Error('ERR_INVALID_ARG_TYPE');
        }

        constructor.super_ = superConstructor;

        Object.setPrototypeOf(constructor.prototype, superConstructor.prototype);
    };

    /**
     * Turns Array (of Objects) into associative Object (by given mapBy when given)
     *
     * @param {Array}  arr
     * @param {String} mapBy  optional mapping key
     *
     * @returns {Object}
     */
    var toObject = function(arr, mapBy) {
        var obj = {};

        if (typeof mapBy !== 'string' && mapBy != null) {
            throw new Error('ERR_INVALID_ARG_TYPE');
        }
      
        if (!Array.isArray(arr)) {
            throw new Error('ERR_INVALID_ARG_TYPE');
        }

        arr.forEach(function(val, i) {
            if (!mapBy) {
                obj[i] = val;
            } else if (
                typeof val[mapBy] === 'string'
                || typeof val[mapBy] === 'number'
            ) {
                obj[val[mapBy]] = val;
            }
        });
      
        return obj;
    };

    return {
        inherits: inherits,
        toObject: toObject
    };

}());