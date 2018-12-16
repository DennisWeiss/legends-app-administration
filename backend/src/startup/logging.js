const winston = require('winston');
require('winston-mongodb');

const appConf = require('../../app-conf');

module.exports = function() {


    //Exceptions outside of api-calls
    winston.exceptions.handle(
        new winston.transports.File({filename: 'uncaughtExceptions.log'}),
        new winston.transports.Console({
            colorize: true,
            prettyPrint: true,
})
);


//standard logging on console
    winston.add( new winston.transports.Console({
        format: winston.format.simple(),
        colorize: true,
        prettyPrint: true,
    }));


    process.on('unhandledRejection', (ex) => {
        throw ex; //let winston handle it
    });

    winston.add(new winston.transports.File({filename: 'logfile.log'}));
    winston.add(new winston.transports.MongoDB({
        db: appConf.mongoDbUrl,
        level: 'error'
    }));


    //throw new Error("Something failed during startup!");

};
