const DEFAULT_STATE = {
    accountInfo:null,
    rechargePhoneService:null,
}
export default (state = DEFAULT_STATE, action) => {
    switch (action.type) {

        case 'GET_ACCOUNT_INFO_SUCCESS': {
            return {
                ...state,
               accountInfo:action.payload.accountData
            }
        }
        case 'GET_ACCOUNT_INFO_FAIL': {
            return {


            }
        }
        case 'GET_RECHARGE_PHONE_SERVICE_SUCCESS': {
            return {
                ...state,
                rechargePhoneService:action.payload.phoneServiceData
            }
        }
        case 'GET_RECHARGE_PHONE_SERVICE_FAIL': {
            return {


            }
        }


    }
    return state;
}
