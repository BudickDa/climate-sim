Sim.getTemperature = function (cellData) {
    var sunEnergy = Sim.getSun(Sim.date.get(), cellData.latitude, cellData.longitude);
    _energyToTemperatur = 0.5;

    /**
     * top level
     */
    if (cellData.level[2].cloudy) {
        cellData.level[2].temperature += _energyToTemperatur * sunEnergy;
        //sunlight is dimmed by clouds:
        sunEnergy = sunEnergy * 0.5;

    } else {
        //do nothing, sun goes right through
    }


    if(cellData.level[1].cloudy){
        cellData.level[1].temperature += _energyToTemperatur * sunEnergy;
        //sunlight is dimmed by clouds:
        sunEnergy = sunEnergy * 0.5;
    }

    if(cellData.level[0].cloudy){
        cellData.level[0].temperature += _energyToTemperatur * sunEnergy;
        //sunlight is dimmed by clouds, but reflected back to earth
        sunEnergy = sunEnergy * 0.01;
        cellData.level[0].temperature += _energyToTemperatur * sunEnergy;
    }else{
        cellData.level[0].temperature += _energyToTemperatur * sunEnergy;
    }


    /**
     * stabilize extreme temperature, sometimes there is a cascading error...
     */

    if (cellData.level[0].temperature > 35) {
        cellData.level[0].temperature = chance.floating({min: 30, max: 35});
    }
    if (cellData.level[1].temperature > 10) {
        cellData.level[1].temperature = chance.floating({min: 8, max: 12});
    }
    if (cellData.level[2].temperature > 0) {
        cellData.level[2].temperature = chance.floating({min: -1, max: 1});
    }

    _.forEach(cellData.level, (data)=>{
        if(data.temperature < -240){
            data.temperature = chance.floating({min: -273.1, max: 240});
        }
    })


    return cellData;
};
