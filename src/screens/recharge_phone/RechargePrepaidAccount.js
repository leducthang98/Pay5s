import React from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
class RechargePrepaidAccount extends React.Component {
  render() {
    if (this.props.rechargePhoneService) {
      let dataPrePaid = this.props.rechargePhoneService[0];
      if (dataPrePaid.allowTopup == true && dataPrePaid.allowAddBill == true) {
        return (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>{dataPrePaid.note}</Text>
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
export default connect(mapStateToProps, mapDispatchToProps)(RechargePrepaidAccount);
