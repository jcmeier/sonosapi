import { exit } from 'process';
import Logger from './logger'

export default function getEnvParameter(envParameterName : string)  : string{
    let value = process.env[envParameterName];
    if(value == null) {
        Logger.getLogger().error(`The env variable ${envParameterName} is not set!`);
        exit(1);
    }
    return value;
}