import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../containers/homeScreen';
import AccountScreen from '../containers/accountScreen';
import NotiScreen from '../containers/notiScreen';
import BillScreen from '../containers/billScreen';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {scale} from '../configs/scale'
const Tab = createBottomTabNavigator();

export default function HomeNavigator() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Home') {
                        iconName = 'store-alt';
                    } else if (route.name === 'Tin tức') {
                        iconName = 'bell';
                    }
                    else if (route.name === 'Đơn nạp') {
                        iconName = 'scroll';
                    }
                    else if (route.name === 'Tài khoản') {
                        iconName = 'user-circle';
                    }
                    return <Icon name={iconName} size={scale(20)} color={color} />;
                },

            })}
            tabBarOptions={{
                activeTintColor: '#ff0681',
                inactiveTintColor: 'gray',
                style: {
                   shadowOpacity:scale(3),
                   shadowColor:'black',
                   backgroundColor:'#fafafe',
                  },
            }}
            
         

        >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Tin tức" component={NotiScreen}/>
            <Tab.Screen name="Đơn nạp" component={BillScreen} />
            <Tab.Screen name="Tài khoản" component={AccountScreen} />
        </Tab.Navigator>
    );
}