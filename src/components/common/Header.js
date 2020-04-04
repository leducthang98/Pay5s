import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {statusBarHeight} from '../../configs/Layout';
import * as COLOR from '../../configs/Colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {scaleModerate} from '../../configs/Scale';
import {texts} from '../../configs/CommonStyles';
import {CommonActions} from '@react-navigation/native';


const {width, height} = Dimensions.get('window');

export default class Header extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {back, title, rightIcon} = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.headerContent}>
          {
            back ?
              <TouchableOpacity
                onPress={()=>this.props.navigation.pop()}
                style={styles.buttonArea}>
                <Icon name={'arrow-left'} size={scaleModerate(22)} color={COLOR.WHITE}/>
              </TouchableOpacity> :
              <View style={styles.buttonArea}/>
          }

          <Text style={texts.white_bold}>{title || 'Pay5s'}</Text>
          {
            rightIcon ?
              <TouchableOpacity style={styles.buttonArea}>
                <Icon name={rightIcon} size={scaleModerate(22)} color={COLOR.WHITE}/>
              </TouchableOpacity> :
              <View style={styles.buttonArea}/>
          }
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: width,
    height: statusBarHeight * 2.5,
    paddingTop: statusBarHeight,
    backgroundColor: COLOR.PRIMARY_COLOR,
  },
  headerContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  buttonArea: {
    height: statusBarHeight * 1.5,
    width: statusBarHeight * 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
