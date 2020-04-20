import React from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import ItemRechargeList from '../../components/recharge/ItemRechargeList';
export default class RechargePrepaidAccount extends React.Component {
  render() {
    if (this.props.rechargePhoneService) {
      let dataPrePaid = this.props.rechargePhoneService[0];
      if (dataPrePaid.allowTopup && dataPrePaid.allowAddBill) {
        return (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>ok men</Text>
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
