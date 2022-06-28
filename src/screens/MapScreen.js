import React from 'react';
import { Text, Button, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { StyleSheet, Image, TouchableOpacity } from 'react-native'; //
import MapView, { Circle, Marker } from "react-native-maps";
import * as Location from 'expo-location';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const MapScreen = (props) => {

    const [location, setLocation] = useState(0);

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



    return (

        <View>
            <View>
                <Text style={styles.MainText}> Mapa de Infecções </Text>
            </View>

            <TouchableOpacity onPress={() => alert(location.coords.longitude + '\n' + location.coords.latitude)} style={styles.buttonSearch}>
                <Text style={styles.buttonText}>        Ver Mapa </Text>
            </TouchableOpacity>
            
            <View>
                 <MapView
                style={styles.map}
                initialRegion={{
                    latitude: 4.21048,
                    longitude: 101.97577,
                    latitudeDelta: 9.22,
                    longitudeDelta: 4.21,
                }}
            >
                {location &&
                    <Marker
                    coordinate={location.coords}
                    ></Marker>
                }
            </MapView> 
            </View>
 
        </View>

    )

}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff', },

    MainText: { fontSize:25, fontWeight: 'bold', },
    map: { flex: 1 },

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