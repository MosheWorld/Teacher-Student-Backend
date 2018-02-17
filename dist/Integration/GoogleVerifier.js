"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var axios = require('axios');
var GoogleVerifier = /** @class */ (function () {
    function GoogleVerifier() {
    }
    //#region Public Methods
    /**
     * Validates whether a token is valid from google.
     * @param token Google token.
     * @returns {boolean | string} In case it's valid we'll return 'true' otherwise we'll reject and throw exception.
     */
    GoogleVerifier.prototype.IsTokenValid = function (token) {
        return new Promise(function (resolve, reject) {
            var endPoint = "https://www.googleapis.com/oauth2/v3/tokeninfo?access_token=" + token;
            axios.get(endPoint)
                .then(function (response) {
                if (response && response.data) {
                    resolve(true);
                }
                else {
                    reject("User is not authenticated.");
                }
            })
                .catch(function (error) {
                reject(error.response.data.error_description);
            });
        });
    };
    return GoogleVerifier;
}());
exports.GoogleVerifier = GoogleVerifier;
