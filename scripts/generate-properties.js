// import external dependencies
const shortid = require('shortid');
const casual = require('casual').en_US;

// import system dependencies
const fs = require('fs');
const path = require('path');

////////////////////////////////////////////////////////////////////////////////

const properties = [];
const names = [
    'Orchard',
    'Meadow Hills',
    'Oak Resorts',
    'Willow Creek',
    'Sunnyside',
    'Highfield Hotel',
    'Mill House',
    'The Rectory',
    'Yew Tree Cottage',
    'The Old Post Office',
    'Lilac Vinyard',
    'Woodside',
    'Reed House',
    'Toad Hall',
    'Vicarage',
    'Ivy House',
    'Hillcrest Stables',
    'The Beeches',
    'Springfield Lake Resort',
    'Laurels Hill',
];

const DATE = {
    NOW: Date.now(),
    START: Date.UTC(2019),
};

const getRandomDate = (after = DATE.START, before = DATE.NOW) => {
    return after + Math.floor(Math.random() * (before - after));
};

for (let i = 0; i < 20; i++) {
    const created = getRandomDate();
    const updated = getRandomDate(created);
    const name = casual.full_name;
    const id = shortid.generate();

    properties.push({
        id,
        name: names[i],
        description: casual.description,
        owner: {
            name,
            phone: casual.phone,
            email: `${name.toLowerCase().replace(/\s/, '.')}@example.com`,
            location: {
                address: `${casual.integer(1, 9999)} ${casual.street}`,
                country: 'United States',
                city: casual.city,
                state: casual.state_abbr,
                zip: casual.zip(5),
            }
        },
        location: {
            address: `${casual.integer(1, 9999)} ${casual.street}`,
            country: 'United States',
            city: casual.city,
            state: casual.state_abbr,
            zip: casual.zip(5),
        },
        created: new Date(created).toISOString(),
        updated: new Date(updated).toISOString(),
        image: `https://source.unsplash.com/960x540/?house&sig=${id}`,
    });
}

const filename = path.resolve(__dirname, '../server/data/properties-data.json');
const content = JSON.stringify(properties, undefined, '\t');

fs.writeFile(filename, content, (error) => {
    if (error) {
        console.error(error);
    } else {
        console.log('Generated "properties-data.json"');
    }
})
