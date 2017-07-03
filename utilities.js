/**
 * Utility funtions for front-end JavaScript development
 */
var utilities = (function(undefined) {

    /**
     * inherit the prototype of the SuperConstructor
     * 
     * Warning: Changing the prototype of an object is, by the nature of how modern JavaScript engines
     * optimize property accesses, a very slow operation, in every browser and JavaScript engine.
     * So instead of using Object.setPrototypeOf or messing with __proto__, we create a new object
     * with the desired prototype using Object.create().
     *
     * @see https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Object/setPrototypeOf
     *
     * @param {Object} Constructor
     * @param {Object} SuperConstructor
     *
     * @throws {Error} will error if either Constructor is null, or SuperConstructor has no prototype
     *
     * @returns {Void}
     */
    var inherits = function(Constructor, SuperConstructor) {
        if (Constructor === undefined || Constructor === null) {
            throw new Error('ERR_INVALID_ARG_TYPE');
        }

        if (SuperConstructor === undefined || SuperConstructor === null) {
            throw new Error('ERR_INVALID_ARG_TYPE');
        }

        if (SuperConstructor.prototype === undefined) {
            throw new Error('ERR_INVALID_ARG_TYPE');
        }

        // for convenience, SuperConstructor will be accessible through the Constructor.super_ property
        Constructor.super_ = SuperConstructor;

        Constructor.prototype = Object.create(SuperConstructor.prototype);
        Constructor.prototype.constructor = Constructor;
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