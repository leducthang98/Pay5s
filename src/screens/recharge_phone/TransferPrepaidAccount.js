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
import {getRechargePhoneServiceAPI} from '../../fetchAPIs/getRechargePhoneServiceAPI';
import LoadingDialog from '../../components/common/LoadingDialog';
import MessageDialog from '../../components/common/MessageDialog';
import ChooseNetwork from '../../components/recharge/ChooseNetwork';

const {width, height} = Layout.window;
const SERVICE = 'TKC';

export default class RechargePostpaidAccount extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      data: [],
      error: null,
      srvTelcos: [],
      moneyAmount: [],
      index: 0,
      isVisibleChooseNetwork: false,
    };
  }

  async componentDidMount() {
    await this._fetchData();
    console.log('props in transfer prepaid = ', this.props)
    const {data} = this.state;
    if (data) {
      const {srvTelcos} = data;
      this.setState({srvTelcos});
      // console.log('src Telcos = ', this.state.srvTelcos);
      // const viettel = srvTelcos[0].amounts;
      // console.log('viettel = ',viettel)
    }
    this._calculateDiscountAmount();
  }

  _fetchData = async () => {
    this.setState({isLoading: true});
    const response = await getRechargePhoneServiceAPI();
    this.setState({isLoading: false});
    // console.log('recharge in screen = ', response);
    if (!response || (response && response.errorCode !== 200 && !response.message)) {
      this.setState({responseError: {message: getString('UNKNOWN_ERROR')}});
    } else if (response && response.errorCode !== 200) {
      this.setState({responseError: response});
    } else {
      this._findData(response.data);
      // this.setState({data: response.data});
    }
  };

  _findData = (data) => {
    const index = data.findIndex(item => item.service === SERVICE);
    this.setState({data: data[index]});
    // console.log('data viettel = ', data[index].srvTelcos[0].amounts);
    const moneyAmount = this._addSelectedPropsToMoney(data[index].srvTelcos[0].amounts);
    // console.log('money amount = ',moneyAmount)
    this.setState({moneyAmount});
  };

  _addSelectedPropsToMoney = (amounts) => {
    let newArray = [];
    amounts.map((item, index) => {
      const newItem = {amount: item, isSelected: false};
      newArray.push(newItem);
    });
    return newArray;
  };

  _selectItem = (selectedItem, selectedIndex) => {
    const {moneyAmount} = this.state;
    selectedItem.isSelected = true;
    moneyAmount.map((item, index) => {
      if (item.isSelected && index !== selectedIndex) {
        item.isSelected = false;
      }
    });
    moneyAmount[selectedIndex] = selectedItem;
    this.setState({moneyAmount});
  };

  _addSelectedPropsToService = (data) => {
    let newData = [];
    data.map((item, index) => {
      if (index === 0) {
        const newItem = Object.assign(item, {isSelectedMethod: true});
        newData.push(newItem);
      } else {
        const newItem = Object.assign(item, {isSelectedMethod: false});
        newData.push(newItem);
      }
    });
    return newData;
  };

  _calculateDiscountAmount = () => {
    const {moneyAmount, index, srvTelcos} = this.state;
    const {discount} = srvTelcos[index] || 0;
    let newAmount = [];
    moneyAmount.map((item, index) => {
      const discountAmount = item.amount * discount / 100 || 0;
      const newItem = Object.assign(item, {discountAmount, discount});
      newAmount.push(newItem);
    });
    this.setState({moneyAmount: newAmount});
  };

  render() {
    const {isLoading, error, data, moneyAmount, srvTelcos, index} = this.state;
    console.log('srv Telcos = ',srvTelcos);
    if (data.allowTopup && data.allowAddBill) {
      return (
        <View
          style={styles.container}>
          <ChooseServiceAndPhone
            navigation={this.props.route?.navigation}
            note={data?.note}
            openChooseNetwork={() => this.setState({isVisibleChooseNetwork: true})}
            networkCode={srvTelcos[index]?.telco}
          />
          <View style={{width, paddingHorizontal: scaleModerate(15)}}>
            <Text style={[texts.l_h4, {fontWeight: 'bold'}]}>{getString('AMOUNT_TO_DEPOSIT')}</Text>
          </View>

          <FlatList
            style={{marginTop: scaleVertical(5)}}
            numColumns={3}
            data={moneyAmount}
            extraData={this.state}
            keyExtractor={(item, index) => index}
            renderItem={({item, index}) => {
              return <ItemRechargeList
                data={item}
                onPress={() => this._selectItem(item, index)}/>;
            }}
          />
          {isLoading && <LoadingDialog/>}
          {error !== null ? <MessageDialog
            message={error.message}
            close={() => {
              this.setState({error: null});
            }}
          /> : null}
          <ChooseNetwork
            visible={this.state.isVisibleChooseNetwork}
            close={() => this.setState({isVisibleChooseNetwork: false})}
          />
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <Text style={texts.normal}>{getString('NOT_SUPPORT')}</Text>
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
