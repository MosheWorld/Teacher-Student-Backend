"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
// Assign router to the express.Router() instance
var router = express_1.Router();
router.get('/', function (req, res) {
    // Reply with a hello world when no name param is provided
    res.send('Hello, World dudeaa!');
});
router.get('/:name', function (req, res) {
    // Extract the name from the request parameters
    var name = req.params.name;
    // Greet the given name
    res.send("Hello, " + name);
});
// Export the express.Router() instance to be used by server.ts
exports.WelcomeController = router;
