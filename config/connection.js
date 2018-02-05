module.exports = () => {
    const mongoose = require('mongoose');
    const mongoURL = process.env.MONGO_DB_URL || "mongodb://localhost/blogspot";
    const chalk = require('chalk');
    const log = console.log;
    mongoose.connect(mongoURL);

    var db = mongoose.connection;

    mongoose.Promise = global.Promise;

    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', () => {
        log(chalk.yellow('=====>\nDatabase connection established!'));
    });
}
