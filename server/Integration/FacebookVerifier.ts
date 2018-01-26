const axios = require('axios');

export class FacebookVerifier {
    //#region Public Methods
    public IsTokenValid(token: string): Promise<any> {
        return new Promise((resolve, reject) => {

            let endPoint = "https://graph.facebook.com/debug_token?input_token=" + token;
            endPoint += "&access_token=" + process.env.FACEBOOK_APP_ID + "|" + process.env.FACEBOOK_APP_SECRET_ID;

            axios.get(endPoint)
                .then(function (response) {

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
                .catch(function (error) {
                    reject(error.response.data.error);
                });
        });
    }
    //#endregion
}