import React from 'react';
import { Text, View, ScrollView, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { scale } from '../../constant/Scale';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { formatMoney } from '../../constant/CommonFormat';
import Modal from 'react-native-modal';
import { PRIMARY_COLOR, PURPLE_FONTCOLOR, GRAY_FONTCOLOR, PINK_FONTCOLOR } from '../../constant/Colors';
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
  _renderTransfer = (id, amount, note, type, time, icon,card) => (
    <TouchableOpacity
      //  onPress={() => this.openModalTransfer(id, amount, note,  type, time)}>
      onPress={() => this.props.route?.navigation?.navigate(INIT_HISTORY_CHECKWALLET, {
        initHistory: {
          id: id,
          amount: amount,
          note: note,
          type: type,
          time: time,
          card:card
        }
      })}>
      <View style={{ width: containerW, height: scale(60), flexDirection: 'row', justifyContent: 'center', alignItems: 'center', borderBottomWidth: scale(0.4), borderColor: 'gray' }}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Icon name={icon} size={scale(19)} color={PURPLE_FONTCOLOR} />
        </View>
        <View style={{ flex: 5.5, height: scale(56) }}>
          <Text numberOfLines={1} style={{ fontSize: scale(14.5), color: GRAY_FONTCOLOR, fontWeight: "700" }}>{note}</Text>
          <Text numberOfLines={1} style={{ fontSize: scale(13), color: GRAY_FONTCOLOR }}>{time}</Text>
          <Text numberOfLines={1} style={{ fontSize: scale(13), color: GRAY_FONTCOLOR }}>Txid: {id}</Text>
        </View>
        <View style={{ flex: 2.5, height: scale(56), justifyContent: 'flex-end', alignItems: 'flex-end', paddingRight: scale(10), paddingBottom: scale(5) }}>
          <Text style={{ fontSize: scale(13), fontWeight: 'bold', color: PURPLE_FONTCOLOR }}>{amount}</Text>
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
            <>
              <ScrollView>
                <View style={{ height: scale(10) }}></View>
                {
                  transferResponse.data.rows.map((item, index) => {
                    let amount = (item.amount > 0) ? '+' + formatMoney(item.amount) + 'đ' : formatMoney(item.amount) + 'đ';
                    let icon;

                    let card = 'not supported';
                    if (item.cards) {
                      card = item.cards
                    }

                    if (item.amount < 0) {
                      icon = 'chevron-circle-left'
                    } else {
                      icon = 'chevron-circle-right'
                    }
                    return this._renderTransfer(item.id, amount, item.note, item.type, item.time, icon,card)
                  })
                }

              </ScrollView>
              <View style={{ height: scale(30) }}></View>
            </>
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
