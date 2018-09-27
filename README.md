# utilities v1.0.0 [![Build Status](https://scrutinizer-ci.com/g/theZieger/utilitiesjs/badges/build.png?b=master)](https://scrutinizer-ci.com/g/theZieger/utilitiesjs/build-status/master) [![Scrutinizer Code Quality](https://scrutinizer-ci.com/g/theZieger/utilitiesjs/badges/quality-score.png?b=master)](https://scrutinizer-ci.com/g/theZieger/utilitiesjs/?branch=master) [![Code Coverage](https://scrutinizer-ci.com/g/theZieger/utilitiesjs/badges/coverage.png?b=master)](https://scrutinizer-ci.com/g/theZieger/utilitiesjs/?branch=master) ![Downloads over NPM per month](https://img.shields.io/npm/dm/utilitiesjs.svg?maxAge=7200&colorB=cb3837)

> Utility functions for front-end JavaScript development.

## Getting started

There is more than one way to use utilities.js inside your project. I prefer using npm for dependency management.

If you haven't used [npm](http://npmjs.com/) (Node Package manager) before, be sure to check out the [Getting Started](https://docs.npmjs.com/getting-started/what-is-npm) guide, as it explains how to install and use npm. Once you're familiar with that process, you may install the utilities.js module with this command inside your project:

```bash
npm install utilitiesjs --save-dev
```

Once the module has been installed, you may integrate that file into your build process (e.g concatenating and uglifying your JS with Grunt or whatever) since the `--save-dev` option is meant for development only.

## Available functions inside utilities.js

### utilities.inherits(constructor, superConstructor)

Inherit the prototype from one constructor into another. The prototype of Constructor will be set to a new object created from SuperConstructor.

It does not make use of Object.setPrototype since it's usage is to be avoided following the [MDN warning about Object.setPrototypeOf](https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Object/setPrototypeOf) and instead uses Object.create to also fullfill support for older browsers.

Anyway. Here is a code example how to use the `utilities.inherits` function:

```javascript
// make sure utilities.js is already available when this code runs

// a super class
var SuperClass = function() {
  this.someProperty = 42;
};

SuperClass.prototype.justDoIt = function(msg) {
  alert(msg);
};

// a class we want to inherit from SuperClass
var DoTheFlop = function() {
  // this makes sure to also inherit the properties of SuperClass defined inside it's constructor function
  // which may be crucial for it's methods to run
  SuperClass.call(this);
};

utilities.inherits(DoTheFlop, SuperClass);

DoTheFlop.prototype.flop = function() {
  this.justDoIt('Everybody do the flop!');
};
```

### utilities.toObject(arr, mapBy)

Turns an array of values into a object.

The `mapBy` argument is therefore totally optional.

`mapBy` can be a simple string (referring to an property name of the objects inside `arr`), an array of strings (referring to an property name of the objects inside `arr`) or an function returning a property name which is used to store the reference to the original object of `arr` in the returned object.

When mapBy is a function it will take three arguments:

1. `val` - the current object which is processed
1. `i` - the index of the current object which is processed
1. `arr` - the array given to toObject as first parameter

This function was created because I, as a front-end developer, have to handle a lot of data from API responses. And when I say a lot, I mean a lot.
Sometimes more than 2000 objects inside an array with countless attributes hit our clients and I have to enrich them with even more data from different API requests.
You can imagine looping over those 2000 objects can be tough for the clients device. So I map these array of objects to an associative object which can be accessed a lot faster by simply doing a member access by the ID.
A lot faster and way more performant. That's the story how this function landed inside this repo. For me it's quite handy.

Anyway. Here is a code example how to use the `utilities.toObject` function:

```javascript
// make sure utilities.js is already available when this code runs

var states = ['Sachsen', 'Sachsen-Anhalt', 'Berlin', 'Hamburg'];
var statesObject = utilities.toObject(states);

console.log(statesObject);

// results in a not very impressive object with key names representing the array indexes:
// {0: 'Sachsen', 1: 'Sachsen-Anhalt', 2: 'Berlin', 3: 'Hamburg'}

// maybe a way better example
// with some of the punniest headlines ever

var news = [
  {
    id: 12001,
    headline: 'Tiger goes limp',
    subHeadline: 'Pulls out after 9 holes'
  },
  {
    id: 666,
    headline: 'Croc has beef with cow',
    subHeadline: ''
  },
  {
    id: 1337,
    headline: 'Germans wurst at penalties',
    subHeadline: 'New stats prove England are better from the spot'
  }
];

var newsObject1 = utilities.toObject(news, 'id');
var newsObject2 = utilities.toObject(news, ['id', 'id']);
var newsObject3 = utilities.toObject(news, function(val, i) {
  return val.id + '_' + i;
});

console.log(newsObject1);
// results in:
// {
//     '12001': { id: 12001, headline: 'Tiger goes limp', subHeadline: 'Pulls out after 9 holes' },
//     '666': { id: 666, headline: 'Croc has beef with cow', subHeadline: '' },
//     '1337': { id: 1337, headline: 'Germans wurst at penalties', subHeadline: 'New stats prove England are better from the spot' }

console.log(newsObject2);
// results in:
// {
//     '12001_12001': { id: 12001, headline: 'Tiger goes limp', subHeadline: 'Pulls out after 9 holes' },
//     '666_666': { id: 666, headline: 'Croc has beef with cow', subHeadline: '' },
//     '1337_1337': { id: 1337, headline: 'Germans wurst at penalties', subHeadline: 'New stats prove England are better from the spot' }

console.log(newsObject3);
// results in:
// {
//     '12001_0': { id: 12001, headline: 'Tiger goes limp', subHeadline: 'Pulls out after 9 holes' },
//     '666_1': { id: 666, headline: 'Croc has beef with cow', subHeadline: '' },
//     '1337_2': { id: 1337, headline: 'Germans wurst at penalties', subHeadline: 'New stats prove England are better from the spot' }
// }
```
