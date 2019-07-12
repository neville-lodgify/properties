const properties = require('./server/data/properties.ts');

console.log(properties);

properties
    .list()
    .then(console.log)
    .catch(console.error)
