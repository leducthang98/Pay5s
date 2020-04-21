import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import * as Layout from '../../constant/Layout'
import * as COLOR from '../../constant/Colors'
import {scaleModerate, scaleVertical} from '../../constant/Scale';
import {NETWORK} from '../../constant/NetworkIcon';
import {size, texts} from '../../constant/CommonStyles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const {width, height} = Layout.window;
const itemHeight = height/10;

export default class ItemNetwork extends Component{
  constructor(props) {
    super(props);
  }

  render(){
    const {isSelected, name, discount, telco} = this.props
    return(
      <TouchableOpacity style={styles.item}>
        <View style={styles.imageArea}>
          <Image source={NETWORK[telco || 'VTT']} style={styles.image} resizeMode={'contain'} />
        </View>
        <View style={styles.contentArea}>
          <Text style={[texts.h5]}>{name || "Viettel"}</Text>
          <Text style={[texts.sm_placeholder]}>Giảm: {discount || 0} %</Text>
        </View>
        <Icon name={'check'} size={scaleModerate(20)} color={isSelected ? COLOR.SUCCESS : 'transparent'} />
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  item:{
    height: itemHeight,
    backgroundColor: COLOR.BACKGROUND_COLOR,
    flexDirection:'row',
    borderRadius: scaleModerate(8),
    alignItems: 'center',
    paddingHorizontal:scaleModerate(10)
  },
  imageArea:{
    width: height/13,
    height: height/13,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor: COLOR.BACKGROUND_COLOR,
    borderRadius: scaleModerate(8)
  },
  image:{
    width: height/15,
    height: height/15,
  },
  contentArea:{
    height: itemHeight,
    flex:1,
    paddingLeft: scaleModerate(10),
    justifyContent:'center',
    alignItems:'flex-start'
  }
});
