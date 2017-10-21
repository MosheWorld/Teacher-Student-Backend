var TeacherLogic = require('../Logic/Teacher');

module.exports = function (app) {

    app.get('/teacher/getall/', (req, res) => {
        TeacherLogic.getall()
            .then((teachers) => {
                res.json(teachers);
            }).catch((error) => {
                res.status(404).send(error.message);
            });
    });

    app.get('/teacher/get/:name', (req, res) => {
        var name = req.params.name;

        if (name == null) {
            res.status(404).send("Name is null or empty");
        }

        TeacherLogic.get(name)
            .then((teachers) => {
                if (teachers) {
                    res.json(teachers);
                } else {
                    res.status(404).send("Name wasn't found.");
                }
            }).catch((error) => {
                res.status(404).send(error.message);
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