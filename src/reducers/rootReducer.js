import { combineReducers } from 'redux';
import LoginReducer from './LoginReducer';
import HomeReducer from './HomeReducer';
import NotiReducer from './NotiReducer';
import AccountReducer from './AccountReducer';
import BillReducer from './BillReducer';



export default combineReducers({
    loginReducer: LoginReducer,
    homeReducer: HomeReducer,
    notiReducer: NotiReducer,
    accountReducer: AccountReducer,
    billReducer: BillReducer,
})