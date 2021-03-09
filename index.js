const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// database
const db = require('./models');
db.sequelize.sync({ force: true }).then(() => {
    console.log('Drop and re-sync db.');
});

require('./routes/coupon.js')(app);

// simple route
app.get('*', (req, res) => {
    resstatus(400).send({
        message: 'bad request',
    });
});

// set port, listen for requests
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
