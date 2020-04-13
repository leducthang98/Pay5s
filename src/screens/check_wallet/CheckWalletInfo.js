import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { scale } from '../../constant/Scale';
import { INFODATA } from '../../res/values/String';
class CheckWalletInfo extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, paddingLeft: scale(12), paddingTop: scale(10), paddingRight: scale(15) }}>
        <View>
          <Text style={styles.textStyle}>{INFODATA.PARAGRAPH1A}</Text>
          <Text style={styles.textStyle}>{INFODATA.PARAGRAPH1B}</Text>
        </View>
        <View style={{ paddingTop: scale(10) }}>
          <Text style={styles.textStyle}>{INFODATA.PARAGRAPH2A}</Text>
          <Text style={styles.textStyle}>{INFODATA.PARAGRAPH2B}</Text>
          <Text style={styles.textStyle}>{INFODATA.PARAGRAPH2C}</Text>
          <Text style={styles.textStyle}>{INFODATA.PARAGRAPH2D}</Text>
        </View>
        <View style={{ paddingTop: scale(10) }}>
          <Text style={styles.textStyle}>{INFODATA.PARAGRAPH3A}</Text>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  textStyle: {
    fontSize: scale(12.5)
  }
})
export default CheckWalletInfo;
