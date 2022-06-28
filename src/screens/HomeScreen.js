import React from 'react';
import {Text, Button, View} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import {useState, useEffect } from 'react';
import { StyleSheet, Image, TouchableOpacity} from 'react-native'; //
import * as Location from 'expo-location';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const HomeScreen = (props) =>{

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
        //alert(location.coords.longitude+'\n'+location.coords.latitude)

    })();
}, [])

    return (

        <View style={styles.container}>
          <Text style = {styles.MainText}>Bem Vindo ao Mapeamento de Infecções do IDQBRN!</Text>
          <Image style={styles.logo} source={require('../../assets/home.jpeg')} />
          

          <TouchableOpacity onPress={() => props.navigation.navigate('Table')} style={styles.buttonSearch}>
            <Text style={styles.buttonText}>    Consultar casos proximos</Text>
          </TouchableOpacity>

          <View style={{
            width:'100%', height:'3%', backgroundColor: 'white'}} />

          <TouchableOpacity onPress={() => props.navigation.navigate('Map')} style={styles.buttonSearch}>
            <Text style={styles.buttonText}>                  Ver Mapa </Text>
          </TouchableOpacity> 
          
          <View style={{
            width:'100%', height:'7%', backgroundColor: 'white'}} />

          </View>
    )
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: 'white',
      alignItems: 'center',
      justifyContent: 'center',
    },
  
    MainText:{
      color: 'red', 
      fontSize:20,
      marginHorizontal: 13,
    },
    logo: {
      paddingTop: 10,
      width: 360,
      height: 450,
      marginHorizontal: 15,
    },
  
    button: {
      paddingTop: 20,
      backgroundColor: 'red',
      padding: 20,
      borderRadius: 5,
      width:360,
    },
    buttonSearch: {
      backgroundColor: 'red',
      padding: 10,
      borderRadius: 10,
      width:300,
      height: 50,
    },
    buttonText: {
      fontSize: 20,
      color: '#fff',
      alignItems: 'center',
    }
  });
export default HomeScreen;