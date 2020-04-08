const DEFAULT_STATE = {
    accountInfo: null,
    rechargePhoneService: null,
    commonConfigData: null,
}
export default (state = DEFAULT_STATE, action) => {
    switch (action.type) {

        case 'GET_ACCOUNT_INFO_SUCCESS': {
            return {
                ...state,
                accountInfo: action.payload.accountData
            }
        }
        case 'GET_ACCOUNT_INFO_FAIL': {
            return {


            }
        }
        case 'GET_RECHARGE_PHONE_SERVICE_SUCCESS': {
            return {
                ...state,
                rechargePhoneService: action.payload.phoneServiceData
            }
        }
        case 'GET_RECHARGE_PHONE_SERVICE_FAIL': {
            return {


            }
        }
        case 'GET_COMMON_CONFIG_SUCCESS': {
            return {
                ...state,
                commonConfigData: action.payload.commonConfigData
            }
        }
        case 'GET_COMMON_CONFIG_FAIL': {
            return {


            }
        }


    }
    return state;
}
