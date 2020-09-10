const express = require('express');
const path = require('path');
const fs = require('fs');

const QueryList = require('../../models/queryList');
const Layer = require('../../models/layer');

const service = require('../../services/queryService')

const router = express.Router();

const generateImageFileName = (filename) => {
    return `image-${Date.now()}${path.extname(filename)}`;
}

/**
 * 
 * @param {*} file - Store the file image and return the storage path
 * @returns path
 */
const storeImageFile = (file) => {
    try {
        const imageFileNewName = generateImageFileName(file.name);
        const path = `static/upload/${imageFileNewName}`;
        file.mv(path);
        return path;
    } catch (error) {
        throw Error (`Error at store image file - ${file.name}`)
    }
}

router.post('', async (req, res) => {
    try {
        let queryList = {
            name: req.body.name,
            description: req.body.description,
            layers: JSON.parse(req.body.layers),
            zoom: req.body.zoom,
            lat: req.body.lat,
            lng: req.body.lng
        };

        if  (req.files && req.files['image'])  {
            queryList['image'] = storeImageFile(req.files['image'])
        }

        queryList = await service.createOrUpdate(queryList);
        return res.send(queryList);
    } catch (e) {
        if (e) {
            console.log(e);
            return res.status(400).send({ error: e.message });
        }
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const query = service.deleteById(req.params.id)

        if (query.image) {
            await fs.unlink(query.toObject().image, (err) => {
                if (err) {
                    console.log(err)
                }
            })
        }
        
        return res.send(query);
    } catch (e) {
        if (e) {
            console.log(e);
            return res.status(400).send({ error: 'Fail'});
        }
    }
});

router.post('/addOne', async (req, res) => {
    try {
        const layer = await Layer.create(req.body);
        return res.send({ query });
    } catch (e) {
        if (e) {
            console.log(e);
            return res.status(400).send({ error: 'Fail'});
        }
    }
});

router.get('', async (req, res) => {
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

router.get('/:id', async (req, res) => {
    try {
        const query = await QueryList.findOne({_id: req.params.id})
        return res.send(query);
    } catch (e) {
        if (e) {
            console.log(e);
            return res.status(400).send({ error: 'Fail'});
        }
    }
});

module.exports = router