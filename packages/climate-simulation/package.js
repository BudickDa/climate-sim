Package.describe({
  name: 'budickda:climate-simulation',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: '',
  // URL to the Git repository containing the source code for this package.
  git: '',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.2.1');
  api.use('ecmascript');
  api.use('tracker');
  api.use('reactive-var');

  api.use('thepumpinglemma:chance');
  api.use('momentjs:moment');

  /**
   * Simulation files
   */
  api.addFiles('climate-simulation.js');
  api.addFiles('biomes.js');
  api.addFiles('seed.js');
  api.addFiles('simulation/clouds.js');
  api.addFiles('simulation/humidity.js');
  api.addFiles('simulation/sun.js');
  api.addFiles('simulation/temperature.js');
  api.addFiles('simulation/wind.js');
  api.addFiles('simulation/biome.js');

  api.export('Sim');
});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('thepumpinglemma:chance');
  api.use('momentjs:moment');
  api.use('tinytest');

  /**
   * Simulation files
   */
  api.addFiles('climate-simulation.js');
  api.addFiles('simulation/clouds.js');
  api.addFiles('simulation/humidity.js');
  api.addFiles('simulation/sun.js');
  api.addFiles('simulation/temperature.js');
  api.addFiles('simulation/wind.js');

  api.addFiles('test_sun.js');
});
