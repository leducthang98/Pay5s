import { all } from 'redux-saga/effects';
import { homeSaga } from './homeSaga';
import { notiSaga } from './notiSaga';
import { accountSaga } from './accountSaga';
import { loginSaga } from './loginSaga';
function* rootSaga() {
    yield all([
        
    ]);
}
export default rootSaga;