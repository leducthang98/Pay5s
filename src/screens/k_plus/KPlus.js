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
  Dimensions,
  Platform,
} from 'react-native';
import ItemRechargeList from '../../components/recharge/ItemRechargeList';
import ChooseServiceAndPhone from '../../components/recharge/ChooseServiceAndPhone';
import { getString } from '../../res/values/String';
import * as COLOR from '../../constant/Colors';
import { texts } from '../../constant/CommonStyles';
import { scale, scaleModerate, scaleVertical } from '../../constant/Scale';
import * as Layout from '../../constant/Layout';
import { getRechargePhoneServiceAPI } from '../../fetchAPIs/getRechargePhoneServiceAPI';
import LoadingDialog from '../../components/common/LoadingDialog';
import MessageDialog from '../../components/common/MessageDialog';
import ChooseNetwork from '../../components/recharge/ChooseNetwork';
import { isPhoneNumber } from '../../constant/Validate';
import { setPhoneNumberForRecharge } from '../../actions/ActionBillScreen';
import { connect } from 'react-redux';
import { md5Signature } from '../../constant/Secure';
import { CONFIRM_BILL_CREATE, LOGIN } from '../../navigators/RouteName';
import Toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-community/async-storage';
import { CommonActions } from '@react-navigation/native';
import LinearButton from '../../components/common/LinearButton';
import LinearGradient from 'react-native-linear-gradient';
import ChooseEPINService from '../../components/recharge/ChooseEPINService';
import { getKPlusService } from '../../fetchAPIs/KPlusApi';
import Header from '../../components/common/Header';
import ItemKPlus from '../../components/recharge/ItemKPlus';
import ItemAdditionPrice from '../../components/recharge/ItemAdditionPrice';
import { formatMoney } from '../../constant/CommonFormat';

const { width, height } = Dimensions.get('screen');
const additionCard = [
  { value: 0, isSelected: true },
  { value: 1, isSelected: false },
  { value: 2, isSelected: false },
  // {value: 4, isSelected: false},
  // {value: 5, isSelected: false},
  // {value: 6, isSelected: false},
];

