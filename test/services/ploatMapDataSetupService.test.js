const assert = require('assert');

const service = require('../../src/services/plotMapDataSetupService')

const mockSetupJustPoints = {
    name: 'test',
    description: 'test',
    plotSource: 'justPoint',
    userCreator: {
        id: '123abc',
        name: 'userTest'
    },
    private: false,
    coordinatesPoints: { latitude: -15, longitude: 7 }
}

const mockSetupGeojson = {
    name: 'test',
    description: 'test',
    plotSource: 'geojson',
    userCreator: {
        id: '123abc',
        name: 'userTest'
    },
    private: false,
    fileFolderName: ['folder/fileFolderName.json']
}

const mockSetupDraw = {
    name: 'test',
    description: 'test',
    plotSource: 'draw',
    userCreator: {
        id: '123abc',
        name: 'userTest'
    },
    private: true,
    geojson: {
        "type": "FeatureCollection",
        "features": [
            {
                "type": "Feature",
                "geometry": { "type": "Point", "coordinates": [102.0, 0.5] },
                "properties": { "prop0": "value0" }
            },
            {
                "type": "Feature",
                "geometry": {
                    "type": "LineString",
                    "coordinates": [
                        [102.0, 0.0], [103.0, 1.0], [104.0, 0.0], [105.0, 1.0]
                    ]
                },
                "properties": {
                    "prop0": "value0",
                    "prop1": 0.0
                }
            }
        ]
    }
}

const mockSetupText = {
    name: 'test',
    description: 'test',
    plotSource: 'text',
    userCreator: {
        id: '123abc',
        name: 'userTest'
    },
    private: false,
    coordinatesText: {
        type: 'polygons',
        content: `
        123123, 132231
        312312, 131132
        `
    }
}

const mockSetupCsv = {
    name: 'test',
    description: 'test',
    plotSource: 'csv',
    userCreator: {
        id: '123abc',
        name: 'userTest'
    },
    private: false,
    fileFolderName: ['folder/fileFolderName.csv']
}

const mockSetupShapefile = {
    name: 'test',
    description: 'test',
    plotSource: 'shapefile',
    userCreator: {
        id: '123abc',
        name: 'userTest'
    },
    private: false,
    fileFolderName: ['folder/fileFolderName.shp', 'folder/fileFolderName.dbf']
}

