/**
 * One cell has 100 x 100 m.
 * The power of the sun is 1367 W / m²
 *
 *
 *
 */
sunPower = 100 * 100 * 1367;


/**
 * converts degree to radians
 * @param degree
 * @returns {number}
 */
Sim.toRadians = function (degree) {
    return degree * (Math.PI / 180);
};

/**
 * Converts radian to degree
 * @param radians
 * @returns {number}
 */
Sim.toDegree = function (radians) {
    return radians * (180 / Math.PI);
}

/**
 * Rounds a number mathematical correct to the number of decimals
 * @param number
 * @param decimals (optional, default: 5)
 * @returns {number}
 */
Sim.roundNumber = function (number, decimals) {
    decimals = decimals || 5;
    return Math.round(number * Math.pow(10, decimals)) / Math.pow(10, decimals);
}

/**
 * Trigo for degree
 * @type {{sin: MathD.sin}}
 */
MathD = {
    sin: function (number) {
        return Sim.roundNumber(Math.sin(Sim.toRadians(number)));
    },
    cos: function (number) {
        return Sim.roundNumber(Math.cos(Sim.toRadians(number)));
    },
    tan: function (number) {
        return Sim.roundNumber(Math.tan(Sim.toRadians(number)));
    },
    asin: function (number) {
        return Sim.roundNumber(Sim.toDegree(Math.asin(number)));
    },
    acos: function (number) {
        return Sim.roundNumber(Sim.toDegree(Math.acos(number)));
    },
    atan: function (number) {
        return Sim.roundNumber(Sim.toDegree(Math.atan(number)));
    }
};
Sim.MathD = MathD


/**
 * Returns day of year of date
 * @param date
 * @param latitude
 * @param longitude
 * @returns {*|2371|1029}
 */
var getDayOfYear = function (date, latitude, longitude) {
    return moment(date).dayOfYear();
};
Sim.getDayOfYear = getDayOfYear;

/**
 * Computes days since standard equinox from date (January 1, 2000, 11:58:55.816 UTC)
 * @param date
 */
var n = function (date, latitude, longitude) {
    var timestampSE = new Date(2000, 0, 0, 10, 57, 54, 815).getTime(); //Timestamp of standard equinox
    return Math.round((date.getTime() - timestampSE) / 86400000);
}
Sim.n = n;

/**
 * Returns the equation of time. Which is relative to the day of year (dayNumber)
 * @param date
 * @param latitude
 * @param longitude
 * @returns {number}
 */
var getEOT = function (date, latitude, longitude) {
    var dayNumber = getDayOfYear(date), b = (360 * (dayNumber - 81)) / 365;
    return 9.87 * MathD.sin(2 * b) - 7.53 * MathD.cos(b) - 1.5 * MathD.sin(b);
};
Sim.getEOT = getEOT;

/**
 * Returns the ecliptic of the current date
 * @param date
 * @param latitude
 * @param longitude
 * @returns {number}
 */
var getEcliptic = function (date, latitude, longitude) {
    return 23.439 - (0.0000004 * n(date));
};
Sim.getEcliptic = getEcliptic;


/**
 * Ecliptic longitude of the sun
 * @param date
 * @param latitude
 * @param longitude
 * @returns {number}
 */
var getSunAngle = function (date, latitude, longitude) {
    /*var anomaly = (357.528 + 0.9856003 * n(date))%360, lightCorrection = (280.460 + 0.9856474 * n(date))%360;
     return anomaly + 1.915 * MathD.sin(lightCorrection) + 0.02 * MathD.sin(2 * lightCorrection);*/
    return (360 / 365) * (getDayOfYear(date) - 81); //this is way more easy...
};
Sim.getSunAngle = getSunAngle;

/**
 * Returns the current declination depending on latitude and current ecliptic
 * @param date
 * @param latitude
 * @param longitude
 */
var getDeclination = function (date, latitude, longitude) {
    var sunAngle = getSunAngle(date, latitude, longitude),
        ecliptic = getEcliptic(date, latitude, longitude);
    return MathD.asin(MathD.sin(ecliptic) * MathD.sin(sunAngle));
};
Sim.getDeclination = getDeclination;

/**
 * Returns solar time in hours depending on longitude, the equation of time and the current timezone offset
 * @param date
 * @param latitude
 * @param longitude
 * @returns {number}
 */
var getSolarTime = function (date, latitude, longitude) {
    var momentDate = moment(date), lstm = longitude + (15 - longitude % 15),
        timeOffset = 4 * (longitude - lstm) + getEOT(date, latitude, longitude), solarTime;
    momentDate.add(timeOffset, 'minutes');
    solarTime = momentDate.hour() + momentDate.minute() / 60;
    if (solarTime >= 0) {
        return solarTime;
    }
    return 24 + solarTime;
};
Sim.getSolarTime = getSolarTime;

/**
 * Hour angle is the angle of the sun from the horizont with the south as center
 *                 Sun
 *              (O)
 *            / _
 * _________|__angle___)_______
 * @param date
 * @param latitude
 * @param longitude
 * @returns {number}
 */
var getHourAngle = function (date, latitude, longitude) {
    return 15 * (getSolarTime(date, latitude, longitude) - 12)
}
Sim.getHourAngle = getHourAngle;

/**
 * The angle of the sun over the horizont.
 * @param latitue
 * @returns {number}
 */
var getElevationAngle = function (date, latitude, longitude) {
    var declination = getDeclination(date, latitude, longitude),
        hourAngle = getHourAngle(date, latitude, longitude);
    return MathD.asin(MathD.cos(declination) * MathD.cos(hourAngle) * MathD.cos(latitude) + MathD.sin(declination) * MathD.sin(latitude));
};
Sim.getElevationAngle = getElevationAngle;


/**
 * Returns the suns power on a location at a certain time
 * @param date
 * @param lat
 * @returns {number} Energy of the
 */
Sim.getSun = function (date, latitude, longitude) {
    latitude = latitude || 30;
    date = date || new Date();
    var elevationAngel = Sim.getElevationAngle(date, latitude, longitude);
    //if angle is <0 => night -> no sun
    if(elevationAngel<0){
        return 0;
    }
    return sunPower * Math.sin(elevationAngel);
};