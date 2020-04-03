import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../containers/loginScreen';
import BottomTabNavigator from './BottomTabNavigator';
import {
    StyleSheet,
    View,
    Dimensions
} from 'react-native';
import { BOTTOM_TAB, LOGIN, WALLET, RECHARGEMONEY, TRANSFERMONEY, RECHARGEPHONE } from './RouteName';
import CheckWallet from '../containers/checkWallet';
import RechargeMoney from '../containers/rechargeMoney';
import TransferMoney from '../containers/transferMoney';
import RechargePhone from '../containers/rechargePhone';
const Stack = createStackNavigator();

function RootNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={BOTTOM_TAB} headerMode={'none'}>
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
