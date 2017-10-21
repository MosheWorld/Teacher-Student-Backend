const { TeacherDatabase } = require('../models/teacher');

module.exports = {
    get: async function (name) {
        if (name == null) {
            throw new Error("Model is not valid.");
        } else {
            var teacher = await TeacherDatabase.findOne({ firstname: name })
                .then((teacher) => {
                    if (teacher) {
                        return teacher;
                    } else {
                        return null;
                    }
                });
            return teacher;
        }
    },
    getall: async function () {
        var teachers = await TeacherDatabase.find({}, (err, teachers) => {
            if (teachers) {
                return teachers;
            } else {
                return null;
            }
        }).catch((error) => {
            return error.message;
        });
        return teachers;
    },
};