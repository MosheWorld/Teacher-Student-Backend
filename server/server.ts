require("./Config/Config");

import * as express from "express";
import * as mongoose from "mongoose";
import * as bodyParser from "body-parser";

import { AuthController } from "./API/Auth";
import { ImageController } from './API/Image';
import { TeacherController } from './API/Teacher';
import { ContactUsController } from './API/ContactUs';

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI, { useMongoClient: true });

// Create a new express application instance.
const app: express.Application = express();

app.use(bodyParser.json({ limit: '1mb' }));
app.use(bodyParser.urlencoded({ limit: '1mb', extended: true }));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

//#region Routers
app.use('/auth', AuthController);
app.use('/image', ImageController);
app.use('/teacher', TeacherController);
app.use('/contactus', ContactUsController);
//#endregion

// Serve the application at the given port.
app.listen(process.env.PORT, () => {
    console.log("Running on port: " + process.env.PORT + ".");
});