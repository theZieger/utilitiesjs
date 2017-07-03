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
     * @throws {TypeError} if arguments are null/undefined, or SuperConstructor has no prototype
     *
     * @returns {Void}
     */
    var inherits = function(Constructor, SuperConstructor) {
        if (Constructor === undefined || Constructor === null) {
            throw new TypeError('Constructor argument is undefined or null');
        }

        if (SuperConstructor === undefined || SuperConstructor === null) {
            throw new TypeError('SuperConstructor argument is undefined or null');
        }

        if (SuperConstructor.prototype === undefined) {
            throw new TypeError('SuperConstructor.prototype is undefined');
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
     * @throws {TypeError} if arr is not an Array or mapBy is set but not a String
     *
     * @returns {Object}
     */
    var toObject = function(arr, mapBy) {
        var obj = {};

        if (typeof mapBy !== 'string' && mapBy != null) {
            throw new TypeError('mapBy argument is not of type String');
        }
      
        if (!Array.isArray(arr)) {
            throw new TypeError('arr argument is not of type Array');
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