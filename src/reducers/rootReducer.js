import { combineReducers } from 'redux';
import LoginReducer from './loginReducer';
import HomeReducer from './homeReducer';
import NotiReducer from './notiReducer';
import AccountReducer from './accountReducer';
import BillReducer from './billReducer';



export default combineReducers({
    loginReducer: LoginReducer,
    homeReducer: HomeReducer,
    notiReducer: NotiReducer,
    accountReducer: AccountReducer,
    billReducer: BillReducer,
})