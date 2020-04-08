export function getAccountInfo(payload) {
    return ({
        type: "GET_ACCOUNT_INFO",
        payload
    })
    
}
export function getRechargePhoneService(payload) {
    return ({
        type: "GET_RECHARGE_PHONE_SERVICE",
        payload
    })
    
}
export function getCommonConfig(payload) {
    return ({
        type: "GET_COMMON_CONFIG",
        payload
    })
    
}