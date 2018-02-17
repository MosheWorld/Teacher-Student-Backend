const axios = require('axios');

export class GoogleVerifier {
    //#region Public Methods
    /**
     * Validates whether a token is valid from google.
     * @param token Google token.
     * @returns {boolean | string} In case it's valid we'll return 'true' otherwise we'll reject and throw exception.
     */
    public IsTokenValid(token: string): Promise<any> {
        return new Promise((resolve, reject) => {

            let endPoint = "https://www.googleapis.com/oauth2/v3/tokeninfo?access_token=" + token;

            axios.get(endPoint)
                .then((response) => {
                    if (response && response.data) {
                        resolve(true);
                    } else {
                        reject("User is not authenticated.");
                    }
                })
                .catch((error) => {
                    reject(error.response.data.error_description);
                });
        });
    }

    /**
     * Returns model received from google API by given token.
     * @param token User token.
     */
    public GetUserIDByToken(token: string): Promise<any> {
        return new Promise((resolve, reject) => {

            let endPoint = "https://www.googleapis.com/oauth2/v3/tokeninfo?access_token=" + token;

            axios.get(endPoint)
                .then((response) => {
                    if (response && response.data) {
                        resolve(response.data);
                    } else {
                        reject("User is not authenticated.");
                    }
                })
                .catch((error) => {
                    reject(error.response.data.error_description);
                });
        });
    }
    //#endregion
}