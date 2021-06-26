
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';


export default class SecondPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Second</Text>
    </View>
    );
  }
}