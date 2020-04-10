import React from 'react';
import { Text, View, FlatList } from 'react-native';
import { connect } from 'react-redux';
import ItemRechargeList from '../../components/recharge/ItemRechargeList';
import ChooseServiceAndPhone from '../../components/recharge/ChooseServiceAndPhone';
import {getString} from '../../res/values/String';

const noteList = [
  getString('TIME_FINISH_BELOW_1_MINUTE'),
  getString('RECEIVE_20_PERCENT_PROMOTION')
]
class RechargePostpaidAccount extends React.Component {
  render() {
    if (this.props.rechargePhoneService) {
      let dataPostPaid = this.props.rechargePhoneService[1];
      const prepaidViettel = dataPostPaid.srvTelcos[0];
      const {amounts, discount} = prepaidViettel
      if (dataPostPaid.allowTopup && dataPostPaid.allowAddBill) {
        return (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ChooseServiceAndPhone note={noteList}/>
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
