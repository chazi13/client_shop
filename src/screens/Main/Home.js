import React, { Component } from 'react';
import { View, FlatList, Alert, ActivityIndicator, StyleSheet } from 'react-native';
import { Container, Header, Left, Right, H3, Spinner, Tabs, Tab, Button, Text, ScrollableTab } from "native-base";
import { connect } from "react-redux";
import AsyncStorage from "@react-native-community/async-storage";
import Modal from "react-native-modal";

import MenuItem from "../../component/MenuItem";
import OrderItem from "../../component/OrderItem";
import Bill from "../../component/Bill";

import { getMenus } from "../../_actions/menus";
import { updateStatusOrders, sendOrders } from "../../_actions/orders";
import { getDetailTransaction } from "../../_actions/transaction";
import { incTimer } from "../../_actions/timer";

import { theme, container, borderRadius, floatLeft, backgroundGray, backgroundSecondary, backgroundPrimary } from "../../constants/styles";
import { convertToMinutes } from "../../constants/functions";

class Home extends Component {
  constructor() {
    super();
    
    this.state = {
      countdown: 600,
      tableNum: 0,
      menus: [{
        id: 1,
        name: "..."
      }],
      buttonCofirmColor: "#b5b5b5",
      isModalVisible: false
    }
  }
  
  async componentDidMount() {
    const tableNum = await AsyncStorage.getItem('tableNum');

    await this.props.dispatch(getMenus());

    this.setState({
      tableNum,
      menus: this.props.menus
    });

    setInterval(() => {
      this.setState({
        countdown: this.state.countdown - 1
      });

      this.props.dispatch(incTimer());
    }, 1000);
  }

  _handleConfirm = () => {
    Alert.alert(
      'Confirm orderes',
      'Do you sure to confirm you\'r orders?',
      [
        {text: 'Cancel', style: 'cancel'},
        {text: 'Ok', onPress: () => this._sendData()}
      ],
      {cancelable: true}
    )
  }

  _sendData = async () => {
    const {orders} = this.props;

    const token = await AsyncStorage.getItem('token');

    const headersConfig = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }

    await this.props.dispatch(sendOrders(orders, headersConfig));
    setTimeout(() => {
      this.props.dispatch(updateStatusOrders(headersConfig));
      this.getBill(headersConfig);
    }, 5000);
  }

  getBill = (headers) => {
    this.props.dispatch(getDetailTransaction(headers));
  }

  _toggleModal = () => {
    this.setState({
      isModalVisible: !this.state.isModalVisible
    })
  }

  render() {

    return (
      <Container>
        <Header style={backgroundSecondary} androidStatusBarColor={theme.color.secondary}>
          <Left>
            <H3 style={[borderRadius, {color: '#fff'}]}>{this.state.tableNum}</H3>
          </Left>
          <Right>
            <H3 style={{color: '#fff'}}>
              {convertToMinutes(this.state.countdown)}
            </H3>
          </Right>
        </Header>
        
        <View style={styles.spaceBetween}>
          <View style={{flex: 4}}>
            {this.props.isLoading && (
              <View>
                <Spinner color={theme.color.primary} />
              </View>
            )}
            {!this.props.isLoading && (
              <Tabs renderTabBar={() => (<ScrollableTab />)}>
                {this.state.menus && this.state.menus.map(category => (
                  <Tab 
                    key={category.id} 
                    heading={category.name}
                    textStyle={{color: '#fff'}}
                    tabStyle={backgroundSecondary}
                    activeTabStyle={backgroundSecondary}
                  >
                    <FlatList
                      style={[container, styles.flatClear]}
                      data={category.menus}
                      numColumns={2}
                      renderItem={({item}) => (<MenuItem data={item} />)}
                      keyExtractor={item => item.id.toString()}
                      ListFooterComponentStyle={{paddingVertical: 100}}
                    />
                  </Tab>
                ))}
              </Tabs>
            )}
          </View>

          <View style={[container, floatLeft, styles.orderList]}>
            <View style={[container, {flex: 3}]}>
              <View style={[borderRadius, container, backgroundGray, styles.orderContainer]}>
                <Text>Your orders:</Text>
                <FlatList
                  horizontal={true}
                  data={this.props.orders}
                  keyExtractor={(item) => item.id.toString()}
                  renderItem={({item}) => (<OrderItem data={item} />)}
                />
              </View>
            </View>

            <View style={[container, {flex: 2}]}>
              <View style={styles.row}>
                <View style={styles.col}>
                  <Button disabled={this.props.orders.length > 0 ? false : true} full block onPress={this._handleConfirm} style={[borderRadius, styles.buttonPrimary, {backgroundColor: (this.props.orders.length > 0 ? theme.color.secondary : this.state.buttonCofirmColor)}]}>
                    {this.props.ordersLoading && (
                      <ActivityIndicator color="#fff" />
                    )}
                    {!this.props.ordersLoading && (
                      <Text>Confirm</Text>
                    )}
                  </Button>
                </View>
                <View style={[styles.col, {paddingTop: 10}]}>
                  <Button full onPress={this._toggleModal} style={[borderRadius, backgroundPrimary]}>
                    <Text>View Bill</Text>
                  </Button>
                </View>
              </View>
            </View>
          </View>
        </View>

        <Modal isVisible={this.state.isModalVisible}>
          <Bill _toggleModal={this._toggleModal} navigation={this.props.navigation} />
        </Modal>
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isLoading: state.menus.isLoading,
    menus: state.menus.menus,
    message: state.menus.message,
    orders: state.orders.orders,
    ordersLoading: state.orders.isLoading
  }
}

export default connect(mapStateToProps)(Home);

const styles = StyleSheet.create({
  spaceBetween: {
    flex:1, justifyContent: "space-between"
  },
  flatClear: {
    marginHorizontal: -5, 
    paddingTop: 5
  },
  row: {
    marginHorizontal: -6
  },
  col: {
    paddingHorizontal: 3
  },
  orderList: {
    flex: 1,
    paddingVertical: 5, 
    marginHorizontal: -10
  },
  orderContainer: {
    height: 130, 
    borderWidth: 1, 
    paddingVertical: 10,
    borderColor: '#dedede'
  },
  buttonPrimary: {
    // height: '60%'
  }
})
