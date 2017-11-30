var env = process.env.NODE_ENV || 'development';

if (env === 'development') {
    let config = require('./config.json');
    let envConfig = config[env];
    
    Object.keys(envConfig).forEach((key) => {
        process.env[key] = envConfig[key];
    });
}