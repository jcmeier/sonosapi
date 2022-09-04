import axios, { AxiosError, AxiosResponse } from "axios";
import { access } from "fs";
import Logger from "../util/logger";
import { AccessToken } from "./auth";
import { APIAuthenticationError } from "../errors/apierrors"

abstract class SonosControlAPIClient {
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

export class HouseHoldsAPIClient extends SonosControlAPIClient {
    public async getHouseHolds() : Promise<Households[]> {
        let response = await super.getCall("households");
        return response.data as Households[]
    }
}

export class GroupsAPIClient extends SonosControlAPIClient {
    public async getGroups(householdId : string) : Promise<Households> {
        let response = await super.getCall("households");
        return response.data as Households
    }
}