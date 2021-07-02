import React, { Component } from 'react';
import {View,Text, Dimensions, StyleSheet, Image, FlatList, SafeAreaView } from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { Polyline } from 'react-native-maps';
import { Actions } from 'react-native-router-flux';
import { PhoneHeight, PhoneWidth, responsiveSize } from "./components/config/env";

const screenWidth = Dimensions.get("window").width;
const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE =  36.993973;
const LONGITUDE =35.310351;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const GOOGLE_MAPS_APIKEY = 'AIzaSyA8XGpw_fiNULa4CcnkzCAgg4J5STrNuzs';

class Maps extends Component {

    constructor(props) {
        super(props);
    
    this.state = {
        coordinates: [
          {
            // id:"1",
            // title: "umut",
            latitude:  37.027107,
            longitude: 35.271128,
          },
          {
            // id:"12",
            // title: "umut",
            latitude:37.033959,
            longitude:35.339449,
          },
          {
            // id:"132323",
            // title: "umut",
            latitude:36.982417,
            longitude: 35.321425,
          },
          {
            // id:"41",
            // title: "umut",
            latitude:36.961022,
            longitude:35.313354,
          },
          {
            // id:"51",
            // title: "umut",
            latitude: 36.994680,
            longitude: 35.294817,
          },
           {
            //  id:"61",
            // title: "umut",
            latitude: 36.994680,
            longitude: 35.294817,
          },
  
        ],
      };
      this.mapView = null;
}
// onMapPress = (e) => {//mape tıkladıgın yere marker koymayı sağlar 
//     this.setState({
//       coordinates: [
//         ...this.state.coordinates,
//         e.nativeEvent.coordinate,
//       ],
//     });
//   }
haversine = require('haversine')

 start = {
  latitude:  37.027107,
  longitude: 35.271128,
}

 end = {
  latitude:36.961022,
            longitude:35.313354,
}

 locationRenderItem = () => {
   console.log("umut");
   this.state.coordinates.map((item)=>console.log("title",item.title));
   return(
<View style={[styles.cardWrapper, { height: PhoneHeight * 0.1, width:PhoneWidth * 0.8}]}>
  <Image
      source={require('./images/userBackground.png')}
      style={styles.memberCardImage}
      resizeMode="cover" />
  <View style={{ justifyContent: 'space-around', }}>

  </View>
</View>
)
 }
 onViewableItemsChanged = ({ viewableItems, changed }) => {
   console.log("changed ", changed);
  changed.map(changedData => {
      if(changedData.isViewable == true) {
        console.log("changed in if", changedData);
          this.mapView.animateToRegion({
              latitude: parseFloat(changedData.item.latitude),
              longitude: parseFloat(changedData.item.longitude),
              latitudeDelta: 0.01,
              longitudeDelta: 0.01
      }, 700)
      }
  })
}

