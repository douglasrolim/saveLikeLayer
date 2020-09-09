const QueryList = require('../../models/queryList');
const { validateQueryList } = require('./validator')

const createOrUpdate = async (queryList) => {
    try {
        validateQueryList(queryList)
        return await QueryList.create(queryList)
    } catch (e) {
        throw Error(e)
    }
}

const deleteById = async (id) => {
    try {
       return await QueryList.findOneAndDelete({_id: id})
    } catch (e) {
        throw Error(e)
    }
}

module.exports = { createOrUpdate, deleteById }