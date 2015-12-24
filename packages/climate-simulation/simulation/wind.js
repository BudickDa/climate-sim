Sim.getWind = function (cellData) {
    _.forEach(cellData.level, (data, index)=> {
        var lastPosition = cellData.position - 1;
        if (Sim.map[lastPosition]) {
            lastCellTemperature = Sim.map[lastPosition].level[index].temperature;
        } else {
            data.wind = true;
        }
        data.wind = data.temperature > lastCellTemperature;
    });
    return cellData;
};