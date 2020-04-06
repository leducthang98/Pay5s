import { put, takeEvery } from 'redux-saga/effects'
import getAccountInfoAPI from '../fetchAPIs/getAccountInfoAPI'
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
    } catch{
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
        console.log("saga:" + JSON.stringify(phoneServiceData.services))
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


export const homeSaga = [
    takeEvery('GET_ACCOUNT_INFO', getAccountInfo),
    takeEvery('GET_RECHARGE_PHONE_SERVICE', getRechargePhoneService)
];

