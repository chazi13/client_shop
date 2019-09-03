import React, { Component } from 'react';
import { View, Image, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { Container, Content, Form, Item, Input, Icon, Button, H3, Text, Spinner} from 'native-base';
import AsyncStorage from "@react-native-community/async-storage";

import { theme, container, formGroup, centeredItems, pt5, textCenter, borderRadius, backgroundGray } from "../constants/styles";
import { regisTable } from "../_actions/transaction";

class TableNum extends Component {
  constructor() {
    super();
    this.state = {
      tableNum: 0,
      buttonDisabled: false
    }
  }

  componentDidMount() {
    this.setState({
      buttonDisabled: true
    });
  }

  _handleInput = (num) => {
    this.setState({
      tableNum: num
    });

    if (num !== '') {
      this.setState({
        buttonDisabled: false
      });
    } else {
      this.setState({
        buttonDisabled: true
      });
    }
  }

  _handleSubmit = async () => {
    if (this.state.tableNum == 0) {
      alert('Please insert your table number');
    } else {
      const data = {
        table: this.state.tableNum
      }

      try {
        await this.props.dispatch(regisTable(data));
        
        await AsyncStorage.setItem('token', this.props.token.toString());
        await AsyncStorage.setItem('tableNum', this.props.tableNum.toString());
        
        this.props.navigation.navigate('Main');
      } catch (err) {
        alert('Cannot register your table! \nPlease try again!');
      }
    }
  }

  render() {
    return (
      <Container style={backgroundGray}>
        <Content style={[container]}>
          <View style={[centeredItems, styles.container]}>
            <View style={styles.imageContainer}>
              <Image 
                source={require('../assets/images/logo.png')} 
                style={styles.imageLogo}
              />
            </View>

            <View style={[formGroup, pt5]}>
              <H3 style={textCenter}>Welcome!</H3>
              <Text style={textCenter}>Let we know where your table</Text>
            </View>
          
            <Form style={[formGroup, styles.input]}>
              <Item regular style={borderRadius}>
                {/* <Icon name='ios-keypad' /> */}
                <Input placeholder="Insert your table number here" keyboardType="numeric" onChangeText={this._handleInput} style={{textAlign: "center"}} />
              </Item>
            </Form>
          
            <View>
              <Button disabled={this.state.buttonDisabled} block onPress={this._handleSubmit} style={[borderRadius, {backgroundColor: (this.state.buttonDisabled ? theme.color.grey : theme.color.secondary)}]}>
                {this.props.isLoading && (
                  <Spinner color="#fff" />
                )}
                {!this.props.isLoading && (
                  <Text style={{color: (this.state.buttonDisabled ? '#5a5a5a' : '#fff')}}>Let's order</Text>
                )}
              </Button>
            </View>
          </View>
        </Content>
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isLoading: state.transaction.isLoading,
    token: state.transaction.token,
    tableNum: state.transaction.tableNum,
    message: state.transaction.message
  }
}

export default connect(mapStateToProps)(TableNum);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: -30, 
    height: theme.dimensions.height
  },
  imageContainer: {
    height: 200
  },
  imageLogo: {
    flex: 1, 
    width: theme.dimensions.width - 30, 
    height: 200, 
    resizeMode: 'contain'
  },
  input: {
    paddingLeft: 15
  }
})
