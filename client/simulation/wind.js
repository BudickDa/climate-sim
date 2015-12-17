getWindVelocity = function(cellData) {




    if (cellData.biome && cellData.biome.name === 'mountain') {
        cellData.level1.windVelocity * 0.30;
        cellData.level2.windVelocity * 0.8;
        cellData.level3.windVelocity * 0.95;
    }

    return cellData;
};