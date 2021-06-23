import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Router from './Router';
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  
  render() {
    return (
      <Router />
    );
  }
}