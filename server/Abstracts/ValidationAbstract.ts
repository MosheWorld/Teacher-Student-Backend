//#region Functions
/**
 * Validates whether given object is null or undefined.
 * @param { any } obj Given object.
 */
const IsObjectNullOrUndefined = (obj: any) => {
    if (obj === null || obj === undefined) {
        return true;
    } else {
        return false;
    }
}

/**
 * Validates whether given string is null or undefined or empty.
 * @param { string } str Given string.
 */
const IsStringNullOrEmpty = (str: string) => {
    if (str === null || str === undefined || str === '') {
        return true;
    } else {
        return false;
    }
}
//#endregion

export { IsObjectNullOrUndefined, IsStringNullOrEmpty };