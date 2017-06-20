# utilities v0.1.0

> Utility functions for front-end JavaScript development.

## Getting started

There is more than one way to use utilities.js inside your project. I prefer using npm for dependency management.

If you haven't used [npm](http://npmjs.com/) (Node Package manager) before, be sure to check out the [Getting Started](https://docs.npmjs.com/getting-started/what-is-npm) guide, as it explains how to install and use npm. Once you're familiar with that process, you may install the utilities.js module with this command inside your project:

```
npm install utilitiesjs --save-dev
```

Once the module has been installed, you may integrate that file into your build process (e.g concatenating and uglifying your JS with Grunt or whatever) since the `--save-dev` option is meant for development only.

## Available functions inside utilities.js

### utilities.inherits(constructor, superConstructor)

This is the same function as NodeJS provides it inside their core modules. The only thing different between this `inherits` and the Node `inherits` function is that I provide a polyfill for `Object.setPrototypeof`. Which is, at the moment, very crude and will possibly fail when using inside Internet Explorer.

Anyway. Here is a code example how to use the `utilities.inherits` function:

```
// make sure utilities.js is already available when this code runs

// a super class
var SuperClass = function() {
    this.someProperty = 42;
}

SuperClass.prototype.justDoIt = function(msg) {
    alert(msg);
}

// a class we want to inherit from SuperClass
var DoTheFlop = function() {
    // this makes sure to also inherit the properties of SuperClass defined inside it's constructor function
    // which may be crucial for it's methods to run
    SuperClass.call(this);
}

utilities.inherits(DoTheFlop, SuperClass);

DoTheFlop.prototype.flop = function() {
    this.justDoIt('Everybody do the flop!');
}

```
