import React from 'react';
import { Text, View, FlatList } from 'react-native';
import { connect } from 'react-redux';
import ItemRechargeList from '../../components/recharge/ItemRechargeList';
class RechargePostpaidAccount extends React.Component {
  render() {
    if (this.props.rechargePhoneService) {
      let dataPostPaid = this.props.rechargePhoneService[1];
      console.log('data postpaid = ',dataPostPaid );
      const prepaidViettel = dataPostPaid.srvTelcos[0];
      const {amounts, discount} = prepaidViettel
      if (dataPostPaid.allowTopup && dataPostPaid.allowAddBill) {
        return (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <FlatList
              numColumns={3}
              data={amounts}
              keyExtractor={(item, index)=> index}
              renderItem={({item, index})=> <ItemRechargeList amount={item} discount={discount}/>}
            />
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
const mapStateToProps = (store) => {
  return {
    rechargePhoneService: store.homeReducer.rechargePhoneService
  }
}
const mapDispatchToProps = (dispatch) => {
  return {


  }
}
export default connect(mapStateToProps, mapDispatchToProps)(RechargePostpaidAccount);
