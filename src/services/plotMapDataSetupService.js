const PloatMapDataSetup = require('../models/plotMapDataSetup');
const { PLOT_SOURCES_TYPES, validatePlotMapDataSetup } = require('./plotMapDataSetupValidator')

const createOrUpdate = async (setup) => {
    try {
        validatePlotMapDataSetup(setup)
        if (setup.id)
            setup['updated_at'] = Date.now()
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

const findByType = async (plotSource, order, page, count) => {
    try {
        const result = PloatMapDataSetup
            .find({ 'plotSource': { $eq: plotSource } }, {}, { skip: page, limit: count })
            .sort({ 'created_at': order === 'desc' ? -1 : 1 })
        return result
    } catch (e) {
        throw Error(e)
    }
}

const findById = async (id) => {
    try {
        const result = await PloatMapDataSetup.findById(id)
        if (!result)
            throw Error(`Plot map data setup - ${id} not found`)
        return result
    } catch (e) {
        throw Error(e)
    }
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

module.exports = { createOrUpdate, findAll, findByType, findById, deleteById }