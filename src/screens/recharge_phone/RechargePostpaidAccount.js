import React from 'react';
import {Text, View, FlatList, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import ItemRechargeList from '../../components/recharge/ItemRechargeList';
import ChooseServiceAndPhone from '../../components/recharge/ChooseServiceAndPhone';
import {getString} from '../../res/values/String';
import * as COLOR from '../../constant/Colors';
import {texts} from '../../constant/CommonStyles';
import {scaleModerate, scaleVertical} from '../../constant/Scale';
import * as Layout from '../../constant/Layout';

const noteList = [
  getString('TIME_FINISH_BELOW_1_MINUTE'),
  getString('RECEIVE_20_PERCENT_PROMOTION'),
];
const {width, height} = Layout.window;

class RechargePostpaidAccount extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      isLoading: false
    }
  }
  render() {
    const {isLoading} = this.state;
    const {rechargePhoneService} = this.props;
    if (rechargePhoneService) {
      let dataPostPaid = rechargePhoneService[1];
      const prepaidViettel = dataPostPaid.srvTelcos[0];
      const {amounts, discount} = prepaidViettel;
      if (dataPostPaid.allowTopup && dataPostPaid.allowAddBill) {
        return (
          <View
            style={styles.container}>
            <ChooseServiceAndPhone note={dataPostPaid.note}/>
            <View style={{width, paddingHorizontal:scaleModerate(15)}}>
              <Text style={[texts.l_h4, {fontWeight:'bold'}]}>{getString('AMOUNT_TO_DEPOSIT')}</Text>
            </View>

            <FlatList
              style={{marginTop:scaleVertical(5)}}
              numColumns={3}
              data={amounts}
              keyExtractor={(item, index) => index}
              renderItem={({item, index}) => <ItemRechargeList amount={item} discount={discount}/>}
            />
          </View>
        );
      } else {
        return (
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text>Không hỗ trợ </Text>
          </View>
        );
      }
    }
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Loading </Text>
      </View>
    );

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLOR.BACKGROUND_COLOR,
  },
});

const mapStateToProps = (store) => {
  return {
    rechargePhoneService: store.homeReducer.rechargePhoneService,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(RechargePostpaidAccount);
