biomeTable = [
    {
        name: 'dessert',
        temperature: [30, 99],
        humidity: [0, 10],
        color: '#D8C14B'
    },
    {
        name: 'grassland',
        temperature: [0, 29],
        humidity: [10, 200],
        color: '#6CAA68'
    },
    {
        name: 'snow',
        temperature: [-273, -1],
        humidity: [0, 200],
        color: '#DFDBD2'
    },
    {
        name: 'water',
        temperature: [0, 100],
        humidity: [0, 200],
        color: '#007EFF'
    },
    {
        name: 'mountain',
        temperature: [-273, 999],
        humidity: [0, 200],
        color: '#797A72'
    }
];

setBiome = function (cellData) {
    _.forEach(biomeTable, (biomeData)=> {
        var match = false;
        if (cellData.level1.temperature > biomeData.temperature[0] && cellData.level1.temperature <= biomeData.temperature[1]) {
            match = true;
        }
        if (cellData.level1.humidity > biomeData.humidity[0] && cellData.level1.humidity <= biomeData.humidity[1]) {
            match = true;
        }
        if (match) {
            cellData.biome = biomeData;
        }
    });
    return cellData;
};

manipulate = function (cellData) {
    var newCellData = map[cellData.position];
    if (!newCellData) {
        newCellData = cellData;
    } else if (cellData.level1.windVelocity > 0) {
        newCellData.level1.humidity += (1 / cellData.level1.humidity) * cellData.level1.humidity;
        newCellData.level1.temperature += (1 / cellData.level1.temperature) * cellData.level1.temperature;
    } else if (cellData.level2.windVelocity > 0) {
        newCellData.level2.humidity += (1 / cellData.level2.humidity) * cellData.level2.humidity;
        newCellData.level2.temperature += (1 / cellData.level2.temperature) * cellData.level2.temperature;
    } else if (cellData.level3.windVelocity > 0) {
        newCellData.level3.humidity += (1 / cellData.level3.humidity) * cellData.level3.humidity;
        newCellData.level3.temperature += (1 / cellData.level3.temperature) * cellData.level3.temperature;
    }
    return newCellData;

};


