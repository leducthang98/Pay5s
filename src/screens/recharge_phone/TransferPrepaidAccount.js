import React from 'react';
import { Text, View, Dimensions, ScrollView, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { TouchableOpacity, TextInput } from 'react-native-gesture-handler';
import { PRIMARY_COLOR, FACEBOOK } from '../../constant/Colors';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { scale } from '../../constant/Scale';
class TransferPrepaidAccount extends React.Component {
  render() {
    if (this.props.rechargePhoneService) {
      let dataTransferPerpaid = this.props.rechargePhoneService[2];
      if (dataTransferPerpaid.allowTopup == true && dataTransferPerpaid.allowAddBill == true) {
        return (
          <View style={{ flex: 1 }}>
            <View style={{ flex: 8 }} >
              <ScrollView>
                <View style={{ paddingLeft: scale(15), paddingTop: scale(15), paddingRight: scale(15) }}>
                  <View style={{ flexDirection: 'row' }}>
                    <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                      <Text style={{ fontWeight: 'bold', fontSize: scale(16) }}>Nạp đến</Text>
                    </View>
                    <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'flex-end' }}>
                      <TouchableOpacity>
                        <Text style={{ fontSize: scale(13), color: FACEBOOK }}>Xem lịch sử</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={{ flexDirection: 'row', height: scale(36), marginTop: scale(8) }}>
                    <View style={{ flex: 4, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', borderColor: 'gray', borderWidth: scale(0.3), borderRadius: scale(7) }}>
                      <View style={{ flex: 6 }}>
                        <TextInput placeholder="Nhập số điện thoại" style={{}} textAlign='left' />
                      </View>
                      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <TouchableOpacity>
                          <Icon name={'facebook'} size={scale(22)} color={"black"} />
                        </TouchableOpacity>
                      </View>
                    </View>
                    {/* <TouchableOpacity > */}
                    <View style={{ flex: 0.2 }}></View>
                    <View style={{ flex: 0.6, borderWidth: scale(0.3), borderColor: 'gray', borderRadius: scale(5), alignItems: 'center', justifyContent: "center" }}>
                      <TouchableOpacity >
                        <Icon name={'facebook'} size={scale(22)} color={"black"} />
                      </TouchableOpacity>
                    </View>
                    {/* </TouchableOpacity> */}
                  </View>
                  <Text style={{fontSize:scale(12),color:'#707070',marginTop:scale(4)}}>{dataTransferPerpaid.note}</Text>
                </View>
                <View>

                </View>
              </ScrollView>
            </View>
            <View style={{ flex: 1 }}>
              <TouchableOpacity style={styles.footerButton}>
                <Text style={{ color: 'white' }}>NẠP NGAY</Text>
              </TouchableOpacity>
            </View>
          </View>
        )
      } else {
        return (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Không hỗ trợ </Text>
          </View>
        )
      }
    }
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading </Text>
      </View>
    )

  }
}
const containerW = Dimensions.get('window').width;
const containerH = Dimensions.get('window').height;
const styles = StyleSheet.create({
  container: {
    width: containerW,
    height: containerH,
  },
  footerButton: {
    height: scale(40),
    width: containerW - scale(30),
    marginLeft: scale(15),
    marginTop: scale(8),
    backgroundColor: PRIMARY_COLOR,
    borderRadius: scale(6),
    alignItems: 'center',
    justifyContent: 'center',
  }
})
const mapStateToProps = (store) => {
  return {
    rechargePhoneService: store.homeReducer.rechargePhoneService
  }
}
const mapDispatchToProps = (dispatch) => {
  return {


  }
}
export default connect(mapStateToProps, mapDispatchToProps)(TransferPrepaidAccount);


