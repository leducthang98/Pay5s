import React, {PureComponent} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {scaleModerate, scale} from '../../constant/Scale';
import * as COLOR from '../../constant/Colors';

const containerW = Dimensions.get('window').width;


export default class LinearButton extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {onPress, disabled, text, startColor, endColor, width, height} = this.props;
    return (
      <TouchableOpacity
        onPress={onPress}
        disabled={disabled}>
        <LinearGradient
          start={{x: 0, y: 0.75}} end={{x: 1, y: 0.25}}
          colors={[startColor || '#ff547c', endColor || '#c944f7']}
          style={{
            width: width || containerW * 0.6,
            height: height || scale(45),
            backgroundColor: COLOR.PRIMARY_COLOR,
            borderRadius: scaleModerate(40),
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={{
            color: (!disabled ? '#DCDCDC' : 'white'),
            fontWeight: 'bold',
            fontSize: scaleModerate(16),
          }}>{text}</Text>
        </LinearGradient>
      </TouchableOpacity>
    );
  }
}
