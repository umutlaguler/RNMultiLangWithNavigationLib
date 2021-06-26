
import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';


export default class ThirdPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  takePhotoFromCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      console.log(image);
    });
  }
  choosePhotoFromGallery = () => {
    ImagePicker.openPicker({
  width: 300,
  height: 400,
  cropping: true
}).then(image => {
  console.log(image);
});
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <TouchableOpacity style = {styles.button}
        onPress = {() => this.takePhotoFromCamera()}>
          <Text>open camera</Text>
        </TouchableOpacity>
        <TouchableOpacity style = {styles.button}
        onPress = {() => this.choosePhotoFromGallery()}>
          <Text>choose from library</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  button: {
    borderWidth:2

  }
})