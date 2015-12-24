Sim = {};
Sim.map = [];
Sim.mapDep = new Tracker.Dependency;

Sim.config = {
    length: 200
}

Sim.simulation = function (data) {
    console.log('TODO: Create you own simulation...');
    return Sim.nextCell(data);
};

Sim.date = new ReactiveVar(new Date());

Sim.nextCell = function (data) {
    Sim.map[data.position] = data;
    Sim.mapDep.changed();

    var nextPosition = data.position + 1, newData;
    if (nextPosition < Sim.config.length) {
        if (Sim.map[nextPosition]) {
            newData = Sim.map[nextPosition];
        } else {
            //seed chance with position for inital values
            var c = new Chance(nextPosition);
            newData = {
                position: nextPosition,
                latitude: data.latitude,
                longitude: Sim.roundNumber(Sim.seed.longitude + 0.1 * nextPosition,2),
                level: [
                    {
                        temperature: c.floating({min:-30, max: 5}),
                        humidity: c.floating({min:0, max: 200}),
                        wind: false,
                        rainy: false,
                        cloudy: false
                    },
                    {
                        temperature: c.floating({min:-10, max: 15}),
                        humidity: c.floating({min:0, max: 200}),
                        wind: false,
                        rainy: false,
                        cloudy: false
                    },
                    {
                        temperature: c.floating({min:0, max: 35}),
                        humidity: c.floating({min:0, max: 150}),
                        wind: false,
                        rainy: false,
                        cloudy: false
                    }
                ],
                biome: chance.pick(Sim.biomeTable)
            }
        }

        return Sim.simulation(newData);
    }
};

