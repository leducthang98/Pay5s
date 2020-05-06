import React, { PureComponent } from 'react'
import {
  Dimensions,
  View,
  ActivityIndicator,
  Text,
  StyleSheet,
  Modal
} from 'react-native'
import { texts } from '../../constant/CommonStyles'
import { getString } from '../../res/values/String'
import * as COLOR from '../../constant/Colors'
import { scaleModerate, scaleVertical } from '../../constant/Scale';
import * as Layout from '../../constant/Layout';

const { width, height } = Layout.window;
class LoadingDialog extends PureComponent {

  render() {
    return (
      <Modal
        animationType={'fade'}
        visible={this.props.visible}
        transparent={true}>
        <View style={styles.container}>
          <View style={[styles.loadingArea, { paddingVertical: scaleVertical(15), paddingHorizontal: scaleModerate(15) }]}>
            <ActivityIndicator color={COLOR.PRIMARY_COLOR} size={"large"} />
            <Text style={[texts.normal, {
              flex: 1,
              alignItems: 'center',
              alignSelf: 'center'
            }]}>{getString(this.props.message || 'CONNECTING')}</Text>
          </View>
        </View>
      </Modal>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#00000099",
    width: width,
    height: height,
    position: 'absolute',
    elevation: 8
  },
  loadingArea: {
    backgroundColor: 'white',
    borderRadius: scaleModerate(5),
    flexDirection: 'row',
    width: '80%'
  }
})

export default LoadingDialog
