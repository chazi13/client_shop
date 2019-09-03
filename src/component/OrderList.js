import React, { Component } from 'react';
import { View, Text, StyleSheet } from "react-native";

import { convertToRupiah } from "../constants/functions";
import { theme, floatLeft, uppercase, textRight } from "../constants/styles";

class OrderList extends Component {
  render() {
    const {data: {status, menu, qty, price}} = this.props;
    return (
      <View style={[floatLeft, styles.listItem]}>
        <View style={{flex: 2}}>
          {status ? (
            <Text style={[uppercase, styles.textSent]}>Sent</Text>
          ) : (
            <Text style={[uppercase, styles.textPending]}>Waiting</Text>
          )}
        </View>
        <View style={{flex: 3}}>
          <Text style={uppercase}>{menu.name}</Text>
          <Text>{convertToRupiah(price)} @ {qty}</Text>
        </View>
        <View style={{flex: 2}}>
          <Text style={textRight}>{convertToRupiah(price * qty)}</Text>
        </View>
      </View>
    )
  }
}

export default OrderList;

const styles = StyleSheet.create({
  textSent: {
    color: theme.color.primary
  },
  textPending: {
    color: theme.color.secondary
  },
  listItem: {
    borderBottomColor: theme.color.grey, 
    borderBottomWidth: 1
  }
})
