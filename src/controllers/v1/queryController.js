const express = require('express');

const QueryList = require('../../models/queryList');
const Query = require('../../models/query');

const router = express.Router();

router.post('/add', async (req, res) => {
    try {
        const queryList = await QueryList.create(req.body);
        return res.send({ queryList });
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
        return res.send({ queries });
    } catch (e) {
        if (e) {
            console.log(e);
            return res.status(400).send({ error: 'Fail'});
        }
    }
});

module.exports = router