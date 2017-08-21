/*!
 * utilities.js | v0.9.0 | Utility functions for front-end JavaScript development
 * Copyright (c) 2017 Eric Zieger (MIT license)
 * https://github.com/theZieger/utilitiesjs/blob/master/LICENSE
 */
(function(root, factory) {
    /** global: define */
    if (typeof define === "function" && define.amd) {
        define('utilitiesjs', factory);
    /** global: module */
    } else if (typeof module === "object" && module.exports) {
        module.exports = factory();
    } else {
        root.utilities = factory();
    }
}(this, function(undefined) {

    /**
     * inherit the prototype of the SuperConstructor
     *
     * Warning: Changing the prototype of an object is, by the nature of how
     * modern JavaScript engines optimize property accesses, a very slow
     * operation, in every browser and JavaScript engine. So instead of using
     * Object.setPrototypeOf or messing with __proto__, we create a new object
     * with the desired prototype using Object.create().
     *
     * @see https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Object/setPrototypeOf
     *
     * @param {Object} Constructor
     * @param {Object} SuperConstructor
     *
     * @throws {TypeError} if arguments are `null`, `undefined`, or
     *                     `SuperConstructor` has no prototype
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

        /**
         * for convenience, `SuperConstructor` will be accessible through the
         * `Constructor.super_` property
         */
        Constructor.super_ = SuperConstructor;

        Constructor.prototype = Object.create(SuperConstructor.prototype);
        Constructor.prototype.constructor = Constructor;
    };

    /**
     * Turns an Array into an associative Object (while keeping reference!)
     *
     * @param {Array}                 arr    Array of Objects to turn into an
     *                                       associative Object
     * @param {String|Array|Function} mapBy  optional mapping key, can be a
     *                                       simple string (property name in
     *                                       the abjects of arr), a list of
     *                                       property names (which are
     *                                       combined) or a function which
     *                                       returns a unique id to use
     *
     * @throws {TypeError} if arr is not an Array or mapBy is set but not of
     *                     correct type (String, Array, Function)
     *
     * @returns {Object}
     */
    var toObject = function(arr, mapBy) {
        var obj = {};

        if (!Array.isArray(arr)) {
            throw new TypeError('arr argument is not of type Array');
        }

        if (mapBy !== undefined
            && typeof mapBy !== 'string'
            && !Array.isArray(mapBy)
            && typeof mapBy !== 'function'
        ) {
            throw new TypeError(
                'mapBy argument is not of type {String|Array|Function}'
            );
        }

        var methods = {
            string: function(val) {
                this.undefined(val, val[mapBy]);
            },
            object: function(val) {
                var newKey = mapBy.map(function(propertyName){
                    return val[propertyName];
                }).join('_');

                this.undefined(val, newKey);
            },
            function: function(val, i, arr) {
                this.undefined(val, mapBy(val, i, arr));
            },
            undefined: function(val, newKey) {
                if (typeof newKey === 'string'
                    || typeof newKey === 'number'
                ) {
                    obj[newKey] = val;
                }
            }
        };

        /**
         * run the designated method by mapBy type from the methods object
         * it binds the methods object so we can use the undefined setter method
         * for different mapBy types and don't have to maintain multiple but
         * same conditions
         */
        arr.forEach(
            methods[(typeof mapBy)].bind(methods)
        );

        return obj;
    };

    return {
        inherits: inherits,
        toObject: toObject
    };
}));
