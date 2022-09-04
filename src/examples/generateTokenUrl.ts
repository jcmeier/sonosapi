
import { AuthTokenGenerator } from '../sonosapi/auth'
import getEnvParameter from '../util/env';
import Logger from '../util/logger'

async function main() {
    const logger = Logger.getLogger();

    let clientCredentialKey = getEnvParameter("CLIENT_CREDENTIALS_KEY");
    let redirectUrl =getEnvParameter("REDIRECT_URL");

    let auth = new AuthTokenGenerator(clientCredentialKey, redirectUrl);
    logger.debug(`Click this link: ${auth.generateAuthTokenUrl()}`);

}

main();
