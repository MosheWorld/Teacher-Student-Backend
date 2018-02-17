"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var axios = require('axios');
var GoogleVerifier = /** @class */ (function () {
    function GoogleVerifier() {
    }
    //#region Public Methods
    GoogleVerifier.prototype.IsTokenValid = function (token) {
        return new Promise(function (resolve, reject) {
            var endPoint = "";
            reject(false);
        });
    };
    return GoogleVerifier;
}());
exports.GoogleVerifier = GoogleVerifier;
