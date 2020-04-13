import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import Header from '../components/common/Header';
import { scale } from '../constant/Scale';
import * as COLOR from '../constant/Colors';
class TransferMoney extends React.Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Header navigation={this.props.navigation} back={true} title={'Chuyển khoản'} />
        <View style={{ paddingTop: scale(20), paddingLeft: scale(10),paddingRight:scale(50) }}>
          <Text style={{ fontWeight: 'bold', fontSize: scale(16) }}>Nạp đến</Text>
          <TouchableOpacity style={{marginTop:scale(10)}}>
            <View style={{borderWidth:scale(0.3),borderRadius:scale(6),height:scale(33),justifyContent:'center',paddingLeft:scale(5)}}>
              <Text style={{color:'gray'}}>Nhập tên hoặc SĐT người nhận</Text>
            </View>
          </TouchableOpacity>
        </View>

      </View>
    );
  }
}
export default TransferMoney;
