/**
 * One cell has 100 x 100 m.
 * The power of the sun is 1367 W / m²
 *
 *
 *
 */
sunPower = 100 * 100 * 1367;

/**
 *
 * @param date
 * @param lat
 * @returns {number} Energy of the
 */
getSunOnTop = function (date, latitude) {
    latitude = latitude || 30;
    date = date || new Date();
    return sunPower * Math.sin(toRadial(computeEquatorialCoordinate(date, latitude)));
};

/**
 * Computes beta. Beta is the angle of the sun over the horizont.
 * @param latitue
 * @returns {number}
 */
var computeEquatorialCoordinate = function (date, latitude) {
    //compute standard equinox from date (January 1, 2000, 11:58:55.816 UTC)
    var timestampSE = 946728000000; //Timestamp of standard equinox
    var n = (date.getTime()  - timestampSE) / 86400000;
    var ecliptic = 23.439 - (0.0000004 * n);

    var denominator = Math.cos(toRadial(ecliptic)) * Math.sin(toRadial(latitude));
    if(denominator>0){
        denominator += 180;
    }
    return Math.atan(denominator / Math.cos(toRadial(latitude)));
};

/**
 *
 * @param degree
 */
var toRadial = function(degree){
   return degree * (Math.PI/180);
}