import fs from 'fs'
import { AccessToken, Authorization } from "../sonosapi/auth";
import getEnvParameter from "../util/env";
import Logger from "../util/logger";

const authSecret = getEnvParameter("AUTH_SECRET");
const authCode = getEnvParameter("AUTH_CODE");

const logger = Logger.getLogger();
let tokenString = fs.readFileSync("token.json").toString();
let accessToken : AccessToken = JSON.parse(tokenString);

logger.info(accessToken.expires_in)