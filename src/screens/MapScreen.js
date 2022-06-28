import React from 'react';
import { Text, Button, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { StyleSheet, Image, TouchableOpacity, ActivityIndicator, TextInput } from 'react-native'; //
import MapView, { Circle, Marker } from "react-native-maps";
import * as Location from 'expo-location';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const MapScreen = (props) => {

    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [dynamicRadius, setDynamicRadius] = useState(1000);
    const [temporaryRadius, setTemporaryRadius] = useState(0);

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

        

            <View style = {{backgroundColor:'red', height:400, width:300,}}>

            { <MapView
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
                <Circle
                    key={"x1"}
                    center={{ latitude: -22.604461, longitude: -43.444031 }}
                    radius={20000}
                    fillColor={"#FF39337D"}
                    strokeColor={"#FF39337D"}
                />

                <Circle
                    key={"x2"}
                    center={{ latitude: -22.604461, longitude: -42.444031 }}
                    radius={10000}
                    fillColor={"#FF39337D"}
                    strokeColor={"#FF39337D"}
                />

                <Circle
                    key={"x3"}
                    center={{ latitude: -21.804461, longitude: -43.44031 }}
                    radius={20000}
                    fillColor={"#FF39337D"}
                    strokeColor={"#FF39337D"}
                />

                <Circle
                    key={"x4"}
                    center={{ latitude: -21.804461, longitude: -41.44031 }}
                    radius={15000}
                    fillColor={"#FF39337D"}
                    strokeColor={"#FF39337D"}
                />

                <Circle
                    key={"x5"}
                    center={{ latitude:location.coords.latitude, longitude: location.coords.longitude }}
                    radius={dynamicRadius}
                    fillColor={"#FF550000"}
                    strokeColor={"blue"}
                />

                <Circle
                    key={"x6"}
                    center={{ latitude: -18.804461, longitude: -42.04031 }}
                    radius={1500}
                    fillColor={"#FF39337D"}
                    strokeColor={"#FF39337D"}
                />
            </MapView>}



            </View>
            <View style={{ height:300 , backgroundColor: '#D8D7D7', alignItems: 'center', paddingTop: 20,}}>

            
            <Text >Coloque um novo raio para ser mostrada no mapa:</Text>

            <View style={{width: '80%', height: 35, backgroundColor: '#fff', borderRadius: 15, paddingHorizontal: 15, paddingTop:3, }}>
                    <TextInput
                        style={styles.input}
                        placeholder="50km"
                        keyboardType="numeric"
                        onChangeText={newText => setTemporaryRadius(newText)}
                    />
                    
            </View> 
            <Text style={{fontSize:5}}>{'\n'}</Text>

            <TouchableOpacity onPress={() => setDynamicRadius(parseInt(temporaryRadius)) & alert(dynamicRadius)} style={styles.buttonSearch}>
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