import { put, takeEvery } from 'redux-saga/effects'
import getAccountInfoAPI from '../fetchAPIs/getAccountInfoAPI'
import getCommonConfigAPI from '../fetchAPIs/getCommonConfigAPI'
import getRechargePhoneServiceAPI from '../fetchAPIs/getRechargePhoneServiceAPI'
//account
function* getAccountInfo(action) {
    try {
        let accountInfoPayback = yield getAccountInfoAPI();
        let accountData = accountInfoPayback.data;
        yield put({
            type: 'GET_ACCOUNT_INFO_SUCCESS',
            payload: { accountData }
        })
    } catch(error){
        console.log(error.message)
        yield put({
            type: 'GET_ACCOUNT_INFO_FAIL',
            payload: {}
        })
    }
}
//services
function* getRechargePhoneService(action) {
    try {
        let servicePayback = yield getRechargePhoneServiceAPI();
        phoneServiceData = servicePayback.data;
        yield put({
            type: 'GET_RECHARGE_PHONE_SERVICE_SUCCESS',
            payload: { phoneServiceData }
        })
    } catch{
        yield put({
            type: 'GET_RECHARGE_PHONE_SERVICE_FAIL',
            payload: {}
        })
    }
}
//common configs
function* getCommonConfig(action) {
    try {
        let commonConfigPayback = yield getCommonConfigAPI();
        commonConfigData = commonConfigPayback.data;
        yield put({
            type: 'GET_COMMON_CONFIG_SUCCESS',
            payload: { commonConfigData }
        })
    } catch{
        yield put({
            type: 'GET_COMMON_CONFIG_FAIL',
            payload: {}
        })
    }
}


export const homeSaga = [
    takeEvery('GET_ACCOUNT_INFO', getAccountInfo),
    takeEvery('GET_RECHARGE_PHONE_SERVICE', getRechargePhoneService),
    takeEvery('GET_COMMON_CONFIG', getCommonConfig),
];

