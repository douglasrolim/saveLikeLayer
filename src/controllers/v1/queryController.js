const express = require('express');
const path = require('path');
const multer = require('multer');
const unixify = require('unixify');

const QueryList = require('../../models/queryList');
const Query = require('../../models/query');

const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'static/upload/')
    },
    filename: function (req, file, cb) {
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
    }
});

const upload = multer({ storage });

router.post('/add', upload.single('image'), async (req, res) => {
    try {
        let queryList = {
            name: req.body.name,
            description: req.body.description,
            queries: JSON.parse(req.body.queries)
        };

        if  (req.file && req.file.path)  {
            queryList['image'] = '/v1/' + unixify(req.file.path)
        }

        queryList = await QueryList.create(queryList);
        return res.send(queryList);
    } catch (e) {
        if (e) {
            console.log(e);
            return res.status(400).send({ error: 'Fail'});
        }
    }
});

router.post('/addOne', async (req, res) => {
    try {
        const query = await Query.create(req.body);
        return res.send({ query });
    } catch (e) {
        if (e) {
            console.log(e);
            return res.status(400).send({ error: 'Fail'});
        }
    }
});

router.get('/', async (req, res) => {
    try {
        const queries = await QueryList.find({})
        return res.send(queries);
    } catch (e) {
        if (e) {
            console.log(e);
            return res.status(400).send({ error: 'Fail'});
        }
    }
});

module.exports = router