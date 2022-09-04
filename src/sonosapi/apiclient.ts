import axios, { AxiosError, AxiosResponse } from "axios";
import { access } from "fs";
import Logger from "../util/logger";
import { AccessToken } from "./auth";
import { APIAuthenticationError } from "../errors/apierrors"
import { Groups, Households, Playback, PlaybackMetadata } from "./models";

abstract class SonosAPIClient {
    private accessToken : AccessToken;
    private url = "https://api.ws.sonos.com/control/api/v1";
    protected logger = Logger.getLogger();

    constructor(accessToken : AccessToken) {
        this.accessToken = accessToken;
    }

    protected async getCall(endpoint : String)  {
        try {
            let config = {
                headers: {
                    Authorization: `Bearer ${this.accessToken.access_token}`,
                    "Content-type": 'application/json'
                }
            }
            return await axios.get(`${this.url}/${endpoint}`, config);
        
        } catch(error : any | AxiosError) {
            if (axios.isAxiosError(error)) {
                if(error.response != null) {
                    this.logger.error(`Error calling sonos API: httpStatus=${error.response.status}: ${JSON.stringify(error.response.data)}`)
                    if(error.response.status === 401) {
                        throw new APIAuthenticationError("Wrong access token");
                    }
                }
            } 
            
            throw error;
        } 

    }
}

export class HouseHoldsAPIClient extends SonosAPIClient {
    public async getHouseHolds() : Promise<Households> {
        let response = await super.getCall("households");
        return response.data as Households
    }
}

export class GroupsAPIClient extends SonosAPIClient {
    public async getGroups(householdId : string) : Promise<Groups> {
        let response = await super.getCall(`/households/${householdId}/groups`);
        return response.data as Groups
    }
}

export class PlaybackClient extends SonosAPIClient {
    public async getPlayback(groupId : string) : Promise<Playback> {
        let response = await super.getCall(`/groups/${groupId}/playback`);
        return response.data as Playback
    }
}

export class PlaybackMetadataClient extends SonosAPIClient {
    public async getPlaybackMetada(groupId : string ) : Promise<PlaybackMetadata> {
        let response = await super.getCall(`/groups/${groupId}/playbackMetadata`);
        return response.data as PlaybackMetadata
    }
}