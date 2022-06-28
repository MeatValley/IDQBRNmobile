import React from 'react';
import { Text, Button, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { StyleSheet, Image, TouchableOpacity, ActivityIndicator, TextInput } from 'react-native'; //
import MapView, { Circle, Marker } from "react-native-maps";
import * as Location from 'expo-location';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {notInRange} from '../api/api'
import { LogData } from 'react-native/Libraries/LogBox/LogBox';


const MapScreen = (props) => {

    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [dynamicRadius, setDynamicRadius] = useState(5);
    const [cities, setCities] = useState([])
    const [temporaryRadius, setTemporaryRadius] = useState(0);
    const [initArray, setInitArray] = useState([[-22.604461,-41.04031, 0],[-22.604461,-41.44031,0]]);
    const [circlesListArray, setcirclesListArray] = useState([[-22.604461,-41.04031, 0],[-22.604461,-41.44031,0]]);


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
                <Text style={styles.MainText}> Mapa de Infecções: </Text>
                <Text style={styles.SubText}>O Mapa tem como objetivo mostrar as notificações perto da localização do usuário em tempo real{'\n'}</Text>
            </View>
            <View style={{ backgroundColor: 'red', height: 400, width: 300, }}>
                {<MapView
                    style={styles.map}
                    initialRegion={{
                        latitude: location.coords.latitude,
                        longitude: location.coords.longitude,
                        latitudeDelta: 0.3,
                        longitudeDelta: 0.2,
                    }}
                >
                    {location &&
                        <Marker
                            coordinate={location.coords}
                        ></Marker>
                    }
                    
                    { cities
                    }

                    <Circle
                        key={"user"}
                        center={{ latitude: location.coords.latitude, longitude: location.coords.longitude }}
                        radius={dynamicRadius}
                        fillColor={"#FF550000"}
                        strokeColor={"blue"}
                    />
                </MapView>}
            </View>
            <View style={{ height: 300, backgroundColor: '#D8D7D7', alignItems: 'center', paddingTop: 20, }}>
                <Text >Coloque um novo raio para ser mostrada no mapa:</Text>
                <View style={{ width: '80%', height: 35, backgroundColor: '#fff', borderRadius: 15, paddingHorizontal: 15, paddingTop: 3, }}>
                    <TextInput
                        style={styles.input}
                        placeholder="5km"
                        keyboardType="numeric"
                        onChangeText={newText => setTemporaryRadius(newText)}
                    />

                </View>
                <Text style={{ fontSize: 5 }}>{'\n'}</Text>
                <TouchableOpacity onPress={() => {
                    setDynamicRadius(parseInt(temporaryRadius)) & alert(dynamicRadius)
                    alert(dynamicRadius)
                    notInRange(location.coords.latitude, location.coords.longitude, dynamicRadius)
                        .then(data => {
                            var list = []
                            data.forEach(e => list.push(<Circle
                                center={{ latitude: Number(e.latitude), longitude: Number(e.longitude) }}
                                radius={Math.max(Math.sqrt(Number(e.casos)),Number(1000))}
                                fillColor={"#FF39337D"}
                                strokeColor={"#FF39337D"}
                                />))

                            setCities(list);
                            console.log('------------------------------------------');
                            console.log(cities);
                        }
                        )
                        .catch(error => {
                            alert(error.message);
                            throw error;
                        });

                }} style={styles.buttonSearch}>
                    <Text style={styles.buttonText}>                     Atualizar </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff', },

    MainText: { fontSize:25, fontWeight: 'bold', },
    map: { flex: 1, width:360, borderRadius: 25, paddingHorizontal:10, },

    buttonSearch: {
        backgroundColor: 'red',
        padding: 10,
        borderRadius: 10,
        width: 300,
        height: 50,
    },
    SubText:{
        fontSize: 12,
        color: 'grey',
        alignItems: 'center',
        paddingHorizontal:12
    },

    buttonText: {
        fontSize: 20,
        color: '#fff',
        alignItems: 'center',
    },

});


export default MapScreen;