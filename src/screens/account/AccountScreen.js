import React from 'react';
import { Text, View, Dimensions, StyleSheet, TouchableOpacity, Image, SectionList } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { scale, scaleModerate, scaleVertical } from '../../constant/Scale';
import { statusBarHeight } from '../../constant/Layout';
import { WALLET } from '../../navigators/RouteName';
import ItemAccount from '../../components/account/ItemAccount';
import * as COLOR from '../../constant/Colors';
import Header from '../../components/common/Header';
import { connect } from 'react-redux'
import { formatMoney } from '../../constant/MoneyFormat';
import Loading from '../../components/common/Loading';


class AccountScreen extends React.Component {
  constructor(props) {
    super(props);

  };

  checkWallet() {
    this.props.navigation.navigate(WALLET);
  }

  intro = () => {
    console.log('gioi thieu tham gia Pay5s');
  };

  goToFanPage = () => {
    console.log('Facebook Fanpage');
  };

  showTermsAndAgreement = () => {
    console.log('Dieu khoan su dung');
  };

  showApplicationInfo = () => {
    console.log('Thong tin ung dung');
  };

  render() {
    if (this.props.accountInfo) {
      const itemList = [{
        section: 1,
        data: [{
          iconLeftName: 'coins',
          title: 'Số dư: ',
          extraInfo: formatMoney(this.props.accountInfo.balance),
          onPress: () => this.checkWallet(),
          iconLeftColor: COLOR.GOLD,
          extraInfoColor: COLOR.PURPLE,
          canPress: true,
        }, {
          iconLeftName: 'comment-dots',
          title: 'Mã giới thiệu: ',
          extraInfo: 'HIEUDEPTRAI',
          subTitle: 'Giới thiệu bạn tham gia Pay5s - App và nhận thưởng',
          onPress: () => this.intro(),
          iconLeftColor: COLOR.PURPLE,
          extraInfoColor: COLOR.FACEBOOK,
          canPress: true,
        }],
      }, {
        section: 2,
        data: [{
          iconLeftName: 'facebook',
          title: 'Fanpage',
          subTitle: 'Facebook Fanpage chăm sóc khách hàng',
          onPress: () => this.goToFanPage(),
          iconLeftColor: COLOR.FACEBOOK,
          canPress: true,
        }, {
          iconLeftName: 'handshake',
          title: 'Điều khoản sử dụng',
          subTitle: 'Điều khoản sử dụng',
          onPress: () => this.showTermsAndAgreement(),
          iconLeftColor: COLOR.PURPLE,
          canPress: true,
        }],
      }, {
        section: 3,
        data: [{
          iconLeftName: 'question-circle',
          title: 'Thông tin ứng dụng',
          subTitle: 'Sản phẩm của Pay5s - Phiên bản hiện tại: 1.0.2',
          onPress: () => this.showApplicationInfo(),
          iconLeftColor: COLOR.QUESTION,
          canPress: false,
        }],
      }];
      return (
        <View style={styles.container}>
          <Header title={'Tài khoản'} />
          <View style={styles.body1}>
            <TouchableOpacity style={{ flex: 2.5, marginLeft: 4, }}>
              <Image style={{ height: '100%', borderRadius: 40 }}
                source={{ uri: 'https://scontent-sin6-1.xx.fbcdn.net/v/t1.0-9/p960x960/71949763_2522897797942478_4149955310162804736_o.jpg?_nc_cat=106&_nc_sid=85a577&_nc_ohc=zag8Z2YXtdMAX9BGZT4&_nc_ht=scontent-sin6-1.xx&_nc_tp=6&oh=081596cb6c9afc68b5bb83a069d5aa1a&oe=5EA9804A' }}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.infoArea}>
              <View style={{ flex: 8, justifyContent: 'flex-start', flexDirection: 'column' }}>
                <Text style={{ fontSize: scale(18) }}>Lê Đức Thắng</Text>
                <Text style={{ fontSize: scale(12), color: 'gray' }}>0{this.props.accountInfo.mobile}</Text>
              </View>
              <Icon style={{ flex: 0.6 }} name={'chevron-right'} size={scale(16)} color={'gray'} />
            </TouchableOpacity>
          </View>
          <SectionList
            keyExtractor={(item, index) => item + index}
            sections={itemList}
            renderItem={({ item }) =>
              <ItemAccount
                {...this.props}
                iconLeftName={item.iconLeftName}
                title={item.title}
                canPress={item.canPress}
                subTitle={item.subTitle}
                onPress={() => item.onPress()}
                extraInfo={item.extraInfo}
                extraInfoColor={item.extraInfoColor}
                iconLeftColor={item.iconLeftColor}
              />
            }
            renderSectionHeader={({ section: { section } }) => (
              <View style={{ width: containerW, height: scaleVertical(8) }} />
            )}
          />
        </View>
      );
    }
    else {
      return (
        <Loading></Loading>
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
  },
  header: {
    width: containerW,
    height: containerH / 13,
    backgroundColor: '#C71585',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: statusBarHeight / 1.5,
  },
  body1: {
    width: containerW,
    height: containerH / 6.7,
    marginTop: '2%',
    flexDirection: 'row',
    backgroundColor: 'white',
  },
  headerTitle: {
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    fontWeight: 'bold',
    fontSize: scale(16),
  },
  infoArea: {
    flex: 8,
    flexDirection: 'row',
    marginBottom: scale(5),
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: scale(10),
  },
});

const mapStateToProps = (store) => {
  return {
    accountInfo: store.homeReducer.accountInfo
  }
}
const mapDispatchToProps = (dispatch) => {
  return {


  }
}
export default connect(mapStateToProps, mapDispatchToProps)(AccountScreen);
