import * as express from "express";
import * as mongoose from "mongoose";
import * as bodyParser from "body-parser";

import { ImageController } from './API/Image';
import { TeacherController } from './API/Teacher';
import { ContactUsController } from './API/ContactUs';

import DataBaseConnector from './Models/IPMonitorModel';

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || 'mongodb://Moshe:ab123456@ds133465.mlab.com:33465/teacher-student-database', { useMongoClient: true });

// Create a new express application instance.
const app: express.Application = express();
app.use(bodyParser.json({ limit: '1mb' }));
app.use(bodyParser.urlencoded({ limit: '1mb', extended: true }));

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    InsertIP(req);
    next();
});

// The port the express app will listen on.
const port: number = process.env.PORT || 8000;

//#region Routers
app.use('/image', ImageController);
app.use('/teacher', TeacherController);
app.use('/contactus', ContactUsController);
//#endregion

function InsertIP(req) {
    return new Promise((resolve, reject) => {
        let d = new Date,
            dformat = [d.getDate(), d.getMonth() + 1, d.getFullYear()].
                join('/') + ' ' + [d.getHours(), d.getMinutes(), d.getSeconds()].join(':');

        let data = {
            "ip": req.headers['x-forwarded-for'] || req.connection.remoteAddress,
            "path": req.originalUrl,
            "date": dformat.toString(),
            "subdomains": req.subdomains
        };
        
        DataBaseConnector.collection.insert(data, (error) => { resolve(); });
    });
}

// Serve the application at the given port.
app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}/`);
});