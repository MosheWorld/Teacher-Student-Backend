"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//#region Functions
/**
 * Validates whether given object is null or undefined.
 * @param { any } obj Given object.
 */
var IsObjectNullOrUndefined = function (obj) {
    if (obj === null || obj === undefined) {
        return true;
    }
    else {
        return false;
    }
};
exports.IsObjectNullOrUndefined = IsObjectNullOrUndefined;
/**
 * Validates whether given string is null or undefined or empty.
 * @param { string } str Given string.
 */
var IsStringNullOrEmpty = function (str) {
    if (str === null || str === undefined || str === '') {
        return true;
    }
    else {
        return false;
    }
};
exports.IsStringNullOrEmpty = IsStringNullOrEmpty;
