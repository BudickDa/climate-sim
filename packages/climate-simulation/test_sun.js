Tinytest.add('Test Sim.toRadians()', function (test) {
    var degree = 180;
    test.equal(Sim.toRadians(degree).toFixed(5), (Math.PI).toFixed(5));
    degree = 90;
    test.equal(Sim.toRadians(degree).toFixed(5), (0.5 * Math.PI).toFixed(5));
    degree = 45;
    test.equal(Sim.toRadians(degree).toFixed(5), (0.25 * Math.PI).toFixed(5));
    degree = 30;
    test.equal(Sim.toRadians(degree).toFixed(5), (Math.PI / 6).toFixed(5));
    degree = 0;
    test.equal(Sim.toRadians(degree), 0);
});

Tinytest.add('Test Sim.toDegree()', function (test) {
    var degree = 180;
    test.equal(Sim.toDegree(Math.PI), degree);
    degree = 90;
    test.equal(Sim.toDegree(0.5 * Math.PI), degree);
    degree = 45;
    test.equal(Sim.toDegree(0.25 * Math.PI), degree);
    degree = 30;
    test.equal((Sim.toDegree(Math.PI / 6)).toFixed(5), (degree).toFixed(5));
    degree = 0;
    test.equal(Sim.toDegree(0), degree);
});

Tinytest.add('Test MathD', function (test) {
    test.equal(Sim.MathD.sin(90), 1);
    test.equal(Sim.MathD.sin(30), 0.5);
    test.equal(Sim.MathD.sin(0), 0);

    test.equal(Sim.MathD.cos(90), 0);
    test.equal(Sim.MathD.cos(30), 0.86603);
    test.equal(Sim.MathD.cos(0), 1);

    test.equal(Sim.MathD.tan(89), 57.28996);
    test.equal(Sim.MathD.tan(30), 0.57735);
    test.equal(Sim.MathD.tan(0), 0);

    test.equal(Sim.MathD.asin(1), 90);
    test.equal(Sim.MathD.asin(0.5), 30);
    test.equal(Sim.MathD.asin(0), 0);

    test.equal(Sim.MathD.acos(0), 90);
    test.equal(Sim.MathD.acos(0.86603), 29.99947);
    test.equal(Sim.MathD.acos(1), 0);

    test.equal(Sim.MathD.atan(57.28996), 89);
    test.equal(Sim.MathD.atan(0.57735), 29.99999);
    test.equal(Sim.MathD.atan(0), 0);
});

Tinytest.add('Test Sim.getDaysOfYear()', function (test) {
    test.equal(Sim.getDayOfYear(new Date(2005, 0, 21, 0, 0, 0, 0)), 21);
    test.equal(Sim.getDayOfYear(new Date(2008, 11, 21, 0, 0, 0, 0)), 356);
    test.equal(Sim.getDayOfYear(new Date(2015, 11, 30, 0, 0, 0, 0)), 364);
});

Tinytest.add('Test Sim.n()', function (test) {
    test.equal(Sim.n(new Date(2000, 0, 21)), 21);
    test.equal(Sim.n(new Date(2008, 11, 20)), 3277);
    test.equal(Sim.n(new Date(2015, 11, 30)), 5843);
});

Tinytest.add('Test Sim.getEOT()', function (test) {
    test.equal(Sim.getEOT(new Date(2015, 11, 20, 15, 0, 0, 0), 52.3, 13.3), 1.8519357);
    test.equal(Sim.getEOT(new Date(2000, 1, 1, 9, 0, 0), 52.3, 13.3), -13.689417);
    test.equal(Sim.getEOT(new Date(2000, 0, 1, 12, 0, 0), 52.3, 13.3), -3.7051811999999993);
});

Tinytest.add('Test Sim.getEcliptic()', function (test) {
    test.equal(Sim.getEcliptic(new Date(2015, 11, 20, 15, 0, 0, 0), 52.3, 13.3), 23.4366668);
    test.equal(Sim.getEcliptic(new Date(2005, 1, 1, 9, 0, 0), 48, 5), 23.4382564);
    test.equal(Sim.roundNumber(Sim.getEcliptic(new Date(2000, 0, 1, 10, 57, 54, 815), 80, 40), 3), 23.439); //because n = 0
});

Tinytest.add('Test Sim.getDeclination()', function (test) {
    test.equal((Sim.getDeclination(new Date(2015, 11, 21, 0, 0, 0, 0), 52.3, 13.3)).toFixed(2), (-23.44).toFixed(2)); //astronom. winter
    test.equal((Sim.getDeclination(new Date(2015, 5, 21, 0, 0, 0, 0), 52.3, 13.3)).toFixed(2), (23.44).toFixed(2)); //astronom. summer
});


Tinytest.add('Test Sim.getSolarTime()', function (test) {
    test.equal(Sim.getSolarTime(new Date(2015, 11, 21, 0, 0, 0, 0), 52.3, 13.3), 23.9); //astronom. winter
    test.equal(Sim.getSolarTime(new Date(2015, 5, 21, 0, 0, 0, 0), 52.3, 13.3), 23.85); //astronom. summer

    test.equal(Sim.getSolarTime(new Date(2015, 11, 21, 12, 0, 0, 0), 52.3, 13.3), 11.9); //astronom. winter
    test.equal(Sim.getSolarTime(new Date(2015, 5, 21, 12, 0, 0, 0), 52.3, 13.3), 11.85); //astronom. summer
});

Tinytest.add('Test Sim.getHourAngle()', function (test) {
    test.equal(Sim.roundNumber(Sim.getHourAngle(new Date(2015, 11, 21, 0, 0, 0, 0), 52.3, 13.3), 2), 178.5); //astronom. winter
    test.equal(Sim.roundNumber(Sim.getHourAngle(new Date(2015, 5, 21, 0, 0, 0, 0), 52.3, 13.3), 2), 177.75); //astronom. summer

    test.equal(Sim.roundNumber(Sim.getHourAngle(new Date(2015, 11, 21, 12, 0, 0, 0), 52.3, 13.3), 2), -1.5); //astronom. winter
    test.equal(Sim.roundNumber(Sim.getHourAngle(new Date(2015, 5, 21, 12, 0, 0, 0), 52.3, 13.3), 2), -2.25); //astronom. summer
});

Tinytest.add('Test Sim.getElevationAngle()', function (test) {
    test.equal(Sim.roundNumber(Sim.getElevationAngle(new Date(2015, 11, 21, 0, 0, 0, 0), 52.3, 13.3), 3), -61.115); //astronom. winter
    test.equal(Sim.roundNumber(Sim.getElevationAngle(new Date(2015, 5, 21, 0, 0, 0, 0), 52.3, 13.3), 3), -14.238 ); //astronom. summer

    test.equal(Sim.roundNumber(Sim.getElevationAngle(new Date(2015, 11, 21, 12, 0, 0, 0), 52.3, 13.3), 3), 14.252); //astronom. winter
    test.equal(Sim.roundNumber(Sim.getElevationAngle(new Date(2015, 5, 21, 12, 0, 0, 0), 52.3, 13.3), 3), 61.086); //astronom. summer
});