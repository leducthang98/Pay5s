import { put, takeEvery } from 'redux-saga/effects';
import getBillAPI from '../fetchAPIs/getBillAPI'
function* getBill(action) {
    try {
        let bills = yield getBillAPI(action.payload);
        yield put({
            type: 'GET_BILL_SUCCESS',
            payload: { bills }
        })
    } catch{
        yield put({
            type: 'GET_BILL_FAIL',
            payload: {}
        })
    }
}

export const billSaga = [
    takeEvery('GET_BILL', getBill),

];
