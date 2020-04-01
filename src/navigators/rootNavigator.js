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
import {BOTTOM_TAB, LOGIN} from './RouteName';
const Stack = createStackNavigator();

function RootNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={LOGIN} headerMode={'none'}>
                <Stack.Screen name={LOGIN} component={LoginScreen} />
                <Stack.Screen name={BOTTOM_TAB} component={BottomTabNavigator} />
            </Stack.Navigator>
        </NavigationContainer >
    );
}
export default RootNavigator;
