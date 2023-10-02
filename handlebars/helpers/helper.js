// helpers.js
var Handlebars = require('handlebars');

Handlebars.registerHelper('each_upto', function (ary, max, options) {
    if (!ary || ary.length == 0)
        return options.inverse(this);

    var result = [];
    for (var i = 0; i < max && i < ary.length; ++i)
        result.push(options.fn(ary[i]));
    return result.join('');
});

Handlebars.registerHelper('multiply', function (a, b) {
    return a * b;
});

Handlebars.registerHelper('helperMissing', function ( /* dynamic arguments */) {
    var options = arguments[arguments.length - 1];
    var args = Array.prototype.slice.call(arguments, 0, arguments.length - 1)
    return new Handlebars.SafeString("Missing: " + options.name + "(" + args + ")")
})

Handlebars.registerHelper('blockHelperMissing', function (context, options) {
    return "Helper '" + options.name + "' not found. "
        + "Printing block: " + options.fn(context);
});


module.exports = Handlebars;