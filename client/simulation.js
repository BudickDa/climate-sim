var setWind = _.compose(Sim.getWind, Sim.getTemperature);
var setClouds = _.compose(Sim.getClouds, Sim.getTemperature, Sim.getHumidity);
var setRain = _.compose(Sim.getRain, Sim.getClouds, Sim.getTemperature, Sim.getHumidity);
var setBiom = _.compose(Sim.freezeWater, Sim.getBiome, Sim.getHumidity, Sim.getTemperature, Sim.manipulate);
Sim.simulation = _.compose(Sim.nextCell, setWind, setClouds, setRain, setBiom);

Sim.map[0]=Sim.seed;

Meteor.setInterval(function () {
    var tmpDate = Sim.date.get();
    tmpDate.setTime(tmpDate.getTime() + (10* 60 * 1000)); //increment by one minute each iteration
    Sim.date.set(tmpDate);
    Sim.simulation(Sim.map[0]);
}, 500);