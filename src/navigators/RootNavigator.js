import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import InitNotiScreen from '../screens/notification/InitNotiScreen';
import LoginScreen from '../screens/LoginScreen';
import BottomTabNavigator from './BottomTabNavigator';
import { BOTTOM_TAB, LOGIN, WALLET, RECHARGEMONEY, TRANSFERMONEY, RECHARGEPHONE, REGISTER, OTP, INITNOTIFICATION, ACCOUNTINFO } from './RouteName';
import CheckWallet from '../screens/check_wallet/CheckWallet';
import RechargeMoney from '../screens/RechargeMoney';
import TransferMoney from '../screens/TransferMoney';
import RechargePhone from '../screens/recharge_phone/RechargePhone';
import RegisterScreen from '../screens/RegisterScreen'
import OTPScreen from '../screens/OTPScreen';
import AccountInfo from '../screens/account/AccountInfo';

const Stack = createStackNavigator();

function RootNavigator() {
    return (
        <NavigationContainer >
            <Stack.Navigator initialRouteName={LOGIN} headerMode={'none'} >
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
            </Stack.Navigator>
        </NavigationContainer >
    );
}
export default RootNavigator;
