const express = require('express');
const bodyParser = require('body-parser');

var { mongoose } = require('./DAL/mongoose.js');

const port = process.env.PORT || 3000;
const app = express();
app.use(bodyParser.json());

require('./API/TeacherRoute')(app);

/* Listening to HTTP Requests on the defined port */
app.listen(port, () => {
    console.log("Server running on port:" + port);
});