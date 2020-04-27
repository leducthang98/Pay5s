import React from 'react';
import {
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import ItemRechargeList from '../../components/recharge/ItemRechargeList';
import ChooseServiceAndPhone from '../../components/recharge/ChooseServiceAndPhone';
import { getString } from '../../res/values/String';
import * as COLOR from '../../constant/Colors';
import { texts } from '../../constant/CommonStyles';
import { scaleModerate, scaleVertical } from '../../constant/Scale';
import * as Layout from '../../constant/Layout';
import { getRechargePhoneServiceAPI } from '../../fetchAPIs/getRechargePhoneServiceAPI';
import LoadingDialog from '../../components/common/LoadingDialog';
import MessageDialog from '../../components/common/MessageDialog';
import ChooseNetwork from '../../components/recharge/ChooseNetwork';
import { isPhoneNumber } from '../../constant/Validate';
import { setPhoneNumberForRecharge } from '../../actions/ActionBillScreen';
import { connect } from 'react-redux';
import { md5Signature } from '../../constant/Secure';
import { CONFIRM_BILL_CREATE } from '../../navigators/RouteName';


const { width } = Layout.window;

class RechargePhoneContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      data: [],
      error: null,
      srvTelcos: [],
      moneyAmount: [],
      index: 0,
      isVisibleChooseNetwork: false,

      //phone number
      phoneNumber: this.props.billReducer?.phoneNumberForRecharge,
      phoneNumberError: false,
      phoneNumberErrorContent: '',
    };
  }

  async componentDidMount() {
    await this._fetchData();
    const { data } = this.state;
    if (data) {
      const { srvTelcos } = data;
      const parsedSrvTelcos = this._addSelectedPropsToService(srvTelcos);
      this.setState({ srvTelcos: parsedSrvTelcos });
      console.log('srv Telcos = ', this.state.srvTelcos);
    }
    this._calculateDiscountAmount();
  }

  UNSAFE_componentWillReceiveProps(props) {
    if (props.billReducer !== this.props.billReducer) {
      this.setState({ phoneNumber: props.billReducer?.phoneNumberForRecharge });
    }
  }

  componentWillUnmount() {
    this.props.setPhoneNumber('');
  }

  _fetchData = async () => {
    this.setState({ isLoading: true });
    const response = await getRechargePhoneServiceAPI();
    this.setState({ isLoading: false });
    // console.log('recharge in screen = ', response);
    if (!response || (response && response.errorCode !== 200 && !response.message)) {
      this.setState({ responseError: { message: getString('UNKNOWN_ERROR') } });
    } else if (response && response.errorCode !== 200) {
      this.setState({ responseError: response });
    } else {
      this._findData(response.data);
      // this.setState({data: response.data});
    }
  };

  _findData = data => {
    const index = data.findIndex(item => item.service === this.props.route?.service);
    this.setState({ data: data[index] });
    // console.log('data viettel = ', data[index].srvTelcos[0].amounts);
    const moneyAmount = this._addSelectedPropsToMoney(data[index].srvTelcos[0].amounts);
    // console.log('money amount = ',moneyAmount)
    this.setState({ moneyAmount });
  };

  _addSelectedPropsToMoney = amounts => {
    let newArray = [];
    amounts?.map((item, index) => {
      let newItem = null;
      if (index === 0) {
        newItem = { amount: item, isSelected: true };
      } else {
        newItem = { amount: item, isSelected: false };
      }
      newArray.push(newItem);
    });
    return newArray;
  };

  _selectItem = (selectedItem, selectedIndex) => {
    const { moneyAmount } = this.state;
    selectedItem.isSelected = true;
    moneyAmount?.map((item, index) => {
      if (item.isSelected && index !== selectedIndex) {
        item.isSelected = false;
      }
    });
    moneyAmount[selectedIndex] = selectedItem;
    this.setState({ moneyAmount });
  };

  _addSelectedPropsToService = data => {
    let newData = [];
    data?.map((item, index) => {
      if (index === 0) {
        const newItem = Object.assign(item, { isSelectedMethod: true });
        newData.push(newItem);
      } else {
        const newItem = Object.assign(item, { isSelectedMethod: false });
        newData.push(newItem);
      }
    });
    return newData;
  };

  _calculateDiscountAmount = () => {
    const { moneyAmount, index, srvTelcos } = this.state;
    const { discount } = srvTelcos[index] || 0;
    let newAmount = [];
    moneyAmount?.map((item, index) => {
      const discountAmount = item.amount * discount / 100 || 0;
      const newItem = Object.assign(item, { discountAmount, discount });
      newAmount.push(newItem);
    });
    this.setState({ moneyAmount: newAmount });
  };

  _selectNetwork = telco => {
    this.setState({ isVisibleChooseNetwork: false });
    console.log('telco selected = ', telco);
    const { srvTelcos } = this.state;
    const index = srvTelcos.findIndex(item => item.telco === telco);
    this.setState({ index });
    const moneyAmount = this._addSelectedPropsToMoney(srvTelcos[index]?.amounts);
    console.log('money amount after select = ', moneyAmount);
    this.setState({ moneyAmount });
    this._calculateDiscountAmount();
  };

  _checkValidPhoneNumber = () => {
    const { phoneNumber } = this.state;
    if (phoneNumber !== '' && !isPhoneNumber(phoneNumber)) {
      this.setState({
        phoneNumberError: true,
        phoneNumberErrorContent: getString('PHONE_NUMBER_IS_INCORRECT_TYPE'),
      });
    }
  };

  _checkHavePhoneNumber = async () => {
    const { phoneNumber } = this.state;
    if (phoneNumber === '') {
      await this.setState({
        phoneNumberError: true,
        phoneNumberErrorContent: getString('YOU_NEED_TO_ENTER_PHONE_NUMBER'),
      });
    } else if (phoneNumber !== '') {
      await this.setState({
        phoneNumberError: false,
        phoneNumberErrorContent: null,
      });
    }
  };

  _onTypingPhoneNumber = async phoneNumber => {
    await this.setState({ phoneNumber });
    await this._checkHavePhoneNumber();
  };

  _onKeyboardDismiss = async () => {
    Keyboard.dismiss();
    await this._checkHavePhoneNumber();
    await this._checkValidPhoneNumber();
  };

  _onPressDeposit = async () => {
    await this._onKeyboardDismiss();
    const { phoneNumberError, error } = this.state;
    if (!phoneNumberError) {
      let phoneNumber = this.state.phoneNumber;
      if (phoneNumber.startsWith('0')) {
        phoneNumber = phoneNumber.slice(1, phoneNumber.length)
      }
      const service = this.props.route?.service;
      const network = this.state.srvTelcos[this.state.index]?.telco;
      const indexSelectedAmount = this.state.moneyAmount?.findIndex(item => item.isSelected === true);
      const amount = this.state.moneyAmount[indexSelectedAmount]?.amount;
      this.props.route?.navigation.navigate(CONFIRM_BILL_CREATE,
        {
          dataBillCreate: {
            phoneNumber: phoneNumber,
            service: service,
            network: network,
            amount: amount
          }
        }
      )
    }
  };


  render() {
    const { isLoading, error, data, moneyAmount, srvTelcos, index } = this.state;
    const { phoneNumberError, phoneNumberErrorContent } = this.state;
    if (isLoading) {
      return (
        <View style={[styles.container, { alignItems: 'center', justifyContent: 'center' }]}>
          <LoadingDialog />
        </View>
      );
    } else if (data && data.allowTopup && data.allowAddBill) {
      return (
        <View style={[styles.container]}>
          <KeyboardAvoidingView
            style={{ flex: 1, alignItems: 'center', backgroundColor: COLOR.BACKGROUND_COLOR }}
            behavior={'padding'}>
            <ScrollView
              keyboardShouldPersistTaps={'always'}
              contentContainerStyle={styles.center}>
              <ChooseServiceAndPhone
                error={phoneNumberError}
                errorContent={phoneNumberErrorContent}
                onTypingPhoneNumber={phoneNumber => this._onTypingPhoneNumber(phoneNumber)}
                checkValidPhoneNumber={phoneNumber => this._checkValidPhoneNumber(phoneNumber)}
                phoneNumber={this.state.phoneNumber}
                navigation={this.props.route?.navigation}
                note={data?.note}
                openChooseNetwork={() => this.setState({ isVisibleChooseNetwork: true })}
                networkCode={srvTelcos[index]?.telco}
              />
              <View style={{ width, paddingHorizontal: scaleModerate(15) }}>
                <Text style={[texts.l_h4, { fontWeight: 'bold' }]}>{getString('AMOUNT_TO_DEPOSIT')}</Text>
              </View>

              <FlatList
                style={{ marginTop: scaleVertical(5) }}
                numColumns={3}
                data={moneyAmount}
                extraData={this.state}
                keyExtractor={(item, index) => index}
                renderItem={({ item, index }) => <ItemRechargeList
                  data={item}
                  onPress={() => this._selectItem(item, index)} />}
              />
              {isLoading && <LoadingDialog />}
              {
                error !== null && <MessageDialog
                  message={error.message}
                  close={() => this.setState({ error: null })}
                />
              }
              {
                this.state.isVisibleChooseNetwork && <ChooseNetwork
                  selectNetwork={telco => this._selectNetwork(telco)}
                  srvTelcos={this.state.srvTelcos}
                  indexSelected={this.state.index}
                  visible={true}
                  close={() => this.setState({ isVisibleChooseNetwork: false })}
                />
              }
            </ScrollView>
            <View style={styles.buttonArea}>
              <TouchableOpacity
                onPress={() => this._onPressDeposit()}
                style={styles.button}>
                <Text style={texts.white_bold}>{getString('DEPOSIT_NOW').toUpperCase()}</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </View>
      );
    } else if (data && (!data.allowTopup || !data.allowAddBill)) {
      return (
        <View style={[styles.container, { alignItems: 'center', justifyContent: 'center' }]}>
          <Text style={texts.normal}>{getString('NOT_SUPPORT')}</Text>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.BACKGROUND_COLOR,
  },
  center: {
    width,
    alignItems: 'center',
    backgroundColor: COLOR.BACKGROUND_COLOR,
    paddingBottom: scaleVertical(10),
  },
  buttonArea: {
    width,
    paddingHorizontal: scaleModerate(15),
    paddingVertical: scaleVertical(10),
  },
  button: {
    height: scaleVertical(50),
    width: '100%',
    backgroundColor: COLOR.PRIMARY_COLOR,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: scaleModerate(8),
  },
});
const mapStateToProps = (store) => {
  return {
    billReducer: store.billReducer,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setPhoneNumber: (phoneNumber) => {
      dispatch(setPhoneNumberForRecharge(phoneNumber));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(RechargePhoneContainer);
