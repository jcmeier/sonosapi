
import axios, { AxiosError } from 'axios'
import { execPath } from 'process';
import Logger from '../util/logger';
import url from "url"

export class AuthTokenGenerator {
    private clientCredentialKey : string;
    private state = "TESTSTATE";
    private redirectUrl : string;

    constructor(clientCrediantialKey : string, redirectUrl : string) {
        this.clientCredentialKey = clientCrediantialKey;
        this.redirectUrl = redirectUrl;
    }
    
    public generateAuthTokenUrl() {
        return `https://api.sonos.com/login/v3/oauth?client_id=${this.clientCredentialKey}` +
            `&response_type=code` + 
            `&state=${this.state}` + 
            `&scope=playback-control-all` + 
            `&redirect_uri=${this.redirectUrl}`;
    }

}

export class Authorization {
    private authKey : string;
    private authSecret : string;
    private authCode : string;
    private redirectUrl : string;
    private logger = Logger.getLogger();
    private accessToken? : AccessToken;

    constructor(authKey : string, authSecret : string, authCode : string, redirectUrl : string) {
        this.authKey = authKey;
        this.authSecret = authSecret;
        this.authCode = authCode;
        this.redirectUrl = redirectUrl;
    }

    async generateAccessToken() {
        try {
            let data = new url.URLSearchParams({
                grant_type: "authorization_code",
                code: this.authCode,
                redirect_uri: this.redirectUrl
            }).toString()

            let authorization = Buffer.from(`${this.authKey}:${this.authSecret}`).toString("base64")
            let config = {
                headers: {
                    Authorization: `Basic ${authorization}`,
                    "Content-type": 'application/x-www-form-urlencoded'
                }
            }
            await axios.post("https://api.sonos.com/login/v3/oauth/access", data, config).then(response => {
                this.accessToken = response.data;
            });

        } catch(error : any | AxiosError) {
            if (axios.isAxiosError(error)) {
                if(error.response != null) {
                    this.logger.error(`Error authenticating: httpStatus=${error.response.status}: ${JSON.stringify(error.response.data)}`)
                }
                return;
            } 
            
            throw error;
        } 
             
    }

    public getAccessToken() : AccessToken | undefined {
       return this.accessToken
    }
}

export interface AccessToken {
    access_token : string;
    token_type : string;
    expires_in : number;
    refresh_token : string;
    scope : string
}