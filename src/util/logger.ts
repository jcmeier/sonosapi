import {getLogger} from 'log4js'

export default class Logger {
    public static getLogger() {
        const logger = getLogger();
        logger.level = "debug";
        return logger;
    }
}
