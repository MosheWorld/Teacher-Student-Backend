const { TeacherDatabase } = require('../models/teacher');
const _ = require('lodash');

module.exports = function (app) {

    app.get('/teacher/getall/', (req, res) => {
        TeacherDatabase.find({}, (err, teachers) => {
            res.json(teachers);
        });
    });

    app.get('/teacher/get/:name', (req, res) => {
        var name = req.params.name;

        TeacherDatabase.findOne({ firstname: name })
            .then((response) => {
                if (response) {
                    res.json(response);
                } else {
                    res.send("Not found.");
                }
            });
    });


    app.get('/teacher/create', (req, res) => {
        var Teacher = new TeacherDatabase({ firstname: 'Moshe', lastname: 'Binieli' });
        Teacher.save()
            .then((success) => {
                res.send(success);
            }, (error) => {
                res.status(400).send(error);
            });
    });

}