const env = process.env.NODE_ENV || 'development';

//#region On Init Function
if (env === 'development') {
    let config = require('./Config.json');
    let envConfig = config[env];

    Object.keys(envConfig).forEach((key) => {
        process.env[key] = envConfig[key];
    });
}
//#endregion