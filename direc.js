//jshint esversion:6

// module to find the direction of the wind given degrees
exports.findDirec = (deg) => {
    let windDir;

    if (deg == 0) {
        windDir = "North";
    } else if (deg > 0 && deg < 90) {
        windDir = "North-East";
    } else if (deg == 90) {
        windDir = "East";
    } else if (deg > 90 && deg < 180) {
        windDir = "South-East";
    } else if (deg == 180) {
        windDir = "South";
    } else if (deg > 180 && deg < 270) {
        windDir = "South-West";
    } else if (deg == 270) {
        windDir = "West";
    } else if (deg > 270 && deg < 360) {
        windDir = "North-West";
    } else {
        windDir = deg;
    }

    return windDir;
};
