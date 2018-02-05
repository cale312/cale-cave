module.exports = () => {
    const mongoose = require('mongoose');
    const mongoURL = process.env.MONGO_DB_URL || "mongodb://localhost/blogspot";
    mongoose.connect(mongoURL);

    var db = mongoose.connection;

    mongoose.Promise = global.Promise;

    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', () => {
        console.log('Database connection established!');
    });
}
