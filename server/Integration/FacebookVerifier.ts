const axios = require('axios');

export class FacebookVerifier {
    //#region Public Methods
    public IsTokenValid(token: string): Promise<any> {
        return new Promise((resolve, reject) => {
            axios.get('https://graph.facebook.com/oauth/access_token_info?client_id=' + process.env.FACEBOOK_CLIENT_ID + '&access_token=' + token)
                .then(function (response) {
                    resolve(response.data);
                })
                .catch(function (error) {
                    reject(error.response.data.error);
                });
        });
    }
    //#endregion

    // Comments for app developer to implement new token authentication with facebook.

    // https://stackoverflow.com/questions/3845151/is-there-a-way-to-check-if-facebook-access-token-is-still-valid/48453014#48453014
    // graph.facebook.com/debug_token?
    // input_token = { token-to - inspect }
    // & access_token={ app_id }| { app_secret }
}