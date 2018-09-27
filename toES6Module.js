var fs = require('fs');

fs.readFile('./src/utilities.js', 'utf8', function(err, data) {
  if (err) {
    return console.log(err);
  }

  data = data.replace(
    'module.exports = utilities;',
    'export default utilities;'
  );

  fs.writeFile('./utilities.es.js', data, 'utf8', function(err) {
    if (err) return console.log(err);
  });
});
