import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {statusBarHeight} from '../../constant/Layout';
import * as COLOR from '../../constant/Colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {scaleModerate, scaleVertical} from '../../constant/Scale';
import {shadow, texts} from '../../constant/CommonStyles';
import {formatMoney} from '../../constant/CommonFormat';

const {width, height} = Dimensions.get('window');

export default class ItemAdditionPrice extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {data, key} = this.props;
    return (
      <TouchableOpacity
        onPress={() => this.props.onPress()}
        style={[!data?.isSelected ? styles.container : styles.selectedContainer]}>
        <View style={styles.totalAmount}>
          <Text
            style={[texts.h4, {fontWeight: 'bold', color: data?.isSelected ? COLOR.PINK_FONTCOLOR : COLOR.TEXT_LABEL}]}>
            {data?.value}
          </Text>
        </View>
      </TouchableOpacity>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: width / 3.5,
    height: scaleVertical(40),
    borderRadius: scaleModerate(8),
    backgroundColor: COLOR.BACKGROUND_COLOR,
    alignItems: 'center',
    justifyContent:'center',
    borderWidth: 2,
    borderColor: COLOR.DISABLED_COLOR,
    marginHorizontal: scaleModerate(5),
    marginVertical: scaleVertical(5),
  },
  selectedContainer: {
    width: width / 3.5,
    height: scaleVertical(40),
    borderRadius: scaleModerate(8),
    backgroundColor: COLOR.BACKGROUND_COLOR,
    alignItems: 'center',
    justifyContent:'center',
    borderWidth: 2,
    borderColor: COLOR.PINK_FONTCOLOR,
    marginHorizontal: scaleModerate(5),
    marginVertical: scaleVertical(5),
  },
});
