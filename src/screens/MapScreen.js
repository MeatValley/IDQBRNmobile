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


const MapScreen = (props) => {

    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [dynamicRadius, setDynamicRadius] = useState(1000);
    const [cities, setCities] = useState([])
    const [temporaryRadius, setTemporaryRadius] = useState(0);
    const [initArray, setInitArray] = useState([[-22.604461,-41.04031, 300],[-22.604461,-41.44031,20000]])
    const [disease, setDisease] = useState('')
    const [circlesList, setCircleList] = useState( [       
    <Circle      
        center={{latitude: 0, longitude:0 }}
        radius={200000}
        fillColor={"#fff0"}
        strokeColor={"#FF39337D"}
    />,
    <Circle      
        center={{latitude: 0, longitude:-10 }}
        radius={200000}
        fillColor={"#fff0"}
        strokeColor={"#FF39337D"}
    />
    ]              

    )


    const circlesListArray = [];
    


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

     for(let i = 0; i< initArray.length; i++){
        circlesListArray.push(                
             <Circle
                 center={{latitude:initArray[i][0], longitude:initArray[i][1]}}
                 radius={15*initArray[i][2]}
                 fillColor={"#FF39337D"}
                strokeColor={"#FF39337D"}
            />
        );
     }
     setCircleList(circlesListArray)

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
                
                {circlesListArray}

                {circlesList}

                <Circle
                    key={"user"}
                    center={{ latitude:location.coords.latitude, longitude: location.coords.longitude }}
                    radius={dynamicRadius}
                    fillColor={"#FF550000"}
                    strokeColor={"blue"}
                />

                
            </MapView>}



            </View>
            <View style={{ height:300 , backgroundColor: '#D8D7D7', alignItems: 'center', paddingTop: 3,}}>
            
            <Text style = {{padding:6}} >Coloque um novo filtro para ser mostrada no mapa:</Text>

            <View style={{width: '80%', height: 35, backgroundColor: '#fff', borderRadius: 15, paddingHorizontal: 15, paddingTop:3, }}>
                    <TextInput
                        style={styles.input}
                        placeholder="Distância a partir de você (km): 50 km"
                        keyboardType="numeric"
                        onChangeText={newText => setTemporaryRadius(newText)}
                    />
                    
            </View> 
            <Text>{''}</Text>
            
            <View style={{width: '80%', height: 35, backgroundColor: '#fff', borderRadius: 15, paddingHorizontal: 15, paddingTop:3, }}>

                    <TextInput
                        style={styles.input}
                        placeholder="Nome da Doença"
                        keyboardType="string"
                        onChangeText={newText => setDisease(newText)}
                    />
                    
            </View> 
            <Text style={{fontSize:5}}>{'\n'}</Text>

            <TouchableOpacity onPress={() =>{
                setDynamicRadius(parseInt(temporaryRadius)) & alert(dynamicRadius)
                alert(dynamicRadius)
                notInRange(location.coords.latitude, location.coords.longitude, dynamicRadius)
                .then( data => {
                    
                    setCities(data);
                    console.log(cities)
                }
                )
                .catch(error=>{
                    alert(error.message);
                    throw error;
                });

            } } style={styles.buttonSearch}>
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
        padding: 5,
        borderRadius: 10,
        width: 300,
        height: 40,
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