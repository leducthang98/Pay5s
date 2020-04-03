import { all } from 'redux-saga/effects';
import { homeSaga } from './HomeSaga';
import { notiSaga } from './NotiSaga';
import { accountSaga } from './AccountSaga';
import { loginSaga } from './LoginSaga';
function* rootSaga() {
    yield all([
        
    ]);
}
export default rootSaga;a