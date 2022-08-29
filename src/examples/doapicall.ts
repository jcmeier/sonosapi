import fs from 'fs'
import Logger from '../util/logger'
import { AccessToken } from '../sonosapi/auth'

const logger = Logger.getLogger();
let tokenString = fs.readFileSync("token.json").toString();
let accessToken : AccessToken = JSON.parse(tokenString);

logger.info(accessToken.expires_in)