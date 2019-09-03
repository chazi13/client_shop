import React, { Component } from 'react';
import { View } from "react-native";
import { Container, Content, Spinner, Text } from 'native-base';
import AsyncStorage from "@react-native-community/async-storage";

import { fullScreen, centeredItems, textCenter } from "../constants/styles";

class Splash extends Component {
  constructor() {
    super();
  }

  componentDidMount = async () => {
    const token =  await AsyncStorage.getItem('token');
    if (!token) {
      this.props.navigation.navigate('TableNum');
    } else {
      this.props.navigation.navigate('Main');
    }
  }

  render() {
    return (
      <Container>
        <Content>
          <View style={[fullScreen, centeredItems]}>
            <Spinner color="#fd9644" />
            <Text style={textCenter}>Checking data ...</Text>
          </View>
        </Content>
      </Container>
    )
  }
}

export default Splash;
