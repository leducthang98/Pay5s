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
    this.state = {
      discountAmount: this.props.data?.amount
    };
  }

  componentDidMount(){
    const {discount} = this.props;
    const {discountAmount} = this.state;
    const newDiscountAmount = parseInt(discountAmount) * parseInt(discount)/ 100;
    this.setState({discountAmount:newDiscountAmount})
  }

  render() {
    const {data, discount, selected} = this.props;
    const {discountAmount} = this.state;
    return (
      <TouchableOpacity
        onPress={() => this.props.onPress()}
        style={[!selected ? styles.container : styles.selectedContainer]}>
        <View style={styles.totalAmount}>
          <Text style={[texts.h4, {fontWeight: 'bold', color: selected ? COLOR.PRIMARY_COLOR : COLOR.TEXT_LABEL}]}>
            {formatMoney(data?.amount || 10000) + 'đ'}
          </Text>
        </View>
        <View style={styles.line}/>
        <View style={styles.discountAmount}>
          <Text style={texts.sm}>-{discount || 0}%~</Text>
          <Text style={[texts.sm, {color: COLOR.FACEBOOK}]}>{formatMoney(discountAmount) || '2000' + 'đ'}</Text>
        </View>
      </TouchableOpacity>
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
    borderWidth: 2,
    borderColor: COLOR.DISABLED_COLOR,
    marginHorizontal: scaleModerate(5),
    marginVertical: scaleVertical(10),
  },
  selectedContainer: {
    width: width / 3.5,
    height: scaleVertical(100),
    borderRadius: scaleModerate(8),
    backgroundColor: COLOR.BACKGROUND_COLOR,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLOR.PRIMARY_COLOR,
    marginHorizontal: scaleModerate(5),
    marginVertical: scaleVertical(10),
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
    justifyContent: 'flex-start'
  },
});
