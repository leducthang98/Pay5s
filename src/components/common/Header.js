import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Platform
} from 'react-native';
import {statusBarHeight} from '../../constant/Layout';
import * as COLOR from '../../constant/Colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {scaleModerate, scaleVertical} from '../../constant/Scale';
import {texts} from '../../constant/CommonStyles';
import {CommonActions} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

const {width, height} = Dimensions.get('window');
const headerHeight = scaleVertical(50)


export default class Header extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {back, title, rightIcon,screenPopUpFromRightIcon} = this.props;
    return (
       <LinearGradient
      start={{ x: 0, y: 0.75 }} end={{ x: 1, y: 0.25 }}

      colors={['#ff547c', '#c944f7']}
       style={styles.container}>
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

          <Text style={[texts.white_bold, {fontSize:scaleModerate(17)}]}>{title || 'Pay5s'}</Text>
          {
            rightIcon ?
              <TouchableOpacity style={styles.buttonArea}
                onPress={()=> this.props.navigation.navigate(screenPopUpFromRightIcon)}>
                <Icon name={rightIcon} size={scaleModerate(22)} color={COLOR.WHITE}/>
              </TouchableOpacity> :
              <View style={styles.buttonArea}/>
          }
        </View>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: width,
    height: headerHeight,
    backgroundColor: COLOR.PRIMARY_COLOR,
    marginTop:Platform.OS === 'ios' ? statusBarHeight : 0
  },
  headerContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  buttonArea: {
    height: headerHeight,
    width: headerHeight,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
