import React from 'react';
import { Text, Button, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { StyleSheet, Image, TouchableOpacity, ActivityIndicator } from 'react-native'; //
import MapView, { Circle, Marker } from "react-native-maps";
import * as Location from 'expo-location';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const MapScreen = (props) => {

    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
        })();

    }, [])

    if (!location || location.length === 0) {
        return <ActivityIndicator />;}

    return (

        <View>
            <View>
                <Text style={styles.MainText}> Mapa de Infecções </Text>
                { <MapView
                style={styles.map}
                initialRegion={{
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                    latitudeDelta: 10.0,
                    longitudeDelta: 5.0,
                }}
            >
            </MapView>}
                <Text style={styles.MainText}> Moraes brabo dms </Text>
            </View>

            <View style = {{backgroundColor:'red', height:400, width:300,}}>

            { <MapView
                style={styles.map}
                initialRegion={{
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                    latitudeDelta: 9.22,
                    longitudeDelta: 4.21,
                }}

            >
                         {location &&
              <Marker
                  coordinate={location.coords}
                  //icon={require("../../assets/man2.png")}
              ></Marker>
          }
            </MapView>}

            </View>


 
        </View>

    )

}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff', },

    MainText: { fontSize:25, fontWeight: 'bold', },
    map: { flex: 1, },

    buttonSearch: {
        backgroundColor: 'red',
        padding: 10,
        borderRadius: 10,
        width: 300,
        height: 50,
    },

    buttonText: {
        fontSize: 20,
        color: '#fff',
        alignItems: 'center',
    },

});


export default MapScreen;