Sim.getHumidity = function (cellData) {
    _.forEach(cellData.level, (data, index)=> {
        if (data.temperature > 0 && data.humidity<200) {
            data.humidity += 5.1*(index+1);
            data.temperature -= 0.51*(index+1);
        } else {
            data.humidity -= 5*(index+1);
            data.temperature += 0.5*(index+1);
        }
        if (data.humidity < 0) {
            //humity should no be lesser than 0
            data.humidity = 0;
        }

    });
    //water goes into the ground if it is really wet
    if (cellData.level[0].humidity > 110) {
        cellData.level[0].humidity -= 10;
    }


    return cellData;
};

Sim.getRain = function (cellData) {
    _.forEach(cellData.level, (data, index)=> {
        if (index > 0) {
            data.rainy = data.clouds && (data.temperature > 0 && data.humidity > 120);
            data.rainy = data.humidity > 150;
            if (data.rainy) {
                data.humidity -= 15;
                cellData.level[0].humidity += 15;
            }
        }
    });
    return cellData;
}