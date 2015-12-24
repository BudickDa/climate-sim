Sim.getTemperature = function (cellData) {
    var sunEnergy = Sim.getSun(Sim.date.get(), cellData.latitude, cellData.longitude);

    //store sundata to display on map
    cellData.sun =  sunEnergy;

    _energyToTemperatur = 0.5 + chance.floating({min:-0.2, max: 0.2});

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
        cellData.level[1].temperature = chance.floating({min: 6, max: 10});
    }
    if (cellData.level[2].temperature > 0) {
        cellData.level[2].temperature = chance.floating({min: -5, max: 0});
    }

    _.forEach(cellData.level, (data)=>{
        if(data.temperature < -15){
            data.temperature = chance.floating({min: -16, max: -14});
        }
    })

    return cellData;
};
