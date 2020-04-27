export function getBill(payload) {
    return ({
        type: "GET_BILL",
        payload
    })
}

export function setPhoneNumberForRecharge(payload){
    return ({
        type: 'SET_PHONE_NUMBER',
        payload
    })
}
