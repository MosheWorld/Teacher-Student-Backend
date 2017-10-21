var mongoose = require('mongoose');

/* Schema of the model at the database */
var TeacherSchema = new mongoose.Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true }
});

/* Exporting model outside the file */
var TeacherDatabase = mongoose.model('Teacher', TeacherSchema);
module.exports = { TeacherDatabase };