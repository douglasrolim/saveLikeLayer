const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/v1/static', express.static('static'));

require('./controllers/v1')(app);

app.listen(8000);