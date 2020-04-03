import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../containers/LoginScreen';
import BottomTabNavigator from './BottomTabNavigator';
import { BOTTOM_TAB, LOGIN, WALLET, RECHARGEMONEY, TRANSFERMONEY, RECHARGEPHONE } from './RouteName';
import CheckWallet from '../containers/CheckWallet';
import RechargeMoney from '../containers/RechargeMoney';
import TransferMoney from '../containers/TransferMoney';
import RechargePhone from '../containers/RechargePhone';
const Stack = createStackNavigator();

function RootNavigator() {
    return (
        <NavigationContainer >
            <Stack.Navigator initialRouteName={BOTTOM_TAB} headerMode={'none'} >
                <Stack.Screen name={LOGIN} component={LoginScreen} />
                <Stack.Screen name={BOTTOM_TAB} component={BottomTabNavigator} />
                <Stack.Screen name={WALLET} component={CheckWallet} />
                <Stack.Screen name={RECHARGEMONEY} component={RechargeMoney} />
                <Stack.Screen name={TRANSFERMONEY} component={TransferMoney} />
                <Stack.Screen name={RECHARGEPHONE} component={RechargePhone} />
            </Stack.Navigator>
        </NavigationContainer >
    );
}
export default RootNavigator;
a