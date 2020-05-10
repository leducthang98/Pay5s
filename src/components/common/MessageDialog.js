import React, { PureComponent } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Dimensions
} from 'react-native';
import { shadow, texts } from '../../constant/CommonStyles';
import { getString } from '../../res/values/String';
import { scaleModerate, scaleVertical, scale } from '../../constant/Scale';
import * as Layout from '../../constant/Layout';
import * as COLOR from '../../constant/Colors';
import LinearGradient from 'react-native-linear-gradient';

const { width, height } = Layout.window;

class MessageDialog extends PureComponent {
  render() {
    const { title, message, textButton } = this.props;
    return (
      <Modal
        animationType={'fade'}
        visible={this.props.visible}
        transparent={true}>
        <View style={styles.container}>
          <View style={[styles.messageArea, { paddingVertical: scaleVertical(20), paddingHorizontal: scaleModerate(15) }]}>
            <Text style={texts.h3}>{title || getString('NOTIFICATION')}</Text>
            <Text style={[texts.normal, { marginVertical: scaleVertical(10) }]}>{message || ''}</Text>
            <TouchableOpacity 
              onPress={() => this.props.close()}>
              <LinearGradient
                start={{ x: 0, y: 0.75 }} end={{ x: 1, y: 0.25 }}

                colors={['#ff547c', '#c944f7']}
                style={{
                  width: containerW * 0.7,
                  height: scale(45),
                  borderRadius: scaleModerate(40),
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text style={[texts.normal, { color: COLOR.WHITE }]}>{textButton || getString('OK')}</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    )
  }
}
const containerW = Dimensions.get('window').width;
const containerH = Dimensions.get('window').height;
const styles = StyleSheet.create({
  container: {
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
