const express = require('express')
const router = express.Router()
const fs = require('fs');
const _ = require('lodash');
const crypto = require('crypto')
const shapefile = require("shapefile");


const isValidShapeTypes = (files) => {
    for (const file of files) {
        if (file.name.includes('.shp.xml'))
            return false
        if (file.name.includes('.dbf') || file.name.includes('.shp'))
            return true
        return false
    }
}

const checkTotalFilesSize = (files) => {
    let totalSize = 0
    for (const file of files) {
        totalSize += file.size
    }
    totalSize = totalSize / 1000 // MB
    return totalSize > 1000
}

const generateHashFolderName = () => {
    const key = 'sgeol-viewer'
    return crypto.createHash('sha1').update(key).digest('hex');
}

const moveShapeFilesToTmpFolder = (hashFolder, files) => {
    try {
        _.forEach(_.keysIn(files), (key) => {
            let shapeFile = files[key];
            shapeFile.mv(`static/shapefiles/${hashFolder}/${shapeFile.name}`);
        });
    } catch (error) {
        console.log(error)
        throw Error('Error in move files')
    }
}

const getShapefilesFromHashFolder = (hashFolder, files) => {
    let filesDict = {}
    for (const file of files) {
        if (file.name.includes('.dbf')) {
            filesDict['dbf'] = `static/shapefiles/${hashFolder}/${file.name}`
        } else if (file.name.includes('.shp')) {
            filesDict['shp'] = `static/shapefiles/${hashFolder}/${file.name}`
        }
    }
    return filesDict
}

function removeHashFolder(hashFolder) {
    const path = `static/shapefiles/${hashFolder}`
    if (fs.existsSync(path)) {
        fs.readdirSync(path).forEach(function (file, index) {
            var curPath = path + "/" + file;
            if (fs.lstatSync(curPath).isDirectory()) { // recurse
                deleteFolderRecursive(curPath);
            } else { // delete file
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(path);
    }
}

router.post('/', async (req, res) => {
    try {
        if (!req.files)
            return res.status(400).send({ error: 'Any files informed' });

        const filesRequest = (req.files.shapes instanceof Array) ? req.files.shapes : [req.files.shapes]

        if (filesRequest.length > 2)
            return res.status(400).send({ error: 'Just is allowed 2 files' });

        if (!isValidShapeTypes(filesRequest))
            return res.status(400).send({ error: 'File types must be .shp and .dbf (optional)' });

        if (checkTotalFilesSize(filesRequest))
            return res.status(400).send({ error: 'Total file size must be less or equal to 1 MB' });

        const hashFolder = generateHashFolderName()
        moveShapeFilesToTmpFolder(hashFolder, filesRequest)
        const shapefiles = getShapefilesFromHashFolder(hashFolder, filesRequest)

        const response = await shapefile.read(shapefiles.shp, shapefiles.dbf)
        removeHashFolder(hashFolder)
        return res.status(200).send(response);
    } catch (e) {
        if (e) {
            console.log(e);
            return res.status(400).send({ error: 'Fail' });
        }
    }
});

module.exports = router