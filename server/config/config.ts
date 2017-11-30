var env = process.env.NODE_ENV || 'development';

if (env === 'development') {
    process.env.PORT = 8000;
    process.env.MONGODB_URI = 'mongodb://Moshe:ab123456@ds133465.mlab.com:33465/teacher-student-database';
} else {
    process.env.MONGODB_URI = 'mongodb://Moshe:ab123456@ds133465.mlab.com:33465/teacher-student-database';
}