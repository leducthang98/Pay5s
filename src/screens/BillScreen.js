import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  ScrollView,
  Dimensions,
  Image,
  StatusBar,
  FlatList,
  ActivityIndicator,
  Platform
} from 'react-native';
import Header from '../components/common/Header';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-community/async-storage';
import { getBill } from '../actions/ActionBillScreen';
import { scale } from '../constant/Scale';
import { formatMoney } from '../constant/MoneyFormat';
class BillScreen extends React.Component {

  async componentDidMount() {
    const token_user = await AsyncStorage.getItem('access_token')
    console.log('test commit')
    this.props.getBill(token_user);
  }
  _renderBill = (service, mobile, amount, modified, telco) => (
    <View style={styles.component} >
      <View style={{ width: '92%', height: containerH / 9, borderWidth: scale(0.3), borderRadius: scale(7), borderColor: 'gray', justifyContent: 'center', alignItems: 'center' }}>
        <View style={{ flexDirection: 'row', width: containerW - scale(35), height: containerH / 11 }}>
          <View style={{ flex: 0.05, }}></View>
          <View style={{ flex: 0.8 }}>
            <View style={{ flex: 0.05, }}></View>
            <Image style={{ flex: 0.85 }}
              source={{ uri: 'https://cdn.itviec.com/employers/tct-vtnet-viettel/logo/social/uqLhUBEa5SCkKcMCQuicasqa/tct-vtnet-viettel-logo.png' }}
            />
          </View>
          <View style={{ flex: 0.05, }}></View>
          <View style={{ flex: 2.2, flexDirection: 'column' }}>
            <View style={{ flex: 0.05, }}></View>
            <Text style={{ fontSize: scale(12), fontWeight: 'bold' }}>{service} {telco}</Text>
            <Text style={{ fontSize: scale(12), fontWeight: 'bold', color: '#C71585' }}>{mobile}-{amount}</Text>
            <Text style={{ fontSize: scale(10), color: 'gray' }}>{modified}</Text>
          </View>
          <View style={{ flex: 0.8, justifyContent: 'flex-end', alignItems: 'flex-end' }}>

            <Text style={{ fontSize: scale(11), color: 'purple' }}> Đã đóng </Text>
          </View>

        </View>
      </View>
    </View>
  );
  render() {
    let billData;
    if (this.props.billData) {
      billData = this.props.billData.rows
      if (this.props.billData.size != 0) {
        return (
          <View>
            <Header navigation={this.props.navigation} back={false} title={'Danh sách đơn hàng'} />
            <ScrollView style={{ marginTop: scale(5) }}>
              {
                billData.map((item, index) => {
                  let service
                  let telco
                  if (item.service == 'TT') {
                    service = 'Bắn TK trả trước'
                  }else if(item.service == 'TS'){
                    service = 'Bắn TK trả sau'
                  }
                  switch (item.telco) {
                    case 'VTT':
                      telco = 'Viettel'
                      break;
                    case 'VINA':
                      telco = 'Vinaphone'
                      break;
                    case 'VMS':
                      telco = 'Mobiphone'
                      break;
                  }
                  let mobile = '0' + item.mobile
                  let amount = formatMoney(item.amount) + 'đ'
                  return this._renderBill(service, mobile, amount, item.modified, telco)
                })
              }
            </ScrollView>
          </View>
        );
      } else if (this.props.billData.size == 0) {
        return (
          <View>
            <Header navigation={this.props.navigation} back={false} title={'Danh sách đơn hàng'} />
            <View style={{ width: '100%', height: '90%', justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{color:'gray'}} >Không có đơn hàng nào</Text>
            </View>
          </View>
        )
      }
    } else {
      return (
        <View style={styles.container}>
          <View style={styles.loadingContainer}>
            <ActivityIndicator size={'large'} color='#ff8c00' />
            <Text style={styles.textLoading}>loading</Text>
          </View>
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
    width: containerW,
    height: containerH / 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: scale(4)

  },

});
const mapStateToProps = (store) => {
  return {
    billData: store.billReducer.billData
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    getBill: (token_user) => {
      dispatch(getBill(token_user))
    },

  }
}
export default connect(mapStateToProps, mapDispatchToProps)(BillScreen);