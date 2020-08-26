const express = require('express');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const morgan = require('morgan');

const app = express();


app.use(fileUpload({
    createParentPath: true
}));

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use('/v1/static', express.static('static'));

require('./controllers/v1')(app);

const port = process.env.PORT || 5000;

app.listen(port, () =>
    console.log(`App is listening on port ${port}.`)
);