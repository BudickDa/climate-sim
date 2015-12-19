map = [];
length = 500;
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
};


//var simulation = _.compose(manipulate, getClouds, getTemperature, getWindVelocity, getHumidity, getRain, nextCell);

var simulation = _.compose(nextCell, getClouds, getTemperature, getWindVelocity, getHumidity, getRain, manipulate);
function nextCell(cellData) {
    var nextCellData = {
        position: cellData.position,
        level1: _.clone(cellData.level1),
        level2: _.clone(cellData.level2),
        level3: _.clone(cellData.level3),
        biome: setBiome(cellData)
    };
    if (nextCellData.position < length) {
        map[nextCellData.position] = nextCellData;
        nextCellData.position++;
        mapDep.changed();

        return simulation(nextCellData);
    }
}
Meteor.setInterval(function () {
    simulation(seed);
}, 500);


function displayClouds(cloudy) {
    if (cloudy) {
        return '<i class="fa fa-cloud"></i>';
    }
    return '<i class="fa fa-sun-o"></i>';
}

function displayRain(rainy) {
    if (rainy) {
        return '<b>Regen</b>';
    }
    return '';
}
Template.map.helpers({
    cells: function () {
        mapDep.depend();
        return map;
    }
    ,
    display: function (cell) {
        var rain = displayRain(cell.level1.rainy), clouds = displayClouds(cell.level1.cloudy);
        return `
            <div class="cell" style="background-color:${cell.biome.color};">
                ${Math.floor(cell.level1.temperature)} &deg;C, H: ${cell.level1.humidity} %<br/>
                Wind: ${cell.level1.windVelocity} m/s,</br>
                ${clouds} ${rain}
            </div>
        `;
    }
})
;

