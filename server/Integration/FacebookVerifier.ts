const axios = require('axios');

export class FacebookVerifier {
    //#region Public Methods.
    /**
     * Validates whether a token is valid from facebook.
     * @param token Facebook token.
     * @returns {boolean | string} In case it's valid we'll return 'true' otherwise we'll reject and throw exception.
     */
    public IsTokenValid(token: string): Promise<any> {
        return new Promise((resolve, reject) => {

            let endPoint = "https://graph.facebook.com/debug_token?input_token=" + token;
            endPoint += "&access_token=" + process.env.FACEBOOK_APP_ID + "|" + process.env.FACEBOOK_APP_SECRET_ID;

            axios.get(endPoint)
                .then((response) => {

                    if (response && response.data && response.data.data && response.data.data.is_valid === true) {
                        resolve(true);
                    }
                    else if (response && response.data && response.data.data && response.data.data.is_valid === false) {
                        if (response.data.data.error) {
                            reject(response.data.data.error.message);
                        } else {
                            reject("User is not authenticated.");
                        }
                    } else {
                        reject("Something went wrong when validating facebook token.");
                    }

                })
                .catch((error) => {
                    reject(error.response.data.error);
                });
        });
    }

    /**
     * Returns model received from facebook API by given token.
     * @param token User token.
     */
    public GetUserIDByToken(token: string): Promise<any> {
        return new Promise((resolve, reject) => {

            let endPoint = "https://graph.facebook.com/debug_token?input_token=" + token;
            endPoint += "&access_token=" + process.env.FACEBOOK_APP_ID + "|" + process.env.FACEBOOK_APP_SECRET_ID;

            axios.get(endPoint)
                .then((response) => {
                    if (response && response.data && response.data.data && response.data.data.is_valid === true) {
                        resolve(response.data);
                    }
                    else {
                        reject("User is not authenticated.");
                    }
                })
                .catch((error) => {
                    reject(error.response.data.error);
                });
        });
    }
    //#endregion
}