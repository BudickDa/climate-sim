getTemperature = function (cellData) {
    var sunEnergy = getSunOnTop() / 10000;


    if (cellData.level3.cloudy) {
        cellData.level3.temperature += sunEnergy/2;
        cellData.level3.temperature -= 10;
    } else {
        cellData.level3.temperature += sunEnergy;
        cellData.level3.temperature -= 20;
    }
    if (cellData.level2.cloudy) {
        cellData.level2.temperature -= 5;
        cellData.level2.temperature += sunEnergy/4;
    }
    else {
        cellData.level2.temperature += sunEnergy/2;
        cellData.level2.temperature -= 10;
    }
    if (cellData.level1.cloudy) {
        cellData.level1.temperature -= 1;
        cellData.level1.temperature += sunEnergy/3;
    }
    else {
        cellData.level1.temperature += sunEnergy/4;
        cellData.level1.temperature -= 2;
    }


    /**
     * stabilize extreme temperature
     */
    if(cellData.level1.temperature > 30){
        cellData.level1.temperature = 32;
    }
    if(cellData.level2.temperature > 10){
        cellData.level3.temperature = 11;
    }
    if(cellData.level3.temperature > 0){
        cellData.level3.temperature = -2;
    }


    return cellData;
};
