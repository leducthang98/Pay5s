import React, {Component} from 'react';
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {scale, scaleModerate, scaleVertical} from '../../constant/Scale';
import {texts} from '../../constant/CommonStyles';
import * as COLOR from '../../constant/Colors';

const {width, height} = Dimensions.get('window');

export default class ItemAccount extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {iconLeftName, iconRightName, subTitle, title, canPress, iconLeftColor, iconStyle, extraInfo, extraInfoColor} = this.props;
    return (
      <TouchableOpacity
        onPress={canPress ? () => this.props.onPress() : ()=>{}}
        style={styles.container}>
        <Icon style={iconStyle ? iconStyle : styles.icon} name={iconLeftName} size={scale(28)}
              color={iconLeftColor || 'gray'}/>
        <View style={styles.textArea}>
          {
            extraInfo ? <View style={styles.title}>
              <Text style={texts.l_normal}>{title}</Text>
              <Text style={[texts.l_bold, {color: extraInfoColor || COLOR.TEXT_LABEL}]}>{extraInfo}</Text>
            </View> : <Text>{title}</Text>
          }
          {
            subTitle ? <Text style={styles.subTitle} numberOfLines={1}>{subTitle}</Text> : null
          }

        </View>
        {
          canPress ?
            <Icon style={{flex: 0.5}} name={iconRightName || 'chevron-right'} size={scale(16)} color={'gray'}/> :
            <View style={{flex: 0.5}}/>
        }
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: width,
    paddingVertical: scaleVertical(3),
    flexDirection: 'row',
    borderTopColor: '#ffe6ea',
    borderTopWidth: 0.4,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FAFAFA',
  },
  textArea:{
    flex: 8,
    paddingLeft: scaleModerate(8),
    justifyContent: 'center'
  },
  icon: {
    flex: 1,
    paddingLeft: scaleModerate(9),
  },
  subTitle: {
    marginTop:scaleVertical(2),
    fontSize: scale(12),
    color: 'gray',
  },
  title: {
    flexDirection: 'row',
  },
});
