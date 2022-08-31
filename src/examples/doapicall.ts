import fs from 'fs'
import Logger from '../util/logger'
import { AccessToken } from '../sonosapi/auth'
import { HouseHoldsAPIClient } from '../sonosapi/apiclient';

const logger = Logger.getLogger();
let tokenString = fs.readFileSync("../token.json").toString();
let accessToken : AccessToken = JSON.parse(tokenString);

const houseHoldClient = new HouseHoldsAPIClient(accessToken);
houseHoldClient.getHouseHolds().then(households => {
    logger.info(households);
});
