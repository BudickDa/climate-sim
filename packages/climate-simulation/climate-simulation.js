Sim = {};
Sim.map = [];
Sim.mapDep = new Tracker.Dependency;

Sim.config = {
    length: 200
}

Sim.simulation = function(data){
    console.log('TODO: Create you own simulation...');
    return Sim.nextCell(data);
};

Sim.date = new ReactiveVar(new Date());

Sim.nextCell = function(data) {
    data = data || seed
    Sim.map[data.position] = data;
    Sim.mapDep.changed();

    if (data.position <= Sim.config.length) {
        var newData = {
            position: data.position + 1,
            latitude: data.latitude,
            longitude: data.longitude,
            level: data.level.slice(),
            biome: _.clone(data.biome)
        };

        return Sim.simulation(newData);
    }
};