class KPlus extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      data: [],
      error: null,
      months: [],
      additionCard: additionCard,
      isVisibleChooseNetwork: false,

      //hợp đồng
      contractIndex: 0,
      contractId: '',
      contractError: false,
      contractErrorContent: '',

      //number of cards
      cardNumber: 0,
      totalAmount: 0,
    };
  }

  async componentDidMount() {
    await this._fetchData();
    const { data } = this.state;
    if (data) {
      const { months } = data;
      const parsedMonths = this._addSelectedProps(months);
      this.setState({ months: parsedMonths });
    }
    this._calculateDiscountAmount();
    this._processAdditionPrice();
    this._calculateTotalAmount();
    console.log('months = ', this.state.months);
  }

  UNSAFE_componentWillReceiveProps(props) {
    if (props.billReducer !== this.props.billReducer) {
      this.setState({ phoneNumber: props.billReducer?.phoneNumberForRecharge });
    }
  }

  componentWillUnmount() {
    this.props.setPhoneNumber('');
  }

  _logout = async () => {
    await AsyncStorage?.clear();
    Toast.show('Phiên đăng nhập đã hết hạn, bạn sẽ được quay trở về trang đăng nhập.');
    this.props.route?.navigation?.dispatch(
      CommonActions?.reset({
        index: 1,
        routes: [{ name: LOGIN }],
      }),
    );
  };

  _fetchData = async () => {
    this.setState({ isLoading: true });
    const response = await getKPlusService();
    this.setState({ isLoading: false });
    const data = response?.data;
    this.setState({ data });
    this.setState({ months: data?.months });
  };

  _selectItemKPlus = (selectedItem, selectedIndex) => {
    const { months } = this.state;
    selectedItem.isSelected = true;
    months?.map((item, index) => {
      if (item.isSelected && index !== selectedIndex) {
        item.isSelected = false;
      }
    });
    months[selectedIndex] = selectedItem;
    this.setState({ months });
    this._calculateTotalAmount();
  };

  _selectItemAdditionCard = (selectedItem, selectedIndex) => {
    const { additionCard } = this.state;
    selectedItem.isSelected = true;
    additionCard?.map((item, index) => {
      if (item.isSelected && index !== selectedIndex) {
        item.isSelected = false;
      }
    });
    additionCard[selectedIndex] = selectedItem;
    this.setState({ additionCard });
    this._calculateTotalAmount();
  };

  _processAdditionPrice = () => {
    const { addition_cnt } = this.state.data;
    let { additionCard } = this.state;

  };

  _addSelectedProps = data => {
    let newData = [];
    data?.map((item, index) => {
      if (index === 0) {
        const newItem = Object.assign(item, { isSelected: true });
        newData.push(newItem);
      } else {
        const newItem = Object.assign(item, { isSelected: false });
        newData.push(newItem);
      }
    });
    return newData;
  };

  _calculateDiscountAmount = () => {
    const { months } = this.state;
    let newMonths = [];
    months?.map((item, index) => {
      const discount = item?.discount;
      const discountAmount = item.price * discount / 100 || 0;
      const newItem = Object.assign(item, { discountAmount, discount });
      newMonths.push(newItem);
    });
    this.setState({ months: newMonths });
  };

  _checkActive = () => {
    const { contractId, contractError, totalAmount } = this.state;
    return (!contractError && contractId !== '' && totalAmount !== 0);
  };

  _onTypingPhoneNumber = contractId => {
    this.setState({ contractId });
    if (contractId === '') {
      this.setState({
        contractError: true,
        contractErrorContent: 'Bạn phải có mã hợp đồng',
      });
    } else {
      this.setState({
        contractError: false,
        contractErrorContent: null,
      });
    }
  };

  _onKeyboardDismiss = () => {
    Keyboard.dismiss();
  };

  _onPressDeposit = async () => {
    this._onKeyboardDismiss();
    const { contractId, error } = this.state;
    if (this._checkActive()) {
      const { months, data, additionCard } = this.state;
      const itemKPlusSelected = await months?.filter(item => item.isSelected === true);
      const itemAdditionPriceSelected = await additionCard?.filter(item => item.isSelected === true);
      let dataKPlus = {
        contract: contractId,
        month: itemKPlusSelected[0]?.price,
        addition: itemAdditionPriceSelected[0]?.value
      }
      console.log(dataKPlus)
    }
  };

  _calculateTotalAmount = async () => {
    const { months, data, additionCard } = this.state;
    const itemKPlusSelected = await months?.filter(item => item.isSelected === true);
    const itemAdditionPriceSelected = await additionCard?.filter(item => item.isSelected === true);
    const additionPrice = data.addition_price;
    const totalAmount = await Number(itemKPlusSelected[0]?.price) - Number(itemKPlusSelected[0]?.discountAmount)
      + Number(itemAdditionPriceSelected[0]?.value) * Number(additionPrice);
    if (!isNaN(totalAmount)) {
      this.setState({ totalAmount });
    }
  };
  _checkValidPhoneNumber(phoneNumber) {
    console.log("Anh Hieu lam thieu cho nay :D")
  }
  render() {
    const { isLoading, error, data, contractIndex, months, additionCard } = this.state;
    const { contractId, contractError, contractErrorContent } = this.state;
    const isEPIN = this.props.route?.service === 'EPIN';
    if (isLoading) {
      return (
        <View style={[styles.container, { alignItems: 'center', justifyContent: 'center' }]}>
          <LoadingDialog />
        </View>
      );
    }
    return (
      <View style={[styles.container]}>
        {/*<KeyboardAvoidingView*/}
        {/*  contentContainerStyle={{flex: 1, alignItems: 'center', backgroundColor: COLOR.BACKGROUND_COLOR}}*/}
        {/*  behavior={'padding'}>*/}
        <View
          style={{ alignItems: 'center' }}>
          <Header back={true} navigation={this.props.navigation} title={'Gia hạn K+'} />
          <ChooseServiceAndPhone
            kPlusService={true}
            error={contractError}
            errorContent={contractErrorContent}
            onTypingPhoneNumber={phoneNumber => this._onTypingPhoneNumber(phoneNumber)}
            checkValidPhoneNumber={phoneNumber => this._checkValidPhoneNumber(phoneNumber)}
            phoneNumber={contractId}
            navigation={this.props.navigation}
            note={data?.note}
            service={this.props.route?.service}
          />
          <View style={{ width, paddingHorizontal: scaleModerate(15) }}>
            <Text style={[texts.l_h4, { fontWeight: 'bold' }]}>{'Số tháng'}</Text>
          </View>
          <FlatList
            style={{ marginTop: scaleVertical(5) }}
            numColumns={3}
            data={months}
            nestedScrollEnabled={true}
            extraData={this.state}
            keyExtractor={(item, index) => index}
            renderItem={({ item, index }) => <ItemKPlus
              data={item}
              onPress={() => this._selectItemKPlus(item, index)} />}
          />

          <View style={{ width, paddingHorizontal: scaleModerate(15) }}>
            <Text style={[texts.l_h4, { fontWeight: 'bold' }]}>{'Số thẻ phụ'}</Text>
          </View>
          <FlatList
            style={{ marginTop: scaleVertical(5) }}
            numColumns={3}
            data={additionCard}
            nestedScrollEnabled={true}
            extraData={this.state}
            keyExtractor={(item, index) => index}
            renderItem={({ item, index }) => <ItemAdditionPrice
              data={item}
              onPress={() => this._selectItemAdditionCard(item, index)} />}
          />
          <View style={{ width, paddingHorizontal: scaleModerate(15) }}>
            <Text style={[texts.l_h4, { fontWeight: 'bold' }]}>
              {'Tổng: ' + formatMoney(this.state.totalAmount) + ' đ'}
            </Text>
          </View>

          <View style={{ width, paddingHorizontal: scaleModerate(15), marginTop: scaleVertical(20) }}>
            <Text style={[texts.l_sm]}>{this.state.data?.description}</Text>
          </View>
          {isLoading && <LoadingDialog />}
          {
            error !== null && <MessageDialog
              message={error.message}
              close={() => this.setState({ error: null })}
            />
          }
        </View>
        {/*</KeyboardAvoidingView>*/}
        <View style={[styles.buttonArea]}>
          <TouchableOpacity
            // style={styles.button}
            disabled={this.state.contractId ? false : true}
            style={{ width: '100%', height: scaleVertical(50) }}
            onPress={() => this._onPressDeposit()}>
            <LinearGradient
              start={{ x: 0, y: 0.75 }} end={{ x: 1, y: 0.25 }}
              colors={['#ff547c', '#c944f7']}
              style={styles.button}>
              <Text style={{
                fontSize: scaleModerate(14),
                fontWeight: 'bold',
                color: (this.state.contractId) ? COLOR.WHITE : "silver",
                textAlign: 'center',
              }}>{'THANH TOÁN'}</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    );
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
    // backgroundColor: '#0077CC',
    paddingHorizontal: scaleModerate(15),
    flex: 1,
    // paddingTop: scaleVertical(10)
    justifyContent: 'flex-end',
    paddingBottom: scaleVertical(15),
  },
  button: {
    height: scaleVertical(45),
    width: '100%',
    backgroundColor: COLOR.PRIMARY_COLOR,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 999,
    // marginBottom: Layout.statusBarHeight * 2,
  },
  chooseCardNumberArea: {
    width: '100%',
    paddingHorizontal: scaleModerate(15),
    paddingVertical: scaleVertical(10),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
  },
  buttonAddMinus: {
    width: scaleModerate(25),
    height: scaleModerate(25),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: scaleModerate(20),
    backgroundColor: '#8f919e',
    marginLeft: scaleModerate(5),
  },
  inputNumber: {
    height: scaleModerate(30),
    paddingHorizontal: scaleModerate(10),
    borderRadius: scaleModerate(3),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#dde1e4',
    marginLeft: scaleModerate(5),
  },
  whiteBoldText: {
    fontWeight: 'bold',
    color: COLOR.WHITE,
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
export default connect(mapStateToProps, mapDispatchToProps)(KPlus);
