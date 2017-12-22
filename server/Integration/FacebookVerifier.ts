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
}