import React, { Component } from "react";
import { View, Image, StyleSheet } from "react-native";
import { Container, Content, Button, H3, Text } from 'native-base';

import { theme, container, formGroup, centeredItems, pt5, textCenter, borderRadius } from "../constants/styles";

class Finished extends Component {
  
  _handleNavigate = () => {
    this.props.navigation.navigate('Splash');
  }

  render() {
    return (
      <Container>
        <Content style={[container]}>
          <View style={[centeredItems, {height: theme.dimensions.height}]}>
            <View style={{flex: 1}}>
              <Image 
                source={require('../assets/images/thanks.png')} 
                style={styles.imageLogo}
              />
            </View>
        
            <View style={[formGroup, pt5]}>
              <H3 style={textCenter}>Thank You!</H3>
              <Text style={textCenter}>We hope you come again!</Text>
              <Text style={textCenter}>Have a nice day!</Text>
            </View>
        
            <View style={{pt5, flex: 1}}>
              <Button block onPress={this._handleNavigate} style={[borderRadius, {backgroundColor: theme.color.secondary}]}>
                <Text>Go Home</Text>
              </Button>
            </View>
          </View>
        </Content>
      </Container>
    )
  }
}

export default Finished;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: -30, 
    height: theme.dimensions.height
  },
  imageLogo: {
    flex: 1, 
    width: theme.dimensions.width - 30, 
    height: 200, 
    resizeMode: 'contain'
  }
})
