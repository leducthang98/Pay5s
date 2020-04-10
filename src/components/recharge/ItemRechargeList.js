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
import {formatMoney} from '../../constant/MoneyFormat';

const {width, height} = Dimensions.get('window');

export default class ItemRechargeList extends Component {
  constructor(props) {
    super(props);
    this.paymentAmount = this.props.discount ? this.props.amount * this.props.discount / 100 : this.props.amount;
  }

  render() {
    const {amount, discount, selected} = this.props;
    return (
      <View style={[!selected ? styles.container : styles.selectedContainer, shadow.ssm]}>
        <View style={styles.totalAmount}>
          <Text style={[texts.h3, {fontWeight: 'bold'}]}>{formatMoney(amount)+'đ'}</Text>
        </View>
        <View style={styles.line}/>
        <View style={styles.discountAmount}>
          <Text style={texts.sm}>-{discount}%~</Text>
          <Text style={[texts.sm, {color: COLOR.FACEBOOK}]}>{formatMoney(this.paymentAmount) + 'đ'}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: width / 3.5,
    height: scaleVertical(100),
    borderRadius: scaleModerate(8),
    backgroundColor: COLOR.BACKGROUND_COLOR,
    alignItems: 'center',
    marginHorizontal:scaleModerate(5),
    marginVertical:scaleVertical(10),
  },
  selectedContainer: {
    width: width / 3.5,
    height: scaleVertical(100),
    borderRadius: scaleModerate(8),
    backgroundColor: COLOR.BACKGROUND_COLOR,
    alignItems: 'center',
    borderWidth: 0.7,
    borderColor: COLOR.PRIMARY_COLOR,
    marginHorizontal:scaleModerate(5),
    marginVertical:scaleVertical(10),
  },
  totalAmount: {
    flex: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  line: {
    width: '90%',
    height: 0.6,
    backgroundColor: COLOR.SEPARATE_LINE,
  },
  discountAmount: {
    flex: 1,
    flexDirection: 'row',

  },
});
