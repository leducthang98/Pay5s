import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
  Platform,
} from 'react-native';
import * as COLOR from '../../constant/Colors';
import * as Layout from '../../constant/Layout';
import {scaleModerate, scaleVertical} from '../../constant/Scale';
import {getString} from '../../res/values/String';
import {texts, size} from '../../constant/CommonStyles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {NETWORK, NETWORK_SQUARE} from '../../constant/Icon';
import {DEPOSIT, CONTACT_LIST} from '../../navigators/RouteName';


const {width, height} = Layout.window;
const networkHeight = height / 16;

export default class ChooseServiceAndPhone extends Component {
  constructor(props) {
    super(props);
  }

  _moveToHistoryScreen = () => {
    this.props.navigation.navigate(DEPOSIT);
  };

  _moveToContactScreen = () => {
    this.props.navigation.navigate(CONTACT_LIST);
  };

  _getPlaceHolder = () => {
    if (this.props.kPlusService) {
      return 'Nhập mã';
    } else {
      if (this.props.service === 'FTTH') {
        return getString('ACCOUNT_CODE');
      }
      return getString('TYPE_PHONE_NUMBER');
    }
  };

  render() {
    const {paddingHorizontal, note, networkCode, error, errorContent, phoneNumber, service, kPlusService} = this.props;
    return (
      <View style={paddingHorizontal ? [styles.container, {paddingHorizontal: paddingHorizontal}] : styles.container}>
        <View style={styles.historyArea}>
          <Text
            style={[texts.h4, {fontWeight: 'bold'}]}>{(kPlusService !== true) ? getString('DEPOSIT_TO') : 'Mã hợp đồng'}</Text>
          <TouchableOpacity onPress={() => this._moveToHistoryScreen()}>
            <Text style={[texts.normal, {color: COLOR.FACEBOOK}]}>{getString('WATCH_HISTORY')}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.selectPhoneAndService}>
          <View style={!error ? styles.phoneArea : styles.phoneAreaError}>
            <TextInput
              value={phoneNumber}
              style={styles.phone}
              placeholder={this._getPlaceHolder()}
              keyboardType={this.props.service === 'FTTH' ? 'default' : 'default'}
              onChangeText={phoneNumber => this.props.onTypingPhoneNumber(phoneNumber)}
              onSubmitEditing={() => this.props.checkValidPhoneNumber(phoneNumber)}
            />
            {
              (this.props.service !== 'FTTH' && !kPlusService) ? <TouchableOpacity
                onPress={() => this._moveToContactScreen()}
                style={styles.contact}>
                <Image
                  source={require('../../res/images/recharge/contact.png')}
                  style={size.sm}
                />
              </TouchableOpacity> : null
            }
          </View>
          {kPlusService ?
            <View style={styles.network}>
              {/* Thay ảnh K+ ở đây  */}
              <Image
                style={{width: '100%', height: '100%', borderRadius: scaleModerate(8)}}
                resizeMode={'contain'}
                source={require('../../res/images/recharge/logok.png')}/>
            </View> :
            <TouchableOpacity
              onPress={() => this.props.openChooseNetwork()}
              style={styles.network}>
              <Image
                style={{width: '100%', height: '100%', borderRadius: scaleModerate(8)}}
                resizeMode={'contain'}
                source={NETWORK_SQUARE[networkCode || 'VINA']}/>
            </TouchableOpacity>}

        </View>
        {
          (errorContent !== '') ?
            <Text style={[texts.l_sm, {marginTop: scaleVertical(5), color: COLOR.ERROR}]}>{errorContent}</Text> : null
        }
        {
          note && <Text style={[texts.l_normal, {marginTop: scaleVertical(15)}]}>{note}</Text>
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: width,
    backgroundColor: COLOR.BACKGROUND_COLOR,
    paddingHorizontal: scaleModerate(15),
    paddingVertical: scaleVertical(10),
  },
  historyArea: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  selectPhoneAndService: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: scaleVertical(10),
  },
  phoneArea: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 0.6,
    borderColor: COLOR.BORDER,
    borderRadius: scaleModerate(8),
    height: networkHeight,
    flex: 1,
    marginRight: scaleModerate(10),
  },
  phoneAreaError: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 0.6,
    borderColor: COLOR.ERROR,
    borderRadius: scaleModerate(8),
    height: networkHeight,
    flex: 1,
    marginRight: scaleModerate(10),
  },
  phone: {
    flex: 1,
    height: networkHeight,
    paddingHorizontal: scaleModerate(10),
    justifyContent: 'center',
  },
  contact: {
    width: networkHeight,
    height: networkHeight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  network: {
    width: networkHeight,
    height: networkHeight,
    // borderWidth: 0.6,
    // borderColor: COLOR.BORDER,
    borderRadius: scaleModerate(8),
  },
});
