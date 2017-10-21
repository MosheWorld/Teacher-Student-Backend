const express = require('express');
const bodyParser = require('body-parser');
var { mongoose } = require('./DataBaseConnection/mongoose.js');

const app = express();
app.use(bodyParser.json());

const port = process.env.PORT || 3000;

require('./API/Teacher')(app);

/* Listening to HTTP Requests on the defined port */
app.listen(port, () => {
    console.log("Server running on port:" + port);
});