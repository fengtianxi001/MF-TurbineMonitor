const os = require("os");
function fetchIp() {
    var interfaces = os.networkInterfaces();
    for (var devName in interfaces) {
        var iface = interfaces[devName];
        for (var i = 0; i < iface.length; i++) {
            var alias = iface[i];
            if (alias.family === "IPv4" && alias.address !== "127.0.0.1" && ! alias.internal) {
                return alias.address;
            }
        }
    }
}
function randomNumber(unit = 100) {
    return Math.round(Math.random() * unit)
}
exports.fetchIp = fetchIp
exports.randomNumber = randomNumber

