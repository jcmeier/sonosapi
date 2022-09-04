import fs from 'fs'
import Logger from '../util/logger'
import { AccessToken } from '../sonosapi/auth'
import { GroupsAPIClient, HouseHoldsAPIClient, PlaybackClient } from '../sonosapi/apiclient';
import { APIAuthenticationError } from '../errors/apierrors';

async function main() {
    const logger = Logger.getLogger();
    let tokenString = fs.readFileSync("../token.json").toString();
    let accessToken : AccessToken = JSON.parse(tokenString);
    
    const householdClient = new HouseHoldsAPIClient(accessToken);
    try {
        const households = await householdClient.getHouseHolds();
        const householdId = households.households[0].id;

        const groupsClient = new GroupsAPIClient(accessToken);
        let groups = await groupsClient.getGroups(householdId);
        if(groups.groups == null) {
            return;
        }

        const playbackClient = new PlaybackClient(accessToken);
        const promises = groups.groups.map( g => {
           return playbackClient.getPlayback(g.id);
        });

        Promise.all(promises).then(results => {
            results.forEach(playback => {
                logger.info(playback);
                logger.info("----");
            });
        });

    } catch(error) {
        if(error instanceof APIAuthenticationError) {
            logger.error("Authentication failed, could not continue");
        }
    }
}


main();
