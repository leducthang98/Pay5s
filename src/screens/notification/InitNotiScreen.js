import React from 'react';
import {
  View,
  Text,
  Image,
  Dimensions,
} from 'react-native';
import Header from '../../components/common/Header';
import {ScrollView} from 'react-native-gesture-handler';
import {scale, scaleVertical, scaleModerate} from '../../constant/Scale';
import {PRIMARY_COLOR, FACEBOOK} from '../../constant/Colors';

const containerW = Dimensions.get('window').width;
const containerH = Dimensions.get('window').height;
import {WebView} from 'react-native-webview';
import {statusBarHeight} from '../../constant/Layout';
import LoadingDialog from '../../components/common/LoadingDialog';

class InitNotiScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    }
  }
  render() {
    let data = this.props.route.params;
    console.log(data.dataNotification);
    return (
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <Header navigation={this.props.navigation} back={true} title={'Chi tiết'}/>
        <WebView
          source={{uri: data.dataNotification.content}}
          style={{marginBottom: statusBarHeight}}
          onLoad={()=>this.setState({isLoading:false})}
        />
        {this.state.isLoading && <LoadingDialog />}
      </View>
    );
  }

}

export default InitNotiScreen;
