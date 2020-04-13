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
import GetRechargePhoneServiceAPI from '../../fetchAPIs/getRechargePhoneServiceAPI';
import LoadingDialog from '../../components/common/LoadingDialog';
import MessageDialog from '../../components/common/MessageDialog';


const {width, height} = Layout.window;

class RechargePostpaidAccount extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      data: [],
      error: null,
      srvTelcos:[],
    };
  }

  async componentDidMount() {
    await this.fetchData();
    const {data} = this.state;
    if (data){
      const {srvTelcos} = data;
      this.setState({srvTelcos});
      console.log('src Telcos = ',this.state.srvTelcos);
      const viettel = srvTelcos[srvTelcos.indexOf({telco: "VTT"})].amounts;
      console.log('viettel = ',viettel)
    }
  }

  fetchData = async () => {
    this.setState({isLoading: true});
    const response = await GetRechargePhoneServiceAPI();
    this.setState({isLoading: false});
    if (!response) {
      this.setState({error: {message: 'UNKNOWN_ERROR'}});
    } else if (response && response.errorCode !== 200) {
      this.setState({error: response});
    } else {
      const data = response.data[2];
      if (data) {
        this.setState({data: data});
      }
    }
  };

  addSelectedProps = (amounts) => {
    let newArray = [];
    amounts.map((item, index) => {
      const newItem = {amount: item, isSelected: false};
      newArray.push(newItem);
    });
    return newArray;
  };

  selectItem = (item) => {

  };

  render() {
    const {isLoading, error, data} = this.state;
    if (data.allowTopup && data.allowAddBill) {
      return (
        <View
          style={styles.container}>
          <ChooseServiceAndPhone note={data?.note}/>
          <View style={{width, paddingHorizontal: scaleModerate(15)}}>
            <Text style={[texts.l_h4, {fontWeight: 'bold'}]}>{getString('AMOUNT_TO_DEPOSIT')}</Text>
          </View>

          <FlatList
            style={{marginTop: scaleVertical(5)}}
            numColumns={3}
            data={data?.amounts}
            keyExtractor={(item, index) => index}
            renderItem={({item, index}) =>
              <ItemRechargeList data={item} discount={data?.discount} onPress={() => this.selectItem(item)}/>}
          />
          {
            isLoading && <LoadingDialog/>
          }
          {
            error && <MessageDialog
              message={error.message}
              close={() => {
                this.setState({error: null});
              }}
            />
          }
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <Text style={texts.normal}>{getString('NOT_SUPPORT')}</Text>
      </View>
    )
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
