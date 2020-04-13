import React, {PureComponent} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import {shadow, texts} from '../../constant/CommonStyles';
import {getString} from '../../res/values/String';
import {scaleModerate, scaleVertical} from '../../constant/Scale';
import * as Layout from '../../constant/Layout';
import * as COLOR from '../../constant/Colors';


const {width, height} = Layout.window;

class MessageDialog extends PureComponent {
  render() {
    const {title, message, textButton} = this.props;
    return(
      <View style={styles.container}>
        <View style={[styles.messageArea, {paddingVertical:scaleVertical(15), paddingHorizontal:scaleModerate(15)}]}>
          <Text style={texts.h3}>{title || getString('NOTIFICATION')}</Text>
          <Text style={[texts.normal, {marginVertical:scaleVertical(10)}]}>{message || ''}</Text>
          <TouchableOpacity style={styles.button}
                            onPress={() => this.props.close()}>
            <Text style={[texts.normal, {color:COLOR.WHITE}]}>{textButton || getString('OK')}</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#00000099",
    position: "absolute",
    width: width,
    height: height,
    elevation: 8
  },
  messageArea: {
    backgroundColor: COLOR.WHITE,
    borderRadius: scaleModerate(5),
    width: '80%'
  },
  button: {
    backgroundColor: COLOR.PRIMARY_COLOR,
    borderRadius: 6,
    height: scaleModerate(38),
    justifyContent: 'center',
    ...shadow.sm,
    marginTop: scaleVertical(10),
    marginBottom: scaleVertical(8)
  }
});

export default MessageDialog
