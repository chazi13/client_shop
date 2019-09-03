import React, { Component } from "react";
import { TouchableOpacity, View, ActivityIndicator, FlatList, StyleSheet } from "react-native";
import { Container, Content, Header, Body, Right, Icon, H3, Text, Button, Spinner } from "native-base";
import AsyncStorage from "@react-native-community/async-storage";
import { connect } from "react-redux";

// Action
import { getDetailTransaction, finishTransaction } from "../_actions/transaction";

import { theme, container, borderRadius, textCenter, uppercase, backgroundGray, textBold } from "../constants/styles";
import OrderList from "./OrderList";
import DetailTransaction from "./DetailTransaction";

class Bill extends Component {
  constructor() {
    super();

    this.state = {
      headersConfig: {},
      buttonDisabled: false
    }
  }
  
  async componentDidMount() {
    const token = await AsyncStorage.getItem('token');

    const headersConfig = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
    
    this.setState({
      headersConfig
    });

    await this.getBill(headersConfig);

    this.checkOrders();
    setInterval(() => {
      this.checkOrders();
    }, 1000);
  }

  getBill = async (headers) => {
    await this.props.dispatch(getDetailTransaction(headers));
  }

  checkOrders = () => {
    if (this.props.orders.length < 1) {
      this.setState({
        buttonDisabled: true
      });
    } else {
      const statusFalse = this.props.orders.filter(val => val.status == 0)
      if (statusFalse.length > 0) {
        this.setState({
          buttonDisabled: true
        });
      } else {
        this.setState({
          buttonDisabled: false
        });
      }
    }
  }

  _handleCall = async () => {
    const data = {
      ...this.props.transaction,
      finishedTime: this.props.timer
    }

    try {
      await this.props.dispatch(finishTransaction(data, this.state.headersConfig));
    
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('tableNum');

      this.props.navigation.navigate('Finished');
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    return (
      <Container style={borderRadius}>
        <Header style={backgroundGray} androidStatusBarColor={theme.color.grey}>
          <Body>
            <Text style={[uppercase, textBold]}>Bill</Text>
          </Body>
          <Right>
            <TouchableOpacity onPress={this.props._toggleModal}>
              <Icon name="close" />
            </TouchableOpacity>
          </Right>
        </Header>
        <Content style={container}>
          {this.props.isLoading && (
            <View>
              <ActivityIndicator color={theme.color.primary} />
            </View>
          )}

          {this.props.orders && (
            <FlatList
              data={this.props.orders}
              renderItem={({item}) => (<OrderList data={item} />)}
              keyExtractor={item => item.id.toString()}
            />
          )}
          
          {this.props.orders.length < 1 && (
            <View style={styles.void}>
              <H3 style={textCenter}>You not order nothing!</H3>
              <Text style={textCenter}>Please order something first</Text>
            </View>
          )}
        </Content>
        <View style={[container, styles.transactionContainer]}>
          <DetailTransaction data={this.props.transaction} />
          <Button disabled={this.state.buttonDisabled} full onPress={this._handleCall} style={[borderRadius, {backgroundColor: (this.state.buttonDisabled ? theme.color.grey : theme.color.primary)}]}>
            {this.props.isLoading && (
              <Spinner color="#fff" />
            )}
            {!this.props.isLoading && (
              <Text>Submit</Text>
            )}
          </Button>
        </View>
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    orders: state.transaction.orders,
    transaction: state.transaction.transaction,
    isLoading: state.transaction.isLoading,
    message: state.transaction.message,
    timer: state.timer
  }
}

export default connect(mapStateToProps)(Bill);

const styles =  StyleSheet.create({
  void: {
    flex: 1, 
    paddingVertical: 50
  },
  transactionContainer: {
    paddingBottom: 10, 
    justifyContent: "flex-end"
  }
})
