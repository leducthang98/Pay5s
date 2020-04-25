export const md5Signature = (input) => {
    var md5 = require('md5');
    return md5(input);
}
export const getCurrentTime = () => {
    return Date.now();
}