import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../containers/loginScreen';
import HomeNavigator from './homeNavigator';
import {
    StyleSheet,
    View,
    Dimensions
} from 'react-native';
const Stack = createStackNavigator();

function RootNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home"
                screenOptions={{
                    headerShown: false
                }}>
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Home" component={HomeNavigator} />
            </Stack.Navigator>
        </NavigationContainer >
    );
}
export default RootNavigator;