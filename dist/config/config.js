"use strict";
var env = process.env.NODE_ENV || 'development';
if (env === 'development') {
    var config = require('./Config.json');
    var envConfig_1 = config[env];
    Object.keys(envConfig_1).forEach(function (key) {
        process.env[key] = envConfig_1[key];
    });
}
