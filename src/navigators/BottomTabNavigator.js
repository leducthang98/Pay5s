import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../containers/homeScreen';
import AccountScreen from '../containers/accountScreen';
import NotiScreen from '../containers/notiScreen';
import BillScreen from '../containers/billScreen';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {scale, scaleVertical} from '../configs/scale';
import {ACCOUNT, DEPOSIT, HOME, NOTIFICATION} from './RouteName';
import {Dimensions} from 'react-native';

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === HOME) {
                        iconName = 'store-alt';
                    } else if (route.name === NOTIFICATION) {
                        iconName = 'bell';
                    }
                    else if (route.name === DEPOSIT) {
                        iconName = 'scroll';
                    }
                    else if (route.name === ACCOUNT) {
                        iconName = 'user-circle';
                    }
                    return <Icon name={iconName} size={scale(14)} color={color} />;
                },

            })}
            tabBarOptions={{
                activeTintColor: '#ff0681',
                inactiveTintColor: 'gray',
            }}
        >
            <Tab.Screen name={HOME} component={HomeScreen} options={{tabBarLabel: 'Trang chủ'}}/>
            <Tab.Screen name={NOTIFICATION} component={NotiScreen} options={{tabBarLabel: 'Thông báo'}}/>
            <Tab.Screen name={DEPOSIT} component={BillScreen} options={{tabBarLabel: 'Nạp tiền'}}/>
            <Tab.Screen name={ACCOUNT} component={AccountScreen} options={{tabBarLabel: 'Tài khoản'}}/>
        </Tab.Navigator>
    );
}
