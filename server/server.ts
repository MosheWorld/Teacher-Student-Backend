import * as express from "express";
import * as bodyParser from "body-parser";
import * as path from "path";
import * as mongoose from "mongoose";

import { TeacherController } from './API/Teacher';

// Create a new express application instance
const app: express.Application = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || "mongodb://Moshe:ab456123@ds227325.mlab.com:27325/teachers", { useMongoClient: true });

// The port the express app will listen on
const port: number = process.env.PORT || 3000;

app.use('/teacher', TeacherController);

// Serve the application at the given port
app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}/`);
});