var utilities = require('../utilities.js');

describe('utilities.inherits', function() {
    describe('failing tests', function() {
        // test example from README.md
        var SuperClass = {};

        // a class we want to inherit from SuperClass
        var SomeClass = function() {};

        it("should fail because the Constructor is undefined", function() {
            expect(utilities.inherits.bind()).toThrowError(TypeError);
        });

        it("should fail because the Constructor is null", function() {
            expect(utilities.inherits.bind(null, null)).toThrowError(TypeError);
        });

        it("should fail because the SuperConstructor is undefined", function() {
            expect(utilities.inherits.bind(null, SomeClass)).toThrowError(TypeError);
        });

        it("should fail because the SuperConstructor is null", function() {
            expect(utilities.inherits.bind(null, SomeClass, null)).toThrowError(TypeError);
        });

        it("should fail because the SuperConstructor has no prototype", function() {
            expect(utilities.inherits.bind(null, SomeClass, [])).toThrowError(TypeError);
        });
    });
    describe('successful tests', function() {
        // test example from README.md
        var SuperClass = function() {
            this.someProperty = 42;
        };

        SuperClass.prototype.retMsg = function(msg) {
            return msg;
        };

        SuperClass.prototype.getSomeProp = function() {
            return this.someProperty;
        };

        // a class we want to inherit from SuperClass
        var SomeClass = function() {
            SuperClass.call(this);
        };

        utilities.inherits(SomeClass, SuperClass);

        SomeClass.prototype.flop = function(msg) {
            return this.retMsg(msg);
        };

        var someClass_instance = new SomeClass();
        // end test example from README.md

        it("should be able to access inherited properties", function() {
            expect(someClass_instance.someProperty).toEqual(42);
        });

        it("should be able to run inherited methods", function() {
            expect(someClass_instance.retMsg('hi')).toEqual('hi');
        });

        it("should be able to run inherited methods by using the this keyword", function() {
            expect(someClass_instance.flop('hi')).toEqual('hi');
        });

        it("should be instance of SomeClass", function() {
            expect((someClass_instance instanceof SomeClass)).toEqual(true);
        });

        it("should be instance of SuperClass", function() {
            expect((someClass_instance instanceof SuperClass)).toEqual(true);
        });

        it("should set SuperClass contructor", function() {
            expect(someClass_instance.constructor.super_ === SuperClass).toEqual(true);
        });

        it("should set contructor", function() {
            expect(someClass_instance.constructor === SomeClass).toEqual(true);
        });
    });
});