import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../containers/homeScreen';
import AccountScreen from '../containers/accountScreen';
import NotiScreen from '../containers/notiScreen';
import BillScreen from '../containers/billScreen';
import Icon from 'react-native-vector-icons';
const Tab = createBottomTabNavigator();

export default function HomeNavigator() {
    return (
        <Tab.Navigator
            tabBarOptions={{

                activeTintColor: 'tomato',
                inactiveTintColor: 'gray',
                tabBarIcon: ({ tintColor }) => (
                    <Icon name="dollar" size={30} color="#900" />
                )
            }}

        >
            <Tab.Screen name="Home" component={HomeScreen}
                tabBarOptions={{
                    tabBarIcon: ({ tintColor }) => (
                        <Image style={styles.logoImage}
                            source={{
                                uri: 'https://reactnative.dev/img/tiny_logo.png',
                            }}
                        />
                    )
                }}
            />
            <Tab.Screen name="Tin tức" component={NotiScreen} />
            <Tab.Screen name="Đơn nạp" component={BillScreen} />
            <Tab.Screen name="Tài khoản" component={AccountScreen} />
        </Tab.Navigator>
    );
}