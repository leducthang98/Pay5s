import React from 'react';
import { Text, View, StyleSheet, Dimensions, TouchableOpacity, Clipboard, Platform, Linking } from 'react-native';
import Header from '../components/common/Header'
import { connect } from 'react-redux';
import { ScrollView } from 'react-native-gesture-handler';
import { scale, scaleModerate } from '../constant/Scale';
import { PRIMARY_COLOR, FACEBOOK, PURPLE_FONTCOLOR, PINK_FONTCOLOR, GRAY_FONTCOLOR } from '../constant/Colors'
import Loading from '../components/common/Loading';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Toast from 'react-native-simple-toast';
import { refreshStore } from '../actions/ActionRefresh';
import AsyncStorage from '@react-native-community/async-storage';
import { LOGIN } from '../navigators/RouteName';
import { CommonActions } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
class RechargeMoney extends React.Component {
  writeToClipboard = async (data) => {
    await Clipboard.setString(data);
    Toast.show('Đã sao chép');
  };

  _onClickMomo() {
    let urlMomo = Platform.OS === 'ios' ? 'https://apps.apple.com/us/app/v%C3%AD-momo-n%E1%BA%A1p-ti%E1%BB%81n-thanh-to%C3%A1n/id918751511' : 'https://play.google.com/store/apps/details?id=com.mservice.momotransfer&hl=vi'
    Linking.openURL(urlMomo)
  }
  _renderCommonData = (name, note, acc_name, leftSide_acc_no, rightSide_acc_no, bank, leftSide, rightSide) => (

    <View style={{ borderBottomWidth: scale(0.5), paddingBottom: scale(10), borderBottomColor: '#616161' }} >
      <View style={{ paddingLeft: scale(32), backgroundColor: 'white', marginTop: scale(10) }}>

        <Text style={{ fontWeight: 'bold', fontSize: scale(16), color: PINK_FONTCOLOR }}>{name}</Text>
        <Text style={styles.textComponent}>{bank}</Text>
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.textComponent}>{leftSide_acc_no}: </Text>
          <TouchableOpacity style={{ flexDirection: 'row' }}
            onPress={() => this.writeToClipboard(rightSide_acc_no)}
          >
            <Text style={styles.copyText}>{rightSide_acc_no}</Text>
            <Icon name={'copy'} style={{ paddingLeft: scale(10), paddingTop: scale(3) }} size={scale(14)} color={PURPLE_FONTCOLOR} />
          </TouchableOpacity>
        </View>
        <Text style={styles.textComponent}>{acc_name}</Text>
        <Text style={styles.textComponent}>{note}</Text>
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.textComponent}>{leftSide}: </Text>
          <TouchableOpacity style={{ flexDirection: 'row' }}
            onPress={() => this.writeToClipboard(rightSide)}
          >
            <Text style={styles.copyText}>{rightSide}</Text>
            <Icon name={'copy'} style={{ paddingTop: scale(3), paddingBottom: scale(10), paddingLeft: scale(3) }} size={scale(14)} color={PURPLE_FONTCOLOR} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
        {
          name.includes('MoMo') ?
            <TouchableOpacity
              onPress={() => this._onClickMomo()}
            >
              <LinearGradient
                start={{ x: 0, y: 0.75 }} end={{ x: 1, y: 0.25 }}

                colors={['#ff547c', '#c944f7']}
                style={{
                  width: containerW * 0.5,
                  height: scale(40),
                  borderRadius: scaleModerate(999),
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text style={{fontWeight: 'bold', fontSize: scaleModerate(14), color: 'white' }}>Momo</Text>

              </LinearGradient>
            </TouchableOpacity> : null
        }
      </View>
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
    if (this.props.commonConfigData && this.props.accountInfo) {
      const commonConfigResponse = this.props.commonConfigData;
      const accountInfoResponse = this.props.accountInfo;
      if (commonConfigResponse.errorCode === 200 && accountInfoResponse.errorCode === 200) {
        return (
          <View style={{ flex: 1, backgroundColor: 'white' }}>
            <Header navigation={this.props.navigation} back={true} title={'Nạp số dư tài khoản'} />
            <ScrollView>
              <Text style={{ paddingBottom: scale(10), backgroundColor: 'white', fontSize: scale(17), fontWeight: '700', color: '#616161', marginLeft: scale(10), marginTop: scale(8) }}>Chọn hình thức Nạp số dư tài khoản</Text>
              <View style={{ paddingLeft: scale(20), backgroundColor: 'white', paddingTop: scale(8) }}>
                <Text style={{ paddingBottom: scale(10), backgroundColor: 'white', fontSize: scale(15), color: '#616161' }}>{commonConfigResponse.data.topup_desc}</Text>
              </View>
              {
                commonConfigResponse.data.topup_channel.map((item, index) => {
                  let syntax = item.syntax
                  let syntaxSplited = syntax.split(":")
                  let leftSide = syntaxSplited[0]
                  let rightSide = syntaxSplited[1]
                  let acc_no = item.acc_no
                  let acc_no_splited = acc_no.split(":")
                  let leftSide_acc_no = acc_no_splited[0]
                  let rightSide_acc_no = acc_no_splited[1]
                  let mobile = accountInfoResponse.data.mobile
                  if (item.enable === false) {
                    return null;
                  }
                  return this._renderCommonData(item.name, item.note, item.acc_name, leftSide_acc_no, rightSide_acc_no, item.bank, leftSide, mobile)
                })
              }

            </ScrollView>
          </View>
        );
      } else if (commonConfigResponse.errorCode === 500 || accountInfoResponse.errorCode === 500) {
        this.tokenInvalidFunction();
        return null;
      }
    } else {
      return (
        <Loading />
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
    commonConfigData: store.homeReducer.commonConfigData,
    accountInfo: store.homeReducer.accountInfo,
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

