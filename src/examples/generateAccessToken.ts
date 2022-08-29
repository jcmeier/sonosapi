import { Authorization } from "../sonosapi/auth";
import getEnvParameter from "../util/env";
import fs from 'fs'

const authKey = getEnvParameter("AUTH_KEY");
const authSecret = getEnvParameter("AUTH_SECRET");
const authCode = getEnvParameter("AUTH_CODE");
const redirectUrl = getEnvParameter("REDIRECT_URL");

const auth = new Authorization(authKey, authSecret, authCode, redirectUrl);
auth.generateAccessToken().then(() => {
    let token = auth.getAccessToken();
    fs.writeFileSync("token.json", JSON.stringify(token));
});