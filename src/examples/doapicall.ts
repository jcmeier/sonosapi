import fs from 'fs'
import Logger from '../util/logger'
import { AccessToken } from '../sonosapi/auth'
import { GroupsAPIClient, HouseHoldsAPIClient } from '../sonosapi/apiclient';
import { APIAuthenticationError } from '../errors/apierrors';

async function main() {
    const logger = Logger.getLogger();
    let tokenString = fs.readFileSync("../token.json").toString();
    let accessToken : AccessToken = JSON.parse(tokenString);
    
    const householdClient = new HouseHoldsAPIClient(accessToken);
    try {
        const households = await householdClient.getHouseHolds();
        logger.info(households);
    } catch(error) {
        if(error instanceof APIAuthenticationError) {
            logger.error("Authentication failed, could not continue");
        }
    }
}

main();
