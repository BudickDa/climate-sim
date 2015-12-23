Sim.getBiome = function (cellData) {
    _.forEach(Sim.biomeTable, (biomeData, index)=> {
        if(index>2) {
            var match = false, ground = cellData.level[0];
            if (ground.temperature > biomeData.temperature[0] && ground.temperature <= biomeData.temperature[1]) {
                match = true;
            }
            if (ground.humidity > biomeData.humidity[0] && ground.humidity <= biomeData.humidity[1]) {
                match = true;
            }
            if (match) {
                cellData.biome = biomeData;
            }
        }
    });

    //switch to night:
    var sunEnergy = Sim.getSun(Sim.date.get(), cellData.latitude, cellData.longitude);
    if(sunEnergy===0){
        cellData.biome = Sim.biomeTable[2];
    }


    cellData.longitude += 0.01 * cellData.position;

    return cellData;
};

Sim.freezeWater = function(cellData){
    /*
     * special case for water (becomes ice under 0 degree celsius)
     * */
    if(cellData.biome.name === 'water' && ground.temperature > 0){
        cellData.biome = Sim.biomeTable[1];
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
    var wind = false;
    _.forEach(cellData.level, (data, index)=> {
        //get last cells data
        lastData = Sim.map[cellData.position-1].level[index];


        if (cellData.position === 0 || wind) {
            data.humidity += 0.01 * lastData.humidity;
            data.temperature += 0.01 * lastData.temperature;
            data.cloudy = lastData.cloudy;
            data.rainy = lastData.rainy;

        }
    });

    return cellData;

};