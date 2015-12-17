getHumidity = function (cellData) {
    if (cellData.temperature > 0) {
        cellData.level1.humidity +=5;
        cellData.level1.temperature -= 0.5;

        cellData.level2.humidity +=5;
        cellData.level2.temperature -= 0.5;

        cellData.level3.humidity +=5;
        cellData.level3.temperature -= 0.5;
    } else {
        cellData.level1.humidity +=5;
        cellData.level1.temperature -= 0.5;

        cellData.level2.humidity +=0.5;
        cellData.level2.temperature -= 0.05;

        cellData.level3.humidity +=0.5;
        cellData.level3.temperature -= 0.05;
    }

    if(cellData.level3.rainy){
        cellData.level3.humidity -= 15;
        cellData.level1.humidity += 15;
    }

    if(cellData.level2.rainy){
        cellData.level2.humidity -= 15;
        cellData.level1.humidity += 15;
    }



    if(cellData.level1.humidity>110){
        cellData.level1.humidity = 80;
    }

    return cellData;
};

getRain = function(cellData){
    cellData.level3.rainy = cellData.level3.clouds && (cellData.level3.temperature>0 && cellData.level3.humidity>120);
    cellData.level2.rainy = cellData.level2.clouds && (cellData.level2.temperature>0 && cellData.level2.humidity>120);
    if(cellData.level3.rainy) {
        cellData.level3.humidity = 0;
    }
    if(cellData.level2.rainy) {
        cellData.level2.humidity = 0;
    }
    return cellData;
}