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

class RechargePostpaidAccount extends React.Component {
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
    const {data} = this.state;
    if (data) {
      const {srvTelcos} = data;
      this.setState({srvTelcos});
      // console.log('src Telcos = ', this.state.srvTelcos);
      // const viettel = srvTelcos[0].amounts;
      // console.log('viettel = ',viettel)
    }
  }

  _fetchData = async () => {
    this.setState({isLoading: true});
    const response = await getRechargePhoneServiceAPI();
    this.setState({isLoading: false});
    // console.log('recharge in screen = ', response);
    if (!response) {
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

  render() {
    const {isLoading, error, data, moneyAmount, srvTelcos, index} = this.state;
    if (data.allowTopup && data.allowAddBill) {
      return (
        <View
          style={styles.container}>
          <ChooseServiceAndPhone
            note={data?.note}
            openChooseNetwork={() => this.setState({isVisibleChooseNetwork: true})}/>
          <View style={{width, paddingHorizontal: scaleModerate(15)}}>
            <Text style={[texts.l_h4, {fontWeight: 'bold'}]}>{getString('AMOUNT_TO_DEPOSIT')}</Text>
          </View>

          <FlatList
            style={{marginTop: scaleVertical(5)}}
            numColumns={3}
            data={moneyAmount}
            extraData={this.state}
            keyExtractor={(item, index) => index}
            renderItem={({item, index}) =>
              <ItemRechargeList
                data={item}
                discount={srvTelcos[index]?.discount}
                selected={item.isSelected}
                onPress={() => this._selectItem(item, index)}/>}
          />
          {
            isLoading && <LoadingDialog/>
          }
          {
            error !== null ? <MessageDialog
              message={error.message}
              close={() => {
                this.setState({error: null});
              }}
            /> : null
          }
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

const mapStateToProps = (store) => {
  return {
    rechargePhoneService: store.homeReducer.rechargePhoneService,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(RechargePostpaidAccount);
