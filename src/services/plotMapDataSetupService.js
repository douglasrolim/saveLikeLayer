const PloatMapDataSetup = require('../models/plotMapDataSetup');
const { PLOT_SOURCES_TYPES, validatePlotMapDataSetup } = require('./plotMapDataSetupValidator')

const createOrUpdate = async (setup) => {
    try {
        validatePlotMapDataSetup(setup)
        if (setup.id) {
            setup['updated_at'] = Date.now()
            return await PloatMapDataSetup.findOneAndUpdate({ _id: setup.id }, setup)
        }
        else
            return await PloatMapDataSetup.create(setup)
    } catch (e) {
        throw Error(e)
    }
}

const findAll = async (order, page, count) => {
    try {
        const result = PloatMapDataSetup
            .find({}, {}, { skip: page, limit: count })
            .sort({ 'created_at': order === 'desc' ? -1 : 1 })
        return result
    } catch (e) {
        throw Error(e)
    }
}

const findByPlotSourceAndUserIdAndVisibleStatus = async (plotSource, userId, isPrivate, order, page, count) => {
    try {
        let filter = {}
        if (plotSource)
            filter['plotSource'] = { $eq: plotSource }
        if (isPrivate !== null && isPrivate !== undefined)
            filter['private'] = { $eq: isPrivate }
        if (userId)
            filter['userCreator.id'] = { $eq: userId }

        const result = PloatMapDataSetup
            .find(filter, {}, { skip: page, limit: count })
            .sort({ 'created_at': order === 'desc' ? -1 : 1 })
        return result
    } catch (e) {
        throw Error(e)
    }
}

const findById = async (id) => {
    const result = await PloatMapDataSetup.findOne({ _id: id }, function (err, result) {
        if (err) return null
        if (!result)
            return null
        return result
    })
    return result
}

const deleteById = async (id) => {
    try {
        if (!await PloatMapDataSetup.findById(id))
            throw Error(`Plot map data setup - ${id} not found`)

        await PloatMapDataSetup.deleteOne({ _id: id })
    } catch (e) {
        throw Error(e)
    }
}

module.exports = { createOrUpdate, findAll, findByPlotSourceAndUserIdAndVisibleStatus, findById, deleteById }