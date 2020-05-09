import React from 'react';
import { Text, View, StyleSheet, Dimensions, TouchableOpacity, Clipboard } from 'react-native';
import Header from '../components/common/Header'
import { connect } from 'react-redux';
import { ScrollView } from 'react-native-gesture-handler';
import { scale } from '../constant/Scale';
import { PRIMARY_COLOR, FACEBOOK, PURPLE_FONTCOLOR, PINK_FONTCOLOR } from '../constant/Colors'
import Loading from '../components/common/Loading';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Toast from 'react-native-simple-toast';
import { refreshStore } from '../actions/ActionRefresh';
import AsyncStorage from '@react-native-community/async-storage';
import { LOGIN } from '../navigators/RouteName';
import { CommonActions } from '@react-navigation/native';
class RechargeMoney extends React.Component {
  writeToClipboard = async (data) => {
    await Clipboard.setString(data);
    Toast.show('Đã sao chép');
  };

  _renderCommonData = (name, note, acc_name, acc_no, bank, syntax) => (
    <View style={{ paddingLeft: scale(32), backgroundColor: 'white', paddingBottom: scale(15) }}>

      <Text style={{ fontWeight: 'bold', fontSize: scale(16), color: PINK_FONTCOLOR }}>{name}</Text>
      <Text style={styles.textComponent}>{bank}</Text>
      <TouchableOpacity style={{ flexDirection: 'row' }}
        onPress={() => this.writeToClipboard(acc_no)}
      >
        <Text style={styles.copyText}>{acc_no}</Text>
        <Icon name={'copy'} style={{ paddingLeft: scale(10), paddingTop: scale(3) }} size={scale(14)} color={PURPLE_FONTCOLOR} />
      </TouchableOpacity>
      <Text style={styles.textComponent}>{acc_name}</Text>
      <Text style={styles.textComponent}>{note}</Text>
      <TouchableOpacity style={{ flexDirection: 'column', width: '100%' }}
        onPress={() => this.writeToClipboard(syntax)}
      >
        <Text style={styles.copyText}>{syntax}</Text>
        <Icon name={'copy'} style={{ paddingTop: scale(3), }} size={scale(14)} color={PURPLE_FONTCOLOR} />
      </TouchableOpacity>
    </View>
  );
  async tokenInvalidFunction() {
    this.props.refreshStore();
    await AsyncStorage.clear();
    Toast.show("Phiên đăng nhập đã hết hạn, bạn sẽ được quay trở về trang đăng nhập.")
    this.props.navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [{ name: LOGIN }],
      })
    );
  }
  render() {
    if (this.props.commonConfigData) {
      const commonConfigResponse = this.props.commonConfigData;
      if (commonConfigResponse.errorCode === 200) {
        return (
          <View style={{ flex: 1 }}>
            <Header navigation={this.props.navigation} back={true} title={'Nạp số dư tài khoản'} />
            <ScrollView>
              <View style={{ paddingLeft: scale(10), backgroundColor: 'white', paddingTop: scale(8) }}>
                <Text style={{ paddingBottom: scale(10), backgroundColor: 'white', fontSize: scale(17),fontWeight:'700',color:'#616161' }}>Chọn hình thức Nạp số dư tài khoản</Text>
              </View>
              {
                commonConfigResponse.data.topup_channel.map((item, index) => {
                  if (item.enable === false) {
                    return null;
                  }
                  return this._renderCommonData(item.name, item.note, item.acc_name, item.acc_no, item.bank, item.syntax)
                })
              }
            </ScrollView>
          </View>
        );
      } else if (commonConfigResponse.errorCode === 500) {
        this.tokenInvalidFunction();
        return null;
      }
    } else {
      return (
        <Loading></Loading>
      );
    }

  }
}
const containerW = Dimensions.get('window').width;
const containerH = Dimensions.get('window').height;
const styles = StyleSheet.create({
  textComponent: {
    fontSize: scale(14),
    color: '#696969'
  },
  copyText: {
    fontSize: scale(14),
    color: PURPLE_FONTCOLOR
  }

})
const mapStateToProps = (store) => {
  return {
    commonConfigData: store.homeReducer.commonConfigData
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    refreshStore: () => {
      dispatch(refreshStore())
    },
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(RechargeMoney);

