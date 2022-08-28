import axios, { AxiosError } from "axios";
import { access } from "fs";
import Logger from "../util/logger";
import { AccessToken } from "./auth";

abstract class SonosControlAPIClient {
    private accessToken : AccessToken;
    private url = "https://api.ws.sonos.com/control/api/v1";
    private logger = Logger.getLogger();

    constructor(accessToken : AccessToken) {
        this.accessToken = accessToken;
    }

    getCall(endpoint : String) : Promise<any> {
        try {
            let config = {
                headers: {
                    Authorization: `Bearer ${this.accessToken.access_token}`,
                    "Content-type": 'application/json'
                }
            }
            return axios.get(`${this.url}/${endpoint}`, config);
        
        } catch(error : any | AxiosError) {
            if (axios.isAxiosError(error)) {
                if(error.response != null) {
                    this.logger.error(`Error calling sonos API: httpStatus=${error.response.status}: ${JSON.stringify(error.response.data)}`)
                }
            } 
            
            throw error;
        } 

    }
}

class HouseHoldsAPIClient extends SonosControlAPIClient {
    public getHouseHolds() {
        super.getCall("households");
    }
}