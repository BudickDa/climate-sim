map = [];
length = 5;
mapDep = new Tracker.Dependency;


var seed = {
    position: 0,
    level1: {
        temperature: 25,
        humidity: 80,
        airPressure: 120,
        windVelocity: 25,
        rainy: false,
        cloudy: false
    },
    level2: {
        temperature: 12,
        humidity: 100,
        airPressure: 120,
        windVelocity: 25,
        rainy: false,
        cloudy: true
    },
    level3: {
        temperature: -10,
        humidity: 110,
        airPressure: 120,
        windVelocity: 25,
        rainy: false,
        cloudy: true
    }
}

var nextCell = function (cellData) {
    var nextCellData = {
        position: cellData.position,
        level1: _.clone(cellData.level1),
        level2: _.clone(cellData.level2),
        level3: _.clone(cellData.level3),
        biome: _.clone(cellData.biome),
    };
    console.log(nextCellData);
    if (nextCellData.position != length) {
        nextCellData.position++;
    }
    map[nextCellData.position] = nextCellData;
    mapDep.changed();

    return nextCellData;
}
startSimulation = function (cellData) {
    var simulation = _.compose(manipulate, setBiome, getClouds, getTemperature, getWindVelocity, getHumidity, getRain, nextCell);
    Meteor.setInterval(function () {
        simulation(cellData);
    }, 1000);
}
startSimulation(seed);


Template.map.helpers({
    cells: function () {
        mapDep.depend();
        return map;
    },
    display: function (cell) {
        return `
            <div class="cell" style="background-color:${cell.biome.color};">
                T: ${cell.level1.temperature} C,</br>
                H: ${cell.level1.humidity} %,</br>
                V: ${cell.level1.windVelocity} m/s,</br>
                C: ${cell.level1.cloudy}</br>
                R: ${cell.level1.rainy}</br></br>
                Position: ${cell.position}
            </div>
        `;
    }
});

