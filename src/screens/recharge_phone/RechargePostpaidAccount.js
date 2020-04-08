import React from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
class RechargePostpaidAccount extends React.Component {
  render() {
    if (this.props.rechargePhoneService) {
      let dataPostPaid = this.props.rechargePhoneService[1];
      if (dataPostPaid.allowTopup == true && dataPostPaid.allowAddBill == true) {
        return (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>{dataPostPaid.note}</Text>
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
