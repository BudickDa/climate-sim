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

var nextCell = function(cellData){
    map[cellData.position] = cellData;
    mapDep.changed();

    if(cellData.position === length){
        cellData.position = 0;
    }
    cellData.position++;
    return cellData;
}
startSimulation = function(cellData){
    var simulation = _.compose(manipulate, setBiome, getClouds, getTemperature, getWindVelocity, getHumidity, getRain, nextCell);
    Meteor.setInterval(function(){
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
                R: ${cell.level1.rainy}
            </div>
        `;
    }
});

