import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import * as COLOR from '../../constant/Colors';
import * as Layout from '../../constant/Layout';
import {scaleModerate, scaleVertical} from '../../constant/Scale';
import {getString} from '../../res/values/String';
import {texts} from '../../constant/CommonStyles';
import {NETWORK, NETWORK_SQUARE} from '../../constant/Icon';
import {DEPOSIT} from '../../navigators/RouteName';


const {width, height} = Layout.window;
const networkHeight = height / 14;

export default class ChooseServiceAndPhone extends Component {
  constructor(props) {
    super(props);
  }

  _moveToHistoryScreen = () => {
    this.props.navigation.navigate(DEPOSIT);
  };

  render() {
    const {paddingHorizontal, networkCode, selectNetwork, srvTelcos} = this.props;
    return (
      <View style={paddingHorizontal ? [styles.container, {paddingHorizontal: paddingHorizontal}] : styles.container}>
        <View style={styles.historyArea}>
          <Text style={[texts.h4, {fontWeight: 'bold'}]}>{getString('CHOOSE_NETWORK')}</Text>
        </View>
        <View style={styles.selectPhoneAndService}>
          <FlatList
            data={srvTelcos}
            keyExtractor={(item, index) => index}
            horizontal={true}
            renderItem={({item, index}) =>
              <TouchableOpacity
                style={networkCode === item.telco ? styles.selectedImageNetwork : styles.imageNetwork}
                onPress={()=> selectNetwork(item.telco)}>
                <Image
                  source={NETWORK_SQUARE[item.telco]}
                  style={styles.image}
                  resizeMode={'contain'}/>
              </TouchableOpacity>
            }
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: width,
    backgroundColor: COLOR.BACKGROUND_COLOR,
    paddingHorizontal: scaleModerate(15),
    paddingVertical: scaleVertical(20),
  },
  historyArea: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  selectPhoneAndService: {
    marginTop: scaleVertical(10),
    paddingVertical: scaleVertical(2)
  },
  imageNetwork: {
    height: scaleModerate(70),
    width: scaleModerate(70),
    marginRight: scaleModerate(10),
    borderRadius: scaleModerate(4),
    borderWidth: scaleModerate(3),
    borderColor: 'transparent',
  },
  selectedImageNetwork: {
    height: scaleModerate(70),
    width: scaleModerate(70),
    marginRight: scaleModerate(10),
    borderRadius: scaleModerate(8),
    borderWidth: scaleModerate(3),
    borderColor: COLOR.PURPLE_FONTCOLOR,
  },
  image:{
    height: '100%',
    width: '100%',
    borderRadius: scaleModerate(4)
  }
});
