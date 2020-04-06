import React from 'react';
import {
  StyleSheet,
  Dimensions,
  View,
  Text
} from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';

import RechargePrepaidAccount from './RechargePrepaidAccount';
import RechargePostpaidAccount from './RechargePostpaidAccount';
import TransferPrepaidAccount from './TransferPrepaidAccount';
import { scale } from '../../configs/Scale';
const initialLayout = { width: Dimensions.get('window').width };
const { width, height } = Dimensions.get('window');

export default function RechargePhoneTabView() {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'TransferPrepaidAccount', title: 'Bắn TK trả trước' },
    { key: 'RechargePostpaidAccount', title: 'Nạp thẻ trả sau' },
    { key: 'RechargePrepaidAccount', title: 'Nạp thẻ trả trước' },
  ]);

  const renderScene = SceneMap({
    RechargePostpaidAccount: RechargePostpaidAccount,
    RechargePrepaidAccount: RechargePrepaidAccount,
    TransferPrepaidAccount: TransferPrepaidAccount,
  });
  const renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: '#C71585', height: scale(3) }}
      style={{ backgroundColor: 'white', height: scale(45), borderTopColor: 'gray', borderTopWidth: scale(0.3), }}
      renderLabel={({ route, focused, color }) => (
        <View style={{flexDirection:'row'}} >
          <Text style={{ color: 'black',fontSize:scale(12) }}>
            {route.title}
          </Text>
        </View>
      )}
      
    />
  );
  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={initialLayout}
      renderTabBar={renderTabBar}
    />
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    width: width,
    height: height / 18,
    backgroundColor: '#FFF'
  },
});
