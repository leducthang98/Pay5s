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

export default class ItemRechargeList extends Component {
  constructor(props) {
    super(props);
  }

  // componentWillReceiveProps(nextProps){
  //   if (this.props.discount !== nextProps.discount){
  //     this.setState({discount: nextProps.discount})
  //   }
  // }

  // static getDerivedStateFromProps(nextProps, prevState){
  //   console.log('get deriverd next props = ',nextProps);
  //   console.log('get deriverd prev state = ',prevState);
  //   if (nextProps.discount !== prevState.discount){
  //     return {discount: nextProps.discount}
  //   }
  //   return null
  // }
  //
  // componentDidUpdate(prevProps, prevState){
  //   console.log('component did update prev props = ', prevProps);
  //   console.log('component did update prev state = ', prevState);
  //   if (prevState.discount !== this.state.discount){
  //     this.setState({discount: this.props.discount})
  //   }
  // }

  render() {
    const {data} = this.props;
    return (
      <TouchableOpacity
        onPress={() => this.props.onPress()}
        style={[!data?.isSelected  ? styles.container : styles.selectedContainer]}>
        <View style={styles.totalAmount}>
          <Text style={[texts.h4, {fontWeight: 'bold', color: data?.isSelected ? COLOR.PINK_FONTCOLOR : COLOR.TEXT_LABEL}]}>
            {formatMoney(data?.amount || 10000) + 'đ'}
          </Text>
        </View>
        <View style={styles.line}/>
        <View style={styles.discountAmount}>
          <Text style={texts.sm}>-{data?.discount || 0}%~</Text>
          <Text style={[texts.sm, {color: COLOR.FACEBOOK}]}>{formatMoney(data?.discountAmount || '2000')  + 'đ'}</Text>
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
    borderColor: COLOR.PINK_FONTCOLOR,
    marginHorizontal: scaleModerate(5),
    marginVertical: scaleVertical(10),
  },
  totalAmount: {
    flex: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  line: {
    width: '90%',
    height: 0.6,
    backgroundColor: COLOR.SEPARATE_LINE,
  },
  discountAmount: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems:'center'
  },
});
