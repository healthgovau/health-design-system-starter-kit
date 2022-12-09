// helpers.js
var handlebars = require('handlebars');

handlebars.registerHelper('multiply', function (a, b) {
    return a * b;
});

module.exports = handlebars;