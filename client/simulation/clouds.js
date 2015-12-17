getClouds = function (cellData) {
    cellData.level1.cloudy = (cellData.level1.temperature < 0 && cellData.level1.humidity > 0) || cellData.level1.humidity >= 100;
    cellData.level2.cloudy = (cellData.level2.temperature < 0 && cellData.level2.humidity > 0) || cellData.level2.humidity >= 100;
    cellData.level3.cloudy = (cellData.level3.temperature < 0 && cellData.level3.humidity > 0) || cellData.level3.humidity >= 100;
    return cellData
};
