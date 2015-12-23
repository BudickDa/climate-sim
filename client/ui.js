function displayClouds(cloudy) {
    if (cloudy) {
        return '<i class="fa fa-cloud"></i>';
    }
    return '<i class="fa fa-sun-o"></i>';
}
function displayFog(cloudy) {
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

function displayWind(wind){
    if (wind) {
        return '<b>Wind</b>';
    }
    return '';
}
Template.map.helpers({
    time: function(){
       var time = moment(Sim.date.get());
        //return `${time.day()}.${time.month()}.${time.year()} ${time.hour()}:${time.minute()}`
        return time.format('[Time: ] dddd, LT')
    },
    cells: function () {
        Sim.mapDep.depend();
        return Sim.map;
    },
    display: function (cell) {
        return `
            <div class="cell" style="background-color:${cell.biome.color};">
                <b>Level 3:</b><br/>
                ${Math.floor(cell.level[2].temperature)} &deg;C, H: ${Sim.roundNumber(cell.level[2].humidity)} %</br>
                ${displayWind(cell.level[2].wind)}<br/>
                ${displayClouds(cell.level[2].cloudy)} ${displayRain(cell.level[2].rainy)}
                <hr/>
                <b>Level 2:</b><br/>
                ${Math.floor(cell.level[1].temperature)} &deg;C, H: ${Sim.roundNumber(cell.level[1].humidity)} %</br>
                ${displayWind(cell.level[1].wind)}<br/>
                ${displayClouds(cell.level[1].cloudy)} ${displayRain(cell.level[1].rainy)}
                <hr/>
                <b>Boden:</b><br/>
                ${Math.floor(cell.level[0].temperature)} &deg;C, H: ${Sim.roundNumber(cell.level[0].humidity)} %</br>
                ${displayWind(cell.level[0].wind)}<br/>
                ${displayFog(cell.level[0].cloudy)} ${ displayRain(cell.level[0].rainy)}
                <hr/>
            </div>
        `;
    }
});