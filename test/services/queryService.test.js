const assert = require('assert');

const service = require('../../src/services/queryService')

describe('queryService.js tests', () => {
    describe('queryService.createOrUpdate', () => {
        it('should save correctly - w/o query', async () => {
            const queryMock = {
                "image": null,
                "name": "test",
                "description": "test",
                "layers": [
                    {
                        "isQuery": false,
                        "subtitle": false,
                        "queryType": '',
                        "name": "Bairros",
                        "description": "Limite dos bairros de Natal",
                        "path": "bairro"
                    }
                ],
                "zoom": 11,
                "lat": -5.84379603589604,
                "lng": -35.1212310791016,
            }
            const result = await service.createOrUpdate(queryMock)
            assert.equal(result.name, queryMock.name)
            service.deleteById(result.id)
        });
        it('should save correctly - with query', async () => {
            const queryMock = {
                "image": null,
                "name": "test",
                "description": "test",
                "layers": [
                    {
                        "isQuery": true,
                        "queryType": 'document',
                        "subtitle": false,
                        "query": 'test.test',
                        "name": "Bairros",
                        "description": "Limite dos bairros de Natal",
                        "path": "bairro"
                    }
                ],
                "zoom": 11,
                "lat": -5.84379603589604,
                "lng": -35.1212310791016,
            }
            const result = await service.createOrUpdate(queryMock)
            assert.equal(result.name, queryMock.name)
            service.deleteById(result.id)
        });
        it('should save correctly - with queryType \'indicators\'', async () => {
            const queryMock = {
                "image": null,
                "name": "test",
                "description": "test",
                "layers": [
                    {
                        "isQuery": true,
                        "queryType": 'indicators',
                        "subtitle": false,
                        "query": {
                            "props": 'test.test',
                            "entitiesId": ['e1', 'e2']
                        },
                        "name": "Bairros",
                        "description": "Limite dos bairros de Natal",
                        "path": "bairro"
                    }
                ],
                "zoom": 11,
                "lat": -5.84379603589604,
                "lng": -35.1212310791016,
            }
            const result = await service.createOrUpdate(queryMock)
            assert.equal(result.name, queryMock.name)
            service.deleteById(result.id)
        });
    })
})