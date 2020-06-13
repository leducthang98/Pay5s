import * as React from 'react';
import {
  Image,
  View,
  Platform,
} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import AccountScreen from '../screens/account/AccountScreen';
import NotiScreen from '../screens/notification/NotiScreen';
import BillScreen from '../screens/BillScreen';
import * as COLOR from '../constant/Colors';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {scale, scaleVertical} from '../constant/Scale';
import {ACCOUNT, DEPOSIT, HOME, NOTIFICATION} from './RouteName';
import {Dimensions} from 'react-native';
import {statusBarHeight} from '../constant/Layout';
import {size} from '../constant/CommonStyles';

const Tab = createBottomTabNavigator();
export default function BottomTabNavigator() {

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color}) => {
          let iconName;
          let iconNameGray;
          if (route.name === HOME) {
            iconName = require('../res/images/bottom_tab/home_color.png');
            iconNameGray = require('../res/images/bottom_tab/home.png');
          } else if (route.name === NOTIFICATION) {
            iconName = require('../res/images/bottom_tab/noti_color.png');
            iconNameGray = require('../res/images/bottom_tab/noti.png');
          } else if (route.name === DEPOSIT) {
            iconName = require('../res/images/bottom_tab/bill_color.png');
            iconNameGray = require('../res/images/bottom_tab/bill.png');
          } else if (route.name === ACCOUNT) {
            iconName = require('../res/images/bottom_tab/account_color.png');
            iconNameGray = require('../res/images/bottom_tab/account.png');
          }
          return (
            // <View style={{
            //   backgroundColor: 'white',
            //   width: '100%',
            //   height: '100%',
            //   justifyContent: 'center',
            //   alignItems: 'center',
            // }}>
              <Image
                source={(focused ? iconName : iconNameGray)}
                resizeMode={'contain'}
                style={focused ? size.smd : size.sm}/>

            // </View>
          );
        },
      })}
      tabBarOptions={{
        inactiveTintColor: COLOR.GRAY_FONTCOLOR,
        activeTintColor: COLOR.PINK_FONTCOLOR,
        style: {
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 1,
            },
            shadowOpacity: 0.20,
            shadowRadius: 1.41,
            backgroundColor: COLOR.WHITE,
            elevation: 15,

        },
        labelPosition: 'below-icon',
        showLabel: true,
        showIcon: true,

      }}>
      <Tab.Screen name={HOME} component={HomeScreen} options={{tabBarLabel: 'Trang chủ'}}/>
      <Tab.Screen name={NOTIFICATION} component={NotiScreen} options={{tabBarLabel: 'Tin tức'}}/>
      <Tab.Screen name={DEPOSIT} component={BillScreen} options={{tabBarLabel: 'Đơn hàng'}}/>
      <Tab.Screen name={ACCOUNT} component={AccountScreen} options={{tabBarLabel: 'Tài khoản'}}/>
    </Tab.Navigator>
  );
}
