import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Dimensions,
  Image,
  RefreshControl
} from 'react-native';
import Header from '../components/common/Header';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import { getBill } from '../actions/ActionBillScreen';
import { scale } from '../constant/Scale';
import { formatMoney } from '../constant/CommonFormat';
import Loading from '../components/common/Loading';
import Toast from 'react-native-simple-toast';
import { CommonActions } from '@react-navigation/native';
import { LOGIN } from '../navigators/RouteName';
import { refreshStore } from '../actions/ActionRefresh';
import { PRIMARY_COLOR } from '../constant/Colors'
import { NETWORK } from '../constant/Icon';
class BillScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false
    }
  }
  async componentDidMount() {
    const token_user = await AsyncStorage.getItem('access_token')
    console.log(token_user)
    this.props.getBill(token_user);
  }
  _renderBill = (service, mobile, amount, modified, telco, status, networkIcon) => (
    <View style={styles.component} >
      <View style={{
        width: '96%', height: containerH / 9, borderWidth: scale(0.3), borderColor: 'gray', justifyContent: 'center', backgroundColor: 'white', shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        elevation: 2,
      }}>
        <View style={{ flexDirection: 'row', width: containerW - scale(35), height: containerH / 11, paddingLeft: scale(5) }}>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Image style={{ flex: 0.85, width: '100%', height: '100%' }}
              source={networkIcon}
              resizeMode={"contain"}
            />
          </View>
          <View style={{ flex: 0.15, }}></View>
          <View style={{ flex: 2.2, flexDirection: 'column' }}>
            <View style={{ flex: 0.05, }}></View>
            <Text
              numberOfLines={1}
              style={{ fontSize: scale(15), fontWeight: 'bold' }}>{service} {telco}</Text>
            <Text
              numberOfLines={1}
              style={{ fontSize: scale(15), fontWeight: 'bold', color: '#6c37c0' }}>{mobile}-{amount}</Text>
            <Text
              numberOfLines={1}
              style={{ fontSize: scale(13), color: '#616161' }}>{modified}</Text>
          </View>
          <View style={{ flex: 0.9, justifyContent: 'flex-end', alignItems: 'flex-end' }}>
            <Text style={{ fontSize: scale(13), color: '#db49d1' }}>{status}</Text>
          </View>
        </View>
      </View>
    </View>
  );
  async tokenInvalidFunction() {
    this.props.refreshStore();
    await AsyncStorage.clear();
    Toast.show("Phiên đăng nhập đã hết hạn, bạn sẽ được quay trở về trang đăng nhập.")
    this.props.navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [{ name: LOGIN }],
      })
    );
  }
  async _onRefresh() {
    const token_user = await AsyncStorage.getItem('access_token');
    this.setState({
      ...this.state,
      refreshing: true
    })
    this.props.getBill(token_user);
    this.setState({
      ...this.state,
      refreshing: false
    })
  }

  render() {
    if (this.props.bills) {
      let billRespond = this.props.bills
      if (billRespond.errorCode === 200) {
        // co data
        let billData = billRespond.data.rows
        if (billData.size != 0) {
          return (
            <View>
              <Header navigation={this.props.navigation} back={false} title={'Danh sách đơn hàng'} />
              <ScrollView
                showsVerticalScrollIndicator={false}
                refreshControl={
                  <RefreshControl refreshing={this.state.refreshing} onRefresh={() => this._onRefresh()} />}
                style={{ marginTop: scale(5), marginBottom: scale(50) }}>
                {
                  billData.map((item, index) => {
                    let service;
                    let telco;
                    let status;
                    let networkIcon;
                    if (item.service == 'TT') {
                      service = 'Nạp thẻ trả trước'
                    } else if (item.service == 'TS') {
                      service = 'Nạp thẻ trả sau'
                    } else if (item.service == 'TKC') {
                      service = 'Bắn TK trả trước'
                    } else if (item.service == 'EPIN') {
                      service = 'Mua mã thẻ'
                    } else if (item.service == 'FTTH') {
                      service = 'Internet'
                    }

                    if (item.status == 0) {
                      status = 'Đang xử lý'
                    } else {
                      status = 'Đã đóng'
                    }

                    switch (item.telco) {
                      case 'VTT':
                        telco = 'Viettel'
                        networkIcon = NETWORK.VTT
                        break;
                      case 'VINA':
                        telco = 'Vinaphone'
                        networkIcon = NETWORK.VINA
                        break;
                      case 'VMS':
                        telco = 'Mobiphone'
                        networkIcon = NETWORK.VMS
                        break;
                    }
                    let mobile = item.mobile
                    let amount = formatMoney(item.amount) + 'đ'
                    return this._renderBill(service, mobile, amount, item.modified, telco, status, networkIcon)
                  })
                }
              </ScrollView>
            </View>
          );
        } else if (billData.size == 0) {
          return (
            <View>
              <Header navigation={this.props.navigation} back={false} title={'Danh sách đơn hàng'} />
              <View style={{ width: '100%', height: '90%', justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: 'gray' }} >Không có đơn hàng nào</Text>
              </View>
            </View>
          )
        }
      } else if (billRespond.errorCode === 500) {
        //fail
        this.tokenInvalidFunction();
        return null;
      }
    } else {
      //loading
      return (
        <View style={styles.container}>
          <Loading></Loading>
        </View>
      );
    }


  }
}
const containerW = Dimensions.get('window').width;
const containerH = Dimensions.get('window').height;
const styles = StyleSheet.create({
  container: {
    width: containerW,
    height: containerH,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00000099',
    position: 'absolute',
    elevation: 8,
  },
  loadingContainer: {
    width: containerW * 0.8,
    height: containerH / 10,
    backgroundColor: '#FFF',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    paddingLeft: 10,
    opacity: 1,
  },
  textLoading: {
    fontSize: 14,
    marginLeft: 10,
  },
  component: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: scale(5),

  },

});
const mapStateToProps = (store) => {
  return {
    bills: store.billReducer.bills
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    getBill: (token_user) => {
      dispatch(getBill(token_user))
    },
    refreshStore: () => {
      dispatch(refreshStore())
    },

  }
}
export default connect(mapStateToProps, mapDispatchToProps)(BillScreen);
