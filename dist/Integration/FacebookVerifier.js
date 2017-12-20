"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var axios = require('axios');
var FacebookVerifier = /** @class */ (function () {
    function FacebookVerifier() {
    }
    //#region Public Methods
    FacebookVerifier.prototype.IsTokenValid = function (token) {
        return new Promise(function (resolve, reject) {
            axios.get('https://graph.facebook.com/oauth/access_token_info?client_id=' + process.env.FACEBOOK_CLIENT_ID + '&access_token=' + token)
                .then(function (response) {
                resolve(response.data);
            })
                .catch(function (error) {
                reject(error.response.data.error);
            });
        });
    };
    return FacebookVerifier;
}());
exports.FacebookVerifier = FacebookVerifier;
