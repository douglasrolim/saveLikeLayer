const express = require('express');
const service = require('../../services/plotMapDataSetupService')

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const { plotSource, orderBy, page, count } = req.query
        let result = []
        if (!plotSource) {
            result = (await service.findAll(orderBy, parseInt(page), parseInt(count)))
                .map(elem => elem.toJSON());
        } else {
            result = (await service.findByPlotSourceAndUserIdAndVisibleStatus(plotSource, orderBy, parseInt(page), parseInt(count)))
                .map(elem => elem.toJSON());
        }
        if (result.length === 0)
            return res.status(404).send(result);
        return res.status(200).send(result);
    } catch (e) {
        console.log(e);
        return res.status(400).send({ error: e.message });
    }
})

router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id
        const result = (await service.findById(id));
        if (!result)
            return res.status(404).send({ msg: `Plot map data setup - ${id} not found` });

        return res.status(200).send(result.toJSON());
    } catch (e) {
        console.log(e);
        return res.status(400).send({ error: e.message });
    }
})

router.post('', async (req, res) => {
    try {
        const result = (await service.createOrUpdate(req.body));
        return res.status(200).send(result.toJSON());
    } catch (e) {
        console.log(e);
        return res.status(400).send({ error: e.message });
    }
})

router.patch('/:id', async (req, res) => {
    try {
        const { id } = req.body
        if (id !== req.params.id)
            return res.status(400).send({ msg: 'Path ID and Payload ID must be equals' });

        (await service.createOrUpdate(req.body));
        return res.status(204).send();
    } catch (e) {
        console.log(e);
        return res.status(400).send({ error: e.message });
    }
})

router.delete('/:id', async (req, res) => {
    try {
        await service.deleteById(req.params.id);
        return res.status(204).send();
    } catch (e) {
        console.log(e);
        return res.status(400).send({ error: e.message });
    }
})

module.exports = router