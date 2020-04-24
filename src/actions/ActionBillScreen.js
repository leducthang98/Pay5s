export function getBill(payload) {
    return ({
        type: "GET_BILL",
        payload
    })
}

export function setPhoneNumberForRecharge(phoneNumber){
    return ({
        type: 'SET_PHONE_NUMBER',
        phoneNumber
    })
}
