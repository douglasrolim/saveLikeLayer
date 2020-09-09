const QUERY_TYPE = [
    'document',
    'radius',
    'indicators'
]

const validateLayer = (layers) => {
    for (const layer of layers) {
        const { isQuery, queryType, query, subtitle, name, description, path } = layer

        if (!name && name === '') throw Error('Layer name is required');
        if (!description && description === '') throw Error('Layer description is required');
        if (!subtitle && subtitle === '') throw Error('Layer subtitle is required');
        if (!path && path === '') throw Error('Layer path is required');
        

        if (isQuery) {
            if (!QUERY_TYPE.includes(queryType))
                throw Error(`Query type must be: ${QUERY_TYPE.join(', ')}`)
            if (!query && query === '')
                throw Error(`Query is required`)
        }
    }
}

const validateQueryList = (queryList) => {
    const { name, description, zoom, layers, lat, lng } = queryList

    if (!name && name === '') throw Error('Name is required');
    if (!description && description === '') throw Error('Description is required');
    if (!zoom && zoom === '') throw Error('Zoom is required');
    if (!lat && !lng) throw Error('Latitude and Longitude is required');
    if (!layers || layers.length === 0) throw Error('One or more layers are required')

    validateLayer(layers)
}

module.exports = { validateQueryList }



