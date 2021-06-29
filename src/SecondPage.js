
import React, { Component } from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity, Modal, ScrollView,FlatList } from "react-native";
import { PhoneHeight, PhoneWidth, responsiveSize } from "./components/config/env";
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import CameraRoll from "@react-native-community/cameraroll";
import PhotosRenderItem from "./helpers/PhotosRenderItem";
import { getPhotosFromCameraRoll, uploadPhotos } from "./actions/SecondPageAction";
import {connect} from 'react-redux';


class SecondPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      imageUri: ""
    };
  }
  setModalVisible = (visible) => {
    this.setState({modalVisible: visible});

  }
  setImageUri = (data) => {
    this.setState({ imageUri:data })
  }
  openCamera = () => {//to open camera by using cameraroll ready func.
    const options = {
        storageOptions: {
            path: "images",
            mediaType: "photo"
        },
        includeBase64: true
    };
    launchCamera(options, (response => {
        if(response.error) {
            console.log("Camera Error: ", response.error);
        } 
        else {
            this.setState({imageUri:response.assets[0].uri});
        }
    }));
  };
  openGallery = () => {//to open gallery by using cameraroll ready func.
    const options = {
        storageOptions: {
          path: "images",
          mediaType: "photo"
        },
        includeBase64: true
    };
    launchImageLibrary(options, (response => {
        if (response.error) {
            console.log('LaunchImageLibrary Error: ', response.error);               
        }
        else {
            this.setState({imageUri:response.assets[0].uri});
        }
    }))
  };
  getPhotosByAlbum = () => {
    this.setState({ modalVisible:true });
    CameraRoll.getPhotos({
        first: 1000,
        assetType: "Photos",
    }).then(r => {
    console.log("zz: ", r.edges);
    this.props.getPhotosFromCameraRoll(r.edges) 
   })
  }
  closePhotosModal = (value) => {
    this.setState({ modalVisible:false });
    value.map((item) => {
        let localUri =  item.node.image.uri;
        console.log("local uri : ", localUri);
        var photo = {
            uri: localUri,
            type: "image/jpeg",
            name: "photo.jpg"
        }
        let formData = new FormData();
        formData.append('media_url', photo)
        formData.append('title', "fotograf")
        formData.append('user_id', 2)
        formData.append('description', "bu bir güzel foto")
        this.props.uploadPhotos(formData)
    })  
  }

  render() {
    const { modalVisible } = this.state;
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View style = {styles.buttonsContainer}>
          <TouchableOpacity style = {styles.button} onPress = {this.getPhotosByAlbum}>
              <Image 
                  style = {styles.buttonImg}
                  source = {require('../src/images/folder.png')}/>
            </TouchableOpacity>
        </View>
        <Modal  
            animationType = "slide"
            transparent = {true}
            visible = {modalVisible}
            onRequestClose = {() => {
            this.setModalVisible(!modalVisible);
            }}>  
            <View style = {styles.photosModalContainer}>
                <View style = {styles.modalsOptionsContainer}>
                    <TouchableOpacity style = {styles.saveButton} onPress = {() => this.closePhotosModal(this.props.selectedPhotos)}>
                        <Text>Save</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style = {styles.closeButton} onPress = {() => {this.setModalVisible(false)}}>
                        <Text>Close</Text>
                    </TouchableOpacity>
                </View>
                <FlatList
                    numColumns = {3}
                    data = {this.props.cameraRoll}
                    renderItem = {({item}) => <PhotosRenderItem item= {item}/> }
                    keyExtractor={item => item.id}/>
            </View> 
        </Modal> 
      </View>

    );
  }
}
const styles = StyleSheet.create({
  button: {
    borderWidth: 0,
    marginTop: PhoneHeight * 0.03,
    resizeMode: "contain"
  },
  buttonImg: {
    width: responsiveSize(30),
    height: responsiveSize(30),
    marginLeft: PhoneWidth * 0.05
  },
  buttonsContainer: {
    flexDirection: "row"
},
textBoard: {
  width: PhoneWidth * 0.75,
  height: PhoneHeight * 0.2,
  borderRadius: 12,
  marginTop: PhoneHeight * 0.05,
  backgroundColor: "white",
  borderColor: "black",
  alignItems: "center",
  justifyContent: "center",
  shadowColor: "#000",
  shadowOffset: {
      width: 0,
      height: 4,
  },
  shadowOpacity: 0.32,
  shadowRadius: 12,
  elevation: 9,
},
text: {
  fontSize: responsiveSize(13)
},
buttonsContainer: {
  flexDirection: "row"
},
settingsButton: {
  borderWidth: 0,
  marginTop: PhoneHeight * 0.03,
  resizeMode: "contain"
},
settingsIcon: {
  width: responsiveSize(30),
  height: responsiveSize(30)
},
cameraButton: {
  borderWidth: 0,
  marginTop: PhoneHeight * 0.03,
  resizeMode: "contain"
},
cameraIcon: {
  width: responsiveSize(30),
  height: responsiveSize(30),
  marginLeft: PhoneWidth * 0.05
},
modalContainer: {
  backgroundColor: "pink",
  width: PhoneWidth * 0.3,
  height: PhoneHeight * 0.1,
  alignSelf: "center",
  marginTop: PhoneHeight * 0.22,
  borderRadius: 12,
  alignItems: "center",
  justifyContent: "center",
},
photosModalContainer: {
  backgroundColor: "white",
  borderTopLeftRadius: 12,
  borderTopRightRadius: 12,
  width: PhoneWidth,
  height: PhoneHeight * 0.6,
  alignSelf: "center",
  marginTop: PhoneHeight * 0.4,
},
modalsOptionsContainer: {
  borderWidth: 0,
  height: PhoneHeight * 0.05,
  backgroundColor: "white",
  borderTopLeftRadius: 12,
  borderTopRightRadius: 12,
},
saveButton: {
  borderTopRightRadius: 12,
  width: PhoneWidth * 0.15,
  height: PhoneHeight * 0.05,
  alignItems: "center",
  justifyContent: "center",
  alignSelf: "flex-end"
},
closeButton: {
  position: "absolute",
  borderTopLeftRadius: 12,
  width: PhoneWidth * 0.15,
  height: PhoneHeight * 0.05,
  alignItems: "center",
  justifyContent: "center",
},
uploadedPhotosContainer: {
  borderWidth: 1,
  width: PhoneWidth * 0.75,
  height: PhoneHeight * 0.2,
  marginTop: PhoneHeight * 0.05,
  flexDirection: "row"
},
uploadedPhotos: {
  width: (PhoneWidth * 0.75) / 2,
  height: PhoneHeight * 0.1
}
})
const mapStateToProps = state => {
  const { cameraRoll, selectedPhotos } = state.SecondPageReducer;
  return {
    cameraRoll,
    selectedPhotos
  }
}
export default connect(
  mapStateToProps,
  {
    getPhotosFromCameraRoll,
    uploadPhotos
  }
)(SecondPage)
