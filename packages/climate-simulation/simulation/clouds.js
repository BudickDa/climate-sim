Sim.getClouds = function (cellData) {
    _.forEach(cellData.level, (data, index)=> {
        data.cloudy = (data.temperature < 0 && data.humidity > 0) || data.humidity >= 100;
    });
    return cellData
};
