import React from 'react';
import { Text, View, ScrollView, Dimensions, Button } from 'react-native';
import { connect } from 'react-redux';
import { scale } from '../../constant/Scale';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { formatMoney } from '../../constant/CommonFormat';
import Modal from 'react-native-modal';
import { PRIMARY_COLOR } from '../../constant/Colors';
import { texts } from '../../constant/CommonStyles';
import { refreshStore } from '../../actions/ActionRefresh';
import Toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-community/async-storage';
import { CommonActions } from '@react-navigation/native';
import { LOGIN, INIT_HISTORY_CHECKWALLET } from '../../navigators/RouteName';
class CheckWalletHistory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false,
      initTransfer: {
        id: 0,
        amount: 0,
        note: 'none',
        type: 'none',
        time: 'none'
      }

    };
  }
  openModalTransfer(id, amount, note, type, time) {
    this.setState({
      isModalVisible: true,
      initTransfer: {
        id: id,
        amount: amount,
        note: note,
        type: type,
        time: time
      }
    });
  };
  hideModal() {
    this.setState({
      ...this.state,
      isModalVisible: !this.state.isModalVisible,

    });
  };
  _renderTransfer = (id, amount, note, type, time, icon) => (
    <TouchableOpacity
      //  onPress={() => this.openModalTransfer(id, amount, note,  type, time)}>
      onPress={() => this.props.route?.navigation?.navigate(INIT_HISTORY_CHECKWALLET, {
        initHistory: {
          id: id,
          amount: amount,
          note: note,
          type: type,
          time: time
        }
      })}>
      <View style={{ width: containerW, height: scale(56), flexDirection: 'row', justifyContent: 'center', alignItems: 'center', borderBottomWidth: scale(0.4), borderColor: 'gray' }}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Icon name={icon} size={scale(19)} color={"black"} />
        </View>
        <View style={{ flex: 5.5, height: scale(56), paddingTop: scale(5) }}>
          <Text numberOfLines={1} style={{ fontSize: scale(12.5) }}>{note}</Text>
          <Text numberOfLines={1} style={{ fontSize: scale(10.5), color: 'gray' }}>{time}</Text>
          <Text numberOfLines={1} style={{ fontSize: scale(10.5), color: 'gray' }}>Txid: {id}</Text>
        </View>
        <View style={{ flex: 2.5, height: scale(56), justifyContent: 'flex-end', alignItems: 'flex-end', paddingRight: scale(10), paddingBottom: scale(5) }}>
          <Text style={{ fontSize: scale(13), fontWeight: 'bold' }}>{amount}</Text>
          {/* <Text numberOfLines={1} style={{ fontSize: scale(10.5), color: '#FDA50F' }}>Trước đó: {originAmount}</Text> */}
        </View>
      </View>
    </TouchableOpacity>
  );
  async tokenInvalidFunction() {
    this.props.refreshStore();
    await AsyncStorage.clear();
    Toast.show("Phiên đăng nhập đã hết hạn, bạn sẽ được quay trở về trang đăng nhập.")
    this.props.route?.navigation?.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [{ name: LOGIN }],
      })
    );
  }
  render() {
    if (this.props.transferData) {
      const transferResponse = this.props.transferData;
      if (transferResponse.errorCode === 200) {
        if (transferResponse.data.size != 0) {
          return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              {/* <Modal isVisible={this.state.isModalVisible} onBackdropPress={() => this.hideModal()} swipeDirection="up" onSwipeComplete={() => this.hideModal()} animationIn="slideInDown">
                <View style={{ width: "100%", height: "100%", backgroundColor: '#D3D3D3', borderRadius: scale(5) }}>
                  <View style={{ width: "100%", height: "7%", backgroundColor: PRIMARY_COLOR, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={texts.white_bold}>Tích điểm</Text>
                  </View>
                  <View style={{ backgroundColor: 'white', width: "100%", height: "8%", borderBottomColor: 'gray', borderBottomWidth: scale(0.4), justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                    <View style={{ flex: 1, justifyContent: 'center', height: "100%", paddingLeft: scale(13) }}>
                      <Text style={{ fontSize: scale(12), color: 'gray' }}>Mã giao dịch</Text>
                    </View>
                    <View style={{ flex: 3, justifyContent: 'center', alignItems: 'flex-end', height: "100%", paddingRight: scale(10) }}>
                      <Text style={{ fontSize: scale(12.5), textAlign: 'right' }}>{this.state.initTransfer.id}</Text>
                    </View>
                  </View>
                  <View style={{ backgroundColor: 'white', width: "100%", height: "8%", justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                    <View style={{ flex: 1, justifyContent: 'center', height: "100%", paddingLeft: scale(13) }}>
                      <Text style={{ fontSize: scale(12), color: 'gray' }}>Thời gian</Text>
                    </View>
                    <View style={{ flex: 3, justifyContent: 'center', alignItems: 'flex-end', height: "100%", paddingRight: scale(10) }}>
                      <Text style={{ fontSize: scale(12.5), textAlign: 'right' }}>{this.state.initTransfer.time}</Text>
                    </View>
                  </View>
                  <View style={{ backgroundColor: 'white', width: "100%", height: "14%", justifyContent: 'center', alignItems: 'center', flexDirection: 'row', marginTop: scale(10) }}>
                    <View style={{ flex: 1, justifyContent: 'center', height: "100%", paddingLeft: scale(13) }}>
                      <Text style={{ fontSize: scale(12), color: 'gray' }} >Nội dung</Text>
                    </View>
                    <View style={{ flex: 3, justifyContent: 'center', alignItems: 'flex-end', height: "100%", paddingRight: scale(10) }}>
                      <Text style={{ fontSize: scale(12.5), textAlign: 'right' }} numberOfLines={5}>{this.state.initTransfer.note}</Text>
                    </View>
                  </View>
                  <View style={{ backgroundColor: 'white', width: "100%", height: "8%", justifyContent: 'center', alignItems: 'center', flexDirection: 'row', marginTop: scale(10) }}>
                    <View style={{ flex: 1, justifyContent: 'center', height: "100%", paddingLeft: scale(13) }}>
                      <Text style={{ fontSize: scale(12), color: 'gray' }}>Thay đổi</Text>
                    </View>
                    <View style={{ flex: 3, justifyContent: 'center', alignItems: 'flex-end', height: "100%", paddingRight: scale(10) }}>
                      <Text style={{ fontSize: scale(12.5), textAlign: 'right' }}>{this.state.initTransfer.amount}</Text>
                    </View>
                  </View>
                </View>
              </Modal> */}
              <ScrollView>
                <View style={{ height: 10 }}></View>
                {
                  transferResponse.data.rows.map((item, index) => {
                    let amount = (item.amount > 0) ? '+' + formatMoney(item.amount) + 'đ' : formatMoney(item.amount) + 'đ';
                    let icon;
                    if (item.amount < 0) {
                      icon = 'chevron-circle-left'
                    } else {
                      icon = 'chevron-circle-right'
                    }
                    return this._renderTransfer(item.id, amount, item.note, item.type, item.time, icon)
                  })
                }

              </ScrollView>
            </View>
          );
        } else if (transferResponse.data.size == 0) {
          return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ color: 'gray' }}>Không có giao dịch nào</Text>
            </View>
          );
        }
      } else if (transferResponse.errorCode === 500) {
        this.tokenInvalidFunction();
        return null;
      }
    }
    else {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          {/* Loading */}
        </View>
      );
    }

  }
}
const containerW = Dimensions.get('window').width;
const containerH = Dimensions.get('window').height;
const mapStateToProps = (store) => {
  return {
    transferData: store.homeReducer.transferData,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    refreshStore: () => {
      dispatch(refreshStore())
    },
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(CheckWalletHistory);
