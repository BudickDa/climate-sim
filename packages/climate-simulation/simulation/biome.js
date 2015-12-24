Sim.getBiome = function (cellData) {
    _.forEach(Sim.biomeTable, (biomeData, index)=> {
        if(index>2) {
            var match = false, ground = cellData.level[0];
            if ((ground.temperature > biomeData.temperature[0] && ground.temperature <= biomeData.temperature[1])&&(ground.humidity > biomeData.humidity[0] && ground.humidity <= biomeData.humidity[1])) {
                cellData.biome = biomeData;
            }
        }
    });

    return cellData;
};

Sim.freezeWater = function(cellData){

    var ground = cellData.level[0];
    /*
     * special case for water (becomes ice under 0 degree celsius)
     * */
    if(cellData.biome.name === 'water' && ground.temperature > 0){
        cellData.biome = Sim.biomeTable[1];
    }
    if(cellData.biome.name === 'ice' && ground.temperature <= 0){
        cellData.biome = Sim.biomeTable[2];
    }
    return cellData;
}

Sim.manipulate = function (cellData) {
    if(cellData.position===0){

        return cellData;
    }

    /**
     * Check if wind was blowing for each level
     */
    _.forEach(cellData.level, (data, index)=> {
        //get last cells data
        var lastData = Sim.map[cellData.position-1].level[index];
        if (lastData.wind) {
            data.humidity += 0.01 * lastData.humidity;
            data.temperature += 0.01 * lastData.temperature;
            data.cloudy = lastData.cloudy;
            data.rainy = lastData.rainy;

        }
    });

    return cellData;

};