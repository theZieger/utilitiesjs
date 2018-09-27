var fs = require('fs');
var pkg = require('./package.json');

var inject = function(file) {
  fs.readFile(file, 'utf8', function(err, data) {
    if (err) {
      return console.log(err);
    }

    var newData =
      '/*!\n * ' +
      pkg.name +
      ' | v' +
      pkg.version +
      ' | ' +
      pkg.description +
      '\n * Copyright (c) ' +
      new Date().getFullYear() +
      ' Eric Zieger (' +
      pkg.license +
      ' license)\n */\n\n' +
      data;

    fs.writeFile(file, newData, 'utf8', function(err) {
      if (err) return console.log(err);
    });
  });
};

inject('./utilities.js');
inject('./utilities.es.js');
