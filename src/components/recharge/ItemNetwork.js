import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity
} from 'react-native';
import * as Layout from '../../constant/Layout'
import * as COLOR from '../../constant/Colors'

const {width, height} = Layout.window;

export default class ItemNetwork extends Component{
  constructor(props) {
    super(props);
  }

  render(){
    const {isSelected, name, discount, logo} = this.props
    return(
      <TouchableOpacity>

      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  item:{
    flex:1,
    height: height/10,
  }
});
