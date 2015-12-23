Sim.getWind = function (cellData) {
    _.forEach(cellData.level, (data, index)=> {
        var lastPosition = cellData.position - 1;
        if (lastPosition >= 0) {
            lastCellTemperature = Sim.map[lastPosition].level[index].temperature;
        } else {
            lastCellTemperature = Sim.seed.level[index].temperature;
        }
        data.wind = data.temperature > lastCellTemperature;
    });
    return cellData;
};