  render() {
    console.log("dflsşfsd",this.haversine(this.start, this.end))
console.log(this.haversine(this.state.coordinates[0], this.state.coordinates[1], {unit: 'mile'}),"mile")
console.log(this.haversine(this.state.coordinates[0], this.state.coordinates[1], {unit: 'meter'}),"meter")
console.log(this.haversine(this.start, this.end, {threshold: 1}))
console.log(this.haversine(this.start, this.end, {threshold: 1, unit: 'mile'}))
console.log(this.haversine(this.start, this.end, {threshold: 1, unit: 'meter'}))
    console.log("zeynep");
    return ( 
      <View style = {styles.container}>
      
         <MapView
            rotateEnabled={false}
            initialRegion={{
            latitude: LATITUDE,
            longitude: LONGITUDE,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }}
            style={StyleSheet.absoluteFill}
            ref={c => this.mapView = c}
            //onpress gelecek
        >
           {this.state.coordinates.map((coordinate, index) =>//burası markerları katıyor
            <MapView.Marker key={`coordinate_${index}`} coordinate={coordinate} />
          )}
           <MapViewDirections
              origin={this.state.coordinates[0]}
              waypoints={ (this.state.coordinates.length > 2) ? this.state.coordinates.slice(1, -1): null}
              destination={this.state.coordinates[this.state.coordinates.length-1]}
              apikey={GOOGLE_MAPS_APIKEY}
              strokeWidth={3}
              strokeColor="purple"
              optimizeWaypoints={true}
              onStart={(params) => {
                console.log(`Started routing between "${params.origin}" and "${params.destination}"`);
              }}
              onReady={result => {
                console.log(`Distance: ${result.distance} km`)
                console.log(`Duration: ${result.duration} min.`)
  
                this.mapView.fitToCoordinates(result.coordinates, {
                  edgePadding: {
                    right: (width / 20),
                    bottom: (height / 20),
                    left: (width / 20),
                    top: (height / 20),
                  }
                });
              }}
              onError={(errorMessage) => {
                //console.log('GOT AN ERROR',errorMessage);
              }}
            />
           </MapView> 
           <SafeAreaView style={{ height: PhoneHeight, width: '100%', position: 'absolute', justifyContent: 'space-between'}}>
           <FlatList
            pagingEnabled
            onViewableItemsChanged={this.onViewableItemsChanged}
            horizontal
            style={styles.companiesContainer}
            viewabilityConfig={{
              itemVisiblePercentThreshold: 100,
            }}
              keyExtractor={(item) => item.id}
              data={this.state.coordinates}
              renderItem={this.locationRenderItem} />
          </SafeAreaView>
    </View>
      );
      
   } 
}
          {/* <Polyline 
          strokeColors={[//araya cizilecek rgb renkler 
            '#7F0000',
            '#00000000', // no color, creates a "long" gradient between the previous and next coordinate
            '#B24112',
            '#E5845C',
            '#238C23',
            '#7F0000'
          ]}
          strokeWidth={6}
           coordinates={[//bu data aralarına çizgi cekip markerları birleştirmek için kullanıyor
            {
              latitude:  36.993973,
              longitude: 35.310351,
            },
            {
              latitude:36.993608,
              longitude:35.311605,
            },
            {
              latitude:36.993608,
              longitude:35.311605,
            },
            {
              latitude:36.992932,
              longitude:35.313354,
            },
            {
              latitude: 36.994680,
              longitude: 35.313998,
            },
          ]}
          /> */}
         
        // {(this.state.coordinates.length >= 2) && (
        //     <MapViewDirections
        //       origin={this.state.coordinates[0]}
        //       waypoints={ (this.state.coordinates.length > 2) ? this.state.coordinates.slice(1, -1): null}
        //       destination={this.state.coordinates[this.state.coordinates.length-1]}
        //       apikey={GOOGLE_MAPS_APIKEY}
        //       strokeWidth={3}
        //       strokeColor="purple"
        //       optimizeWaypoints={true}
        //       onStart={(params) => {
        //         console.log(`Started routing between "${params.origin}" and "${params.destination}"`);
        //       }}
        //       onReady={result => {
        //         console.log(`Distance: ${result.distance} km`)
        //         console.log(`Duration: ${result.duration} min.`)
  
        //         this.mapView.fitToCoordinates(result.coordinates, {
        //           edgePadding: {
        //             right: (width / 20),
        //             bottom: (height / 20),
        //             left: (width / 20),
        //             top: (height / 20),
        //           }
        //         });
        //       }}
        //       onError={(errorMessage) => {
        //         //console.log('GOT AN ERROR',errorMessage);
        //       }}
        //     />
        //   )} 
       

const styles = StyleSheet.create({
  container:{
    flex: 1
  },
  cardWrapper: {
    zIndex:1,
    marginHorizontal:PhoneWidth*0.1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginTop: PhoneHeight*0.75,
    height: PhoneHeight * 0.15,
    backgroundColor: '#fff',
    backgroundColor: '#fff',
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
},
memberCardImage: {
  width: responsiveSize(50),
  height: responsiveSize(50),
  borderRadius: responsiveSize(25),
  marginLeft: 15
},


});


export default Maps;