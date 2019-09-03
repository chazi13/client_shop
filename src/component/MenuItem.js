import React, { Component } from "react";
import { Image, TouchableOpacity, View, StyleSheet } from "react-native";
import { Card, CardItem, Body, Right, Icon, Text } from "native-base";
import { connect } from "react-redux";

import { addNewOrders, updateOrderQty } from "../_actions/orders";
import { convertToRupiah } from "../constants/functions";
import { theme, borderRadius, floatLeft } from "../constants/styles";

class MenuItem extends Component {

  _handleAddOrders = async (data) => {
    let orders = this.props.orders;
    const index = orders.findIndex(item => {
      return item.id == data.id
    });

    if (index >= 0) {
      let orderData = orders[index];
      let incQty = orderData.qty + 1;
      let incOrder = {
        ...orderData,
        qty: incQty
      }

      orders[index] = incOrder;
      await this.props.dispatch(updateOrderQty(orders));
    } else {
      data = {
        ...data, 
        qty: 1
      };
      await this.props.dispatch(addNewOrders(data));
    }
  }

  render() {
    const {data} = this.props;
    const {name, price, image, isStared} = data
    
    return (
      <TouchableOpacity onPress={() => this._handleAddOrders(data)} style={styles.cardContainer}>
        <Card style={borderRadius}>
          <CardItem cardBody style={borderRadius}>
            <Image source={{ uri: image }} style={styles.cardImage} />
          </CardItem>
          <CardItem cardBody style={borderRadius}>
            <View style={floatLeft}>
              <Body style={{flex: 8}}>
                <Text>{convertToRupiah(price)}</Text>
                <Text note>{name}</Text>
              </Body>
              <Right style={{flex: 1}}>
                {isStared ? (<Icon name="star" color={theme.color.secondary} />) : (<Text></Text>)}
              </Right>
            </View>
          </CardItem>
        </Card>
      </TouchableOpacity>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    orders: state.orders.orders,
    isLoading: state.orders.isLoading,
    message: state.orders.message
  }
}

export default connect(mapStateToProps)(MenuItem);

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1, 
    paddingHorizontal: 3
  },
  cardImage: {
    height: 100, 
    width: null, 
    flex: 1, 
    borderTopLeftRadius: 5, 
    borderTopRightRadius: 5 
  }
})
