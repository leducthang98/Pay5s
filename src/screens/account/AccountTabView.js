import React from 'react';
import {
  StyleSheet,
  Dimensions,
  View,
  Text
} from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import CheckWalletHistory from '../check_wallet/CheckWalletHistory';
import CheckWalletInfo from '../check_wallet/CheckWalletInfo';
import { scale } from '../../constant/Scale';
import { PRIMARY_COLOR } from '../../constant/Colors'
const initialLayout = { width: Dimensions.get('window').width };
const { width, height } = Dimensions.get('window');

export default function AccountTabView() {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'history', title: 'Lịch sử' },
    { key: 'info', title: 'Thông tin' },
  ]);

  const renderScene = SceneMap({
    history: CheckWalletHistory,
    info: CheckWalletInfo,
  });
  const renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: PRIMARY_COLOR, height: scale(3) }}
      style={{ backgroundColor: 'white', height: scale(45), borderTopColor: 'gray', borderTopWidth: scale(0.4), }}
      renderLabel={({ route, focused, color }) => (
        <View style={{ flexDirection: 'row' }} >
          <Text style={{ color: 'black', }}>
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
