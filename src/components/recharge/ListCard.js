import React, {Component} from 'react';
import {
  View,
  FlatList
} from 'react-native';
import {scaleVertical} from '../../constant/Scale';
import ItemRechargeList from './ItemRechargeList';

export default class ListCard extends Component{
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data
    }
  }

  componentDidMount(){
    const data = this._addSelectedPropsToMoney(this.state.data);
    this.setState({data})
  }

  _addSelectedPropsToMoney = (amounts) => {
    let newArray = [];
    amounts.map((item, index) => {
      const newItem = {amount: item, isSelected: false};
      newArray.push(newItem);
    });
    return newArray;
  };

  _selectItem = (selectedItem, selectedIndex) => {
    const {data} = this.state;
    selectedItem.isSelected = true;
    data.map((item,index)=>{
      if (item.isSelected && index !== selectedIndex){
        item.isSelected = false
      }
    });
    data[selectedIndex] = selectedItem;
    this.setState({data});
  };

  render(){
    const {data} = this.state;
    const {discount} = this.props;
    return (
      <FlatList
        style={{marginTop: scaleVertical(5)}}
        numColumns={3}
        data={data}
        keyExtractor={(item, index) => index}
        renderItem={({item, index}) =>
          <ItemRechargeList
            data={item}
            discount={discount}
            selected={item.isSelected}
            onPress={() => this._selectItem(item, index)}/>}
      />
    )
  }
}
