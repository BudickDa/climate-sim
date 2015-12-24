function displayClouds(cloudy) {
    if (cloudy) {
        return '<i class="fa fa-cloud"></i>';
    }
    return '<i class="fa fa-sun-o"></i>';
}
function displayFog(cloudy) {
    if (cloudy) {
        return '<b>Nebel</b>';
    }
    return '';
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
        var sun = `Sun: ${Sim.roundNumber(cell.sun,2)} W/m²`;
        if(cell.sun===0){
            sun = 'Nacht';
        }
        return `
            <div class="cell" style="background-color:${cell.biome.color};border: solid black 1px">
                ${sun}<br/>
                <b>Level 3:</b><br/>
                ${Sim.roundNumber(cell.level[2].temperature,1)} &deg;C, H: ${Sim.roundNumber(cell.level[2].humidity,2)} %</br>
                ${displayWind(cell.level[2].wind)}<br/>
                ${displayClouds(cell.level[2].cloudy)} ${displayRain(cell.level[2].rainy)}
                <hr/>
                <b>Level 2:</b><br/>
                ${Sim.roundNumber(cell.level[1].temperature,1)} &deg;C, H: ${Sim.roundNumber(cell.level[1].humidity,2)} %</br>
                ${displayWind(cell.level[1].wind)}<br/>
                ${displayClouds(cell.level[1].cloudy)} ${displayRain(cell.level[1].rainy)}
                <hr/>
                <b>Boden:</b><br/>
                ${Sim.roundNumber(cell.level[0].temperature,1)} &deg;C, H: ${Sim.roundNumber(cell.level[0].humidity,2)} %</br>
                ${displayWind(cell.level[0].wind)}<br/>
                ${displayFog(cell.level[0].cloudy)}<br/>
                <b>${cell.biome.name}</b><br/>
                <b>${cell.latitude}&deg;, ${cell.longitude}&deg;</b>
            </div>
        `;
    }
});