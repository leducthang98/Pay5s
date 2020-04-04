import React from 'react';
import {
  StyleSheet,
  Dimensions,
} from 'react-native';

import {TabView, SceneMap} from 'react-native-tab-view';
import CheckWalletHistory from '../check_wallet/CheckWalletHistory';
import CheckWalletInfo from '../check_wallet/CheckWalletInfo';

const initialLayout = {width: Dimensions.get('window').width};
const {width, height} = Dimensions.get('window');

export default class AccountTabView extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      index: 0
    };
    this.routes=[
      {key: 'history', title: 'Lịch sử'},
      {key: 'info', title: 'Thông tin'},
    ];
    this.renderScene = SceneMap({
      history: CheckWalletHistory,
      info: CheckWalletInfo,
    });
  };

  render(){
    const {index} = this.state;
    const {routes, renderScene} = this;
    return (
      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={(index)=>this.setState({index})}
        initialLayout={initialLayout}
        contentContainerStyle={styles.tabContainer}
      />
    );
  }

}
const styles = StyleSheet.create({
  tabContainer:{
    width: width,
    height:height/18,
    backgroundColor:'#FFF'
  },
});
