import React from 'react';
import {
  StyleSheet,
  Dimensions,
} from 'react-native';

import {TabView, SceneMap} from 'react-native-tab-view';
import CheckWalletHistory from '../CheckWalletHistory';
import CheckWalletInfo from '../CheckWalletInfo';

const initialLayout = {width: Dimensions.get('window').width};
const {width, height} = Dimensions.get('window');

export default function AccountTabView() {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'history', title: 'Lịch sử'},
    {key: 'info', title: 'Thông tin'},
  ]);

  const renderScene = SceneMap({
    history: CheckWalletHistory,
    info: CheckWalletInfo,
  });

  return (
    <TabView
      navigationState={{index, routes}}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={initialLayout}
      contentContainerStyle={styles.tabContainer}
    />
  );
};

const styles = StyleSheet.create({
  tabContainer:{
    width: width,
    height:height/18,
    backgroundColor:'#FFF'
  },
});
