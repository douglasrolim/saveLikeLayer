const geoJsonValidator = require("geojson-validation");

const PLOT_SOURCES_TYPES = ['justPoint', 'geojson', 'draw', 'text', 'csv', 'shapefile']

const validatePlotMapDataSetup = (setup) => {

    if (!setup) throw Error('Plot Setup - is null')
    else if (!setup.name || setup.name === '') throw Error('Plot Setup - name is null')
    else if (!setup.description || setup.description === '') throw Error('Plot Setup - description is null')
    else if (!setup.plotSource || setup.plotSource === '') throw Error('Plot Setup - plot source is null')
    else if (!PLOT_SOURCES_TYPES.includes(setup.plotSource))
        throw Error(`Plot Setup - plot source must be one of these: ${PLOT_SOURCES_TYPES.join(', ')}`)

    if (setup.plotSource === 'justPoint') {
        if (!setup.coordinatesPoints)
            throw Error(`Plot Setup - plot source justPoint - coordinatesPoints is required`)
        if (!setup.coordinatesPoints.latitude || !setup.coordinatesPoints.longitude)
            throw Error(`Plot Setup - plot source justPoint - latitude and longitude are required`)
    } else if (setup.plotSource === 'geojson') {
        if (!setup.fileFolderName || setup.fileFolderName === '')
            throw Error(`Plot Setup - plot source geojson - file folder is required`)
        if (!setup.fileFolderName.includes('.json') && !setup.fileFolderName.includes('.geojson'))
            throw Error(`Plot Setup - plot source geojson - file must be .json or .geojson`)
    } else if (setup.plotSource === 'draw') {
        if (!setup.geojson)
            throw Error(`Plot Setup - plot source draw - geojson content is required`)
        if (!geoJsonValidator.valid(setup.geojson))
            throw Error(`Plot Setup - plot source draw - geojson content is not valid`)
    } else if (setup.plotSource === 'text') {
        if (!setup.coordinatesText)
            throw Error(`Plot Setup - plot source text - coordinatesText is required`)
        if (!setup.coordinatesText.type || setup.coordinatesText.type === '')
            throw Error(`Plot Setup - plot source text - coordinatesText type is required`)
        if (setup.coordinatesText.type !== 'points' && setup.coordinatesText.type !== 'polygons')
            throw Error(`Plot Setup - plot source text - coordinatesText type must be: points or polygons`)
        if (!setup.coordinatesText.content || setup.coordinatesText.content === '')
            throw Error(`Plot Setup - plot source text - coordinatesText content is required`)
    } else if (setup.plotSource === 'csv') {
        if (!setup.fileFolderName || setup.fileFolderName === '')
            throw Error(`Plot Setup - plot source csv - file folder is required`)
        if (!setup.fileFolderName.includes('.csv'))
            throw Error(`Plot Setup - plot source csv - file must be .csv`)
    } else if (setup.plotSource === 'shapefile') {
        if (!setup.fileFolderName || setup.fileFolderName === '')
            throw Error(`Plot Setup - plot source shapefile - file folder is required`)
    }
}

module.exports = { PLOT_SOURCES_TYPES, validatePlotMapDataSetup }