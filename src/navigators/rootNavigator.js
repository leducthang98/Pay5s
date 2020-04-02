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
import { BOTTOM_TAB, LOGIN, WALLET, RECHARGEMONEY,TRANSFERMONEY } from './RouteName';
import CheckWallet from '../containers/checkWallet';
import RechargeMoney from '../containers/rechargeMoney';
import TransferMoney from '../containers/transferMoney';
const Stack = createStackNavigator();

function RootNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={WALLET} headerMode={'none'}>
                <Stack.Screen name={LOGIN} component={LoginScreen} />
                <Stack.Screen name={BOTTOM_TAB} component={BottomTabNavigator} />
                <Stack.Screen name={WALLET} component={CheckWallet} />
                <Stack.Screen name={RECHARGEMONEY} component={RechargeMoney} />
                <Stack.Screen name={TRANSFERMONEY} component={TransferMoney} />
          
            </Stack.Navigator>
        </NavigationContainer >
    );
}
export default RootNavigator;
