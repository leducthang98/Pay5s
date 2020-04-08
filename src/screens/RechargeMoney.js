import React from 'react';
import { Text, View, StyleSheet, Dimensions } from 'react-native';
import Header from '../components/common/Header'
import { connect } from 'react-redux';
import { ScrollView } from 'react-native-gesture-handler';
import { scale } from '../constant/Scale';
import { PRIMARY_COLOR } from '../constant/Colors'
class RechargeMoney extends React.Component {


  _renderCommonData = (name, note, acc_name, acc_no, bank, syntax) => (
    <View style={{ paddingLeft: scale(32), backgroundColor: 'white', paddingBottom: scale(15),paddingRight:scale(50) }}>
      <Text style={{ fontWeight: 'bold', fontSize: scale(14), color: PRIMARY_COLOR }}>{name}</Text>
      <Text style={styles.textComponent}>- {bank}</Text>
      <Text style={styles.textComponent}>- Số Momo: {acc_no}</Text>
      <Text style={styles.textComponent}>- Chủ TK Momo: {acc_name}</Text>
      <Text style={styles.textComponent}>- Lưu ý: {note}</Text>
      <Text style={styles.textComponent}>- {syntax}</Text>
    </View>
  );

  render() {

    if (this.props.commonConfigData) {
      console.log(this.props.commonConfigData.topup_channel)
      return (
        <View style={{ flex: 1 }}>
          <Header navigation={this.props.navigation} back={true} title={'Nạp số dư tài khoản'} />
          <ScrollView>
            <View style={{ paddingLeft: scale(10), backgroundColor: 'white', paddingTop: scale(8) }}>
              <Text style={{ paddingBottom: scale(10), backgroundColor: 'white' }}>Chọn hình thức Nạp số dư tài khoản</Text>
            </View>
            {
              this.props.commonConfigData.topup_channel.map((item, index) => {
                if (item.enable === false) {
                  return null;
                }
                return this._renderCommonData(item.name, item.note, item.acc_name, item.acc_no, item.bank, item.syntax)
              })
            }
          </ScrollView>
        </View>
      );
    } else {
      return (
        <View style={{ flex: 1 }}>
          <Header navigation={this.props.navigation} back={true} title={'Nạp số dư tài khoản'} />
          <Text>Loading</Text>

        </View>
      );
    }

  }
}
const containerW = Dimensions.get('window').width;
const containerH = Dimensions.get('window').height;
const styles = StyleSheet.create({
  textComponent: {
    fontSize: scale(12),
    color: '#696969'
  }

})
const mapStateToProps = (store) => {
  return {
    commonConfigData: store.homeReducer.commonConfigData
  }
}
const mapDispatchToProps = (dispatch) => {
  return {


  }
}
export default connect(mapStateToProps, mapDispatchToProps)(RechargeMoney);

