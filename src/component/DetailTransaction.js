import React, { Component } from 'react';
import { View, Text } from "react-native";

import { convertToRupiah } from "../constants/functions";
import { floatLeft, uppercase, textRight } from "../constants/styles";

class DetailTransaction extends Component {
  render() {
    const {subtotal, discount, service, tax, total} = this.props.data;
    
    return (
      <View>
        <View style={[floatLeft, {borderBottomColor: '#dedede', borderBottomWidth: 1, paddingVertical: 5}]}>
          <View style={{flex: 1}}>
            <Text>Subtotal</Text>
          </View>
          <View style={{flex: 1}}>
            <Text style={textRight}>{convertToRupiah(new Number(subtotal))}</Text>
          </View>
        </View>
        <View style={[floatLeft, {borderBottomColor: '#dedede', borderBottomWidth: 1, paddingVertical: 5}]}>
          <View style={{flex: 1}}>
            <Text>Discount</Text>
          </View>
          <View style={{flex: 1}}>
            <Text style={textRight}>{convertToRupiah(new Number(discount))}</Text>
          </View>
        </View>
        <View style={[floatLeft, {borderBottomColor: '#dedede', borderBottomWidth: 1, paddingVertical: 5}]}>
          <View style={{flex: 1}}>
            <Text>Service Charge (5.5%)</Text>
          </View>
          <View style={{flex: 1}}>
            <Text style={textRight}>{convertToRupiah(new Number(service))}</Text>
          </View>
        </View>
        <View style={[floatLeft, {borderBottomColor: '#dedede', borderBottomWidth: 1, paddingVertical: 5}]}>
          <View style={{flex: 1}}>
            <Text>TAX (10%)</Text>
          </View>
          <View style={{flex: 1}}>
            <Text style={textRight}>{convertToRupiah(new Number(tax))}</Text>
          </View>
        </View>
        <View style={[floatLeft, {borderBottomColor: '#dedede', borderBottomWidth: 1, paddingVertical: 5}]}>
          <View style={{flex: 1}}>
            <Text style={[uppercase, {fontWeight: "700"}]}>Total</Text>
          </View>
          <View style={{flex: 1}}>
            <Text style={[textRight, {fontWeight: "700"}]}>{convertToRupiah(new Number(total))}</Text>
          </View>
        </View>
      </View>
    )
  }
}

export default DetailTransaction;
