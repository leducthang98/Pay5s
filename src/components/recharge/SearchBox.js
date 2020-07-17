import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
} from 'react-native';
import * as COLOR from '../../constant/Colors';
import * as Layout from '../../constant/Layout';
import {getString} from '../../res/values/String';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {scaleModerate, scaleVertical} from '../../constant/Scale';
import {texts} from '../../constant/CommonStyles';
import {TouchableOpacity} from 'react-native-gesture-handler';

const {width, height} = Layout.window;

export default class SearchBox extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {value, onChangeText, placeholder, clearSearch} = this.props;
    return (
      <View style={styles.container}>
        <Icon name={'search'} size={scaleModerate(20)} color={COLOR.PLACEHOLDER_TEXT}/>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          style={[styles.input, texts.l_normal]}
          placeholder={placeholder || 'Nhập thông tin'}
          placeholderColor={COLOR.PLACEHOLDER_TEXT}
        />
        {
          value !== '' && <TouchableOpacity onPress={clearSearch}>
            <Icon name={'close'} size={scaleModerate(15)} color={COLOR.TEXT_LABEL}/>
          </TouchableOpacity>
        }

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scaleModerate(5),
    marginVertical: scaleVertical(10),
    borderWidth: 0.6,
    borderColor: COLOR.PLACEHOLDER_TEXT,
    borderRadius: scaleModerate(8),
  },
  input: {
    flex: 1,
    color: COLOR.TEXT_LABEL,
    paddingVertical: scaleVertical(5),
    paddingHorizontal: scaleModerate(5),
  },
});