describe('plotMapDataSetupService.js tests', () => {
    describe('plotMapDataSetupService.createOrUpdate() Test', () => {
        it('should save correctly - plot source: justPoint', async () => {
            const result = await service.createOrUpdate(mockSetupJustPoints)
            assert.equal(result.name, mockSetupJustPoints.name);
            service.deleteById(result.id)
        });

        it('should save correctly - plot source: geojson', async () => {
            const result = await service.createOrUpdate(mockSetupGeojson)
            assert.equal(result.name, mockSetupGeojson.name);
            service.deleteById(result.id)
        });

        it('should save correctly - plot source: draw', async () => {
            const result = await service.createOrUpdate(mockSetupDraw)
            assert.equal(result.name, mockSetupDraw.name);
            service.deleteById(result.id)
        });

        it('should save correctly - plot source: text', async () => {
            const result = await service.createOrUpdate(mockSetupText)
            assert.equal(result.name, mockSetupText.name);
            service.deleteById(result.id)
        });

        it('should save correctly - plot source: csv', async () => {
            const result = await service.createOrUpdate(mockSetupCsv)
            assert.equal(result.name, mockSetupCsv.name);
            service.deleteById(result.id)
        });

        it('should save correctly - plot source: shapefile', async () => {
            const result = await service.createOrUpdate(mockSetupShapefile)
            assert.equal(result.name, mockSetupShapefile.name);
            service.deleteById(result.id)
        });
    });

    describe('plotMapDataSetupService.createOrUpdate() Test', () => {
        it('should update correctly', async () => {
            const result = await service.createOrUpdate(mockSetupJustPoints)
            assert.equal(result.name, mockSetupJustPoints.name);
            const resultFound = await service.findById(result.id)
            resultFound.name = 'updated'
            await service.createOrUpdate(resultFound)
            const resultFoundUpdated = await service.findById(result.id)
            assert.equal(resultFoundUpdated.name, 'updated');
            await service.deleteById(result.id)
        });
    });


    describe('plotMapDataSetupService.findAll() Test', () => {
        it('should find all data correctly', async () => {
            let results = []
            for (let i = 0; i < 10; i++) {
                const mockSetup = {
                    name: `test-${i + 1}`,
                    description: 'test',
                    plotSource: 'justPoint',
                    userCreator: {
                        id: '123abc',
                        name: 'userTest'
                    },
                    private: false,
                    coordinatesPoints: { latitude: -15, longitude: 7 }
                }
                const result = await service.createOrUpdate(mockSetup)
                results.push(result.toJSON())
            }
            const resultCollection = await service.findAll('asc', 0, 5)
            assert.equal(resultCollection.length, 5)

            results.forEach(async elem => {
                await service.deleteById(elem.id)
            })
        });
    });

    describe('plotMapDataSetupService.findByPlotSourceAndVisibleStatus() Test', () => {
        it('should find by plot source data correctly', async () => {
            let results = []
            for (let i = 0; i < 4; i++) {
                const mockSetup = {
                    name: `test-${i + 1}`,
                    description: 'test',
                    plotSource: 'justPoint',
                    userCreator: {
                        id: '123abc',
                        name: 'userTest'
                    },
                    private: false,
                    coordinatesPoints: { latitude: -15, longitude: 7 }
                }
                const result = await service.createOrUpdate(mockSetup)
                results.push(result)
            }

            for (let i = 0; i < 6; i++) {
                const mockSetup = {
                    name: `test-${i + 1}`,
                    description: 'test',
                    plotSource: 'geojson',
                    userCreator: {
                        id: '123abc',
                        name: 'userTest'
                    },
                    private: false,
                    fileFolderName: ['folder/fileFolderName.json']
                }
                const result = await service.createOrUpdate(mockSetup)
                results.push(result)
            }

            let resultCollection = await service.findByPlotSourceAndUserIdAndVisibleStatus(
                'justPoint', null, null, 'asc', 0, 4
            )
            assert.equal(resultCollection.length, 4)

            resultCollection = await service.findByPlotSourceAndUserIdAndVisibleStatus(
                'geojson', null, null, 'asc', 0, 6
            )
            assert.equal(resultCollection.length, 6)

            results.forEach(async elem => {
                await service.deleteById(elem.id)
            })
        });

        it('should find by visible status data correctly', async () => {
            let results = []
            for (let i = 0; i < 4; i++) {
                const mockSetup = {
                    name: `test-${i + 1}`,
                    description: 'test',
                    plotSource: 'justPoint',
                    userCreator: {
                        id: '123abc',
                        name: 'userTest'
                    },
                    private: false,
                    coordinatesPoints: { latitude: -15, longitude: 7 }
                }
                const result = await service.createOrUpdate(mockSetup)
                results.push(result)
            }

            for (let i = 0; i < 6; i++) {
                const mockSetup = {
                    name: `test-${i + 1}`,
                    description: 'test',
                    plotSource: 'justPoint',
                    userCreator: {
                        id: '123abc',
                        name: 'userTest'
                    },
                    private: true,
                    coordinatesPoints: { latitude: -15, longitude: 7 }
                }
                const result = await service.createOrUpdate(mockSetup)
                results.push(result)
            }

            let resultCollection = await service.findByPlotSourceAndUserIdAndVisibleStatus(
                'justPoint', null, false, 'asc', 0, 4
            )
            assert.equal(resultCollection.length, 4)

            resultCollection = await service.findByPlotSourceAndUserIdAndVisibleStatus(
                'justPoint', null, true, 'asc', 0, 6
            )
            assert.equal(resultCollection.length, 6)

            results.forEach(async elem => {
                await service.deleteById(elem.id)
            })
        });

        it('should find by user id data correctly', async () => {
            let results = []
            for (let i = 0; i < 4; i++) {
                const mockSetup = {
                    name: `test-${i + 1}`,
                    description: 'test',
                    plotSource: 'justPoint',
                    userCreator: {
                        id: '123abc',
                        name: 'userTest'
                    },
                    private: false,
                    coordinatesPoints: { latitude: -15, longitude: 7 }
                }
                const result = await service.createOrUpdate(mockSetup)
                results.push(result)
            }

            for (let i = 0; i < 6; i++) {
                const mockSetup = {
                    name: `test-${i + 1}`,
                    description: 'test',
                    plotSource: 'justPoint',
                    userCreator: {
                        id: 'abc123',
                        name: 'userTest'
                    },
                    private: true,
                    coordinatesPoints: { latitude: -15, longitude: 7 }
                }
                const result = await service.createOrUpdate(mockSetup)
                results.push(result)
            }

            let resultCollection = await service.findByPlotSourceAndUserIdAndVisibleStatus(
                'justPoint', '123abc', null, 'asc', 0, 4
            )
            assert.equal(resultCollection.length, 4)

            resultCollection = await service.findByPlotSourceAndUserIdAndVisibleStatus(
                'justPoint', 'abc123', null, 'asc', 0, 6
            )
            assert.equal(resultCollection.length, 6)

            results.forEach(async elem => {
                await service.deleteById(elem.id)
            })
        });
    });

    describe('plotMapDataSetupService.findById() Test', () => {
        it('should find by id correctly', async () => {
            const result = await service.createOrUpdate(mockSetupJustPoints)
            assert.equal(result.name, mockSetupJustPoints.name);
            const resultFound = await service.findById(result.id)
            assert.equal(result.id, resultFound.id)
            service.deleteById(result.id)
        });
    });

    describe('plotMapDataSetupService.deleteById() Test', () => {
        it('should delete by id correctly', async () => {
            const result = await service.createOrUpdate(mockSetupJustPoints);
            assert.equal(result.name, mockSetupJustPoints.name);
            await service.deleteById(result.id);
        });
    });
});