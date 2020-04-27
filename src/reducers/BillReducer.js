const DEFAULT_STATE = {
    bills:null,
    phoneNumberForRecharge:null
}
export default (state = DEFAULT_STATE, action) => {
    switch (action.type) {

        case 'GET_BILL_SUCCESS': {
            console.log('billReducer:'+action.payload.bills)
            return {
                ...state,
                bills:action.payload.bills
            }
        }
        case 'REFRESH_STORE': {
            return {
                bills:null
            }
        }
        case 'GET_BILL_FAIL': {
            return {


            }
        }
        case 'SET_PHONE_NUMBER': {
            return {
                ...state,
                phoneNumberForRecharge: action.payload
            }
        }
    }
    return state;
}
