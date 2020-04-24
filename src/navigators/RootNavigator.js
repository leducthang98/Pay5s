import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import InitNotiScreen from '../screens/notification/InitNotiScreen';
import LoginScreen from '../screens/LoginScreen';
import BottomTabNavigator from './BottomTabNavigator';
import {
    BOTTOM_TAB,
    LOGIN,
    WALLET,
    RECHARGEMONEY,
    TRANSFERMONEY,
    RECHARGEPHONE,
    REGISTER,
    OTP,
    INITNOTIFICATION,
    ACCOUNTINFO,
    BEGIN,
    EDITACCOUNT,
<<<<<<< HEAD
    CHECK_WALLET_HISTORY, 
    TRANSFER_PREPAID_ACCOUNT, 
    CHECK_WALLET_INFO,
    CONTACT_LIST
=======
    CHECK_WALLET_HISTORY, TRANSFER_PREPAID_ACCOUNT, CHECK_WALLET_INFO, FORGET_PASSWORD, OTP_FORGET_PASSWORD, TRANS_PASSWORD_SCREEN, CREATE_TRANS_PASSWORD,
>>>>>>> c5c743b492067cd65d2b72912c8ae62bb3c30dba
} from './RouteName';
import CheckWallet from '../screens/check_wallet/CheckWallet';
import RechargeMoney from '../screens/RechargeMoney';
import TransferMoney from '../screens/TransferMoney';
import RechargePhone from '../screens/recharge_phone/RechargePhone';
import RegisterScreen from '../screens/RegisterScreen'
import OTPScreen from '../screens/OTPScreen';
import AccountInfo from '../screens/account/AccountInfo';
import AsyncStorage from '@react-native-community/async-storage';
import SplashScreen from '../screens/SplashScreen';
import EditAccount from '../screens/account/EditAccount';
import CheckWalletHistory from '../screens/check_wallet/CheckWalletHistory';
import CheckWalletInfo from '../screens/check_wallet/CheckWalletInfo';
<<<<<<< HEAD
import ContactList from '../screens/recharge_phone/ContactList';

=======
import ForgetPassword from '../screens/forget_password/ForgetPassword';
import OTPForgetPassword from '../screens/forget_password/OTPForgetPassword';
import TransPasswordScreen from '../screens/transaction_password/TransPasswordScreen';
import CreateTransPassword from '../screens/transaction_password/CreateTransPassword';
>>>>>>> c5c743b492067cd65d2b72912c8ae62bb3c30dba
const Stack = createStackNavigator();

function RootNavigator() {
    return (
        <NavigationContainer >
            <Stack.Navigator initialRouteName={BEGIN} headerMode={'none'} >
                <Stack.Screen name={BEGIN} component={SplashScreen} />
                <Stack.Screen name={LOGIN} component={LoginScreen} />
                <Stack.Screen name={BOTTOM_TAB} component={BottomTabNavigator} />
                <Stack.Screen name={WALLET} component={CheckWallet} />
                <Stack.Screen name={RECHARGEMONEY} component={RechargeMoney} />
                <Stack.Screen name={TRANSFERMONEY} component={TransferMoney} />
                <Stack.Screen name={RECHARGEPHONE} component={RechargePhone} />
                <Stack.Screen name={REGISTER} component={RegisterScreen} />
                <Stack.Screen name={OTP} component={OTPScreen} />
                <Stack.Screen name={INITNOTIFICATION} component={InitNotiScreen} />
                <Stack.Screen name={ACCOUNTINFO} component={AccountInfo} />
                <Stack.Screen name={EDITACCOUNT} component={EditAccount} />
                <Stack.Screen name={CHECK_WALLET_HISTORY} component={CheckWalletHistory} />
                <Stack.Screen name={CHECK_WALLET_INFO} component={CheckWalletInfo} />
<<<<<<< HEAD
                <Stack.Screen name={CONTACT_LIST} component={ContactList} />
=======
                <Stack.Screen name={FORGET_PASSWORD} component={ForgetPassword} />
                <Stack.Screen name={OTP_FORGET_PASSWORD} component={OTPForgetPassword} />
                <Stack.Screen name={TRANS_PASSWORD_SCREEN} component={TransPasswordScreen} />
                <Stack.Screen name={CREATE_TRANS_PASSWORD} component={CreateTransPassword} />
>>>>>>> c5c743b492067cd65d2b72912c8ae62bb3c30dba
            </Stack.Navigator>
        </NavigationContainer >
    );
}
export default RootNavigator;
