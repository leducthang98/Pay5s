import React from 'react';
import { Text, View, ScrollView, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { scale } from '../../constant/Scale';
import { TouchableOpacity } from 'react-native-gesture-handler';
class CheckWalletHistory extends React.Component {
  _renderTransfer = () => (
    <View style={{ width: containerW, borderBottomColor: 'gray', borderBottomWidth:scale(0.4),}}>
      <TouchableOpacity>
    <View style={{width:containerW,height:scale(56)}}>

    </View>
      </TouchableOpacity>
    </View>
  );
  render() {
    if (this.props.transferData) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ScrollView style={{ paddingTop:10 }}>
            {
              this.props.transferData.rows.map((item, index) => {
                return this._renderTransfer()
              })
            }
          </ScrollView>
        </View>
      );
    }
    else {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Loading</Text>
        </View>
      );
    }

  }
}
const containerW = Dimensions.get('window').width;
const containerH = Dimensions.get('window').height;
const mapStateToProps = (store) => {
  return {
    transferData: store.homeReducer.transferData
  }
}
const mapDispatchToProps = (dispatch) => {
  return {

  }
}
export default connect(mapStateToProps, mapDispatchToProps)(CheckWalletHistory);
