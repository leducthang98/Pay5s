import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import * as Layout from '../../constant/Layout';
import * as COLOR from '../../constant/Colors';
import {scaleModerate, scaleVertical} from '../../constant/Scale';
import {texts} from '../../constant/CommonStyles';
import {formatPhoneNumber} from '../../constant/CommonFormat';

const {width, height} = Layout.window;

export default class ContactItem extends Component {
  constructor(props) {
    super(props);
  }

  _chooseContact = () => this.props.chooseContact(this.props.phoneNumber);

  render() {
    return (
      <TouchableOpacity onPress={() => this._chooseContact()} style={styles.container}>
        <View style={styles.imageArea}>
          <Text style={texts.h2}>{this.props.givenName && this.props.givenName[0] || 'H'}</Text>
        </View>
        <View style={styles.contentArea}>
          <Text style={texts.l_h4}>{this.props.fullName || 'Lê Đức Thắng'}</Text>
          <Text style={texts.l_placeholder}>{formatPhoneNumber(this.props.phoneNumber || '0394827798')}</Text>
        </View>
      </TouchableOpacity>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingLeft: scaleModerate(10),
    backgroundColor: COLOR.BACKGROUND_COLOR,
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageArea: {
    height: scaleVertical(50),
    width: scaleVertical(50),
    backgroundColor: COLOR.BACKGROUND_COLOR,
    borderRadius: scaleVertical(25),
    borderWidth: scaleModerate(1),
    borderColor: COLOR.PRIMARY_COLOR,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentArea: {
    paddingVertical: scaleVertical(15),
    height: '100%',
    flex: 1,
    paddingLeft: scaleModerate(10),
    borderBottomWidth: scaleVertical(0.6),
    borderBottomColor: COLOR.BORDER,
  },
  separateLine: {
    width: '100%',
    height: scaleVertical(0.6),
    backgroundColor: COLOR.BORDER,
  },
});
