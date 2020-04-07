import { all } from 'redux-saga/effects';
import { homeSaga } from './HomeSaga';
import { notiSaga } from './NotiSaga';
import { accountSaga } from './AccountSaga';
import { loginSaga } from './LoginSaga';
import { billSaga } from './BillSaga';
function* rootSaga() {
    yield all([
        ...homeSaga,
        ...billSaga,
    ]);
}
export default rootSaga;
