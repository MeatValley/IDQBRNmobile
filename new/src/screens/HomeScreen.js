import React from 'react';
import {Text, Button, View} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import {useState, useEffect } from 'react';
import { StyleSheet, Image, TouchableOpacity} from 'react-native'; //
import * as Location from 'expo-location';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const HomeScreen = (props) =>{
    return (
        <View style={styles.container}>
          <TouchableOpacity onPress={() => alert('SELVA!!!')} style={styles.button}>
            <Text style={styles.buttonText}>IDQBRN</Text>
          </TouchableOpacity>

          <Text style = {styles.MainText}>Bem Vindo ao Mapeamento de Infecções do IDQBRN!</Text>
          <Image style={styles.logo} source={require('../../assets/home.jpeg')} />

          <TouchableOpacity onPress={() => props.navigation.navigate('Table')} style={styles.buttonSearch}>
            <Text style={styles.buttonText}>    Consultar casos proximos</Text>
          </TouchableOpacity>
          <StatusBar style="auto" />
          </View>
        // <View>
        //     <Text>Home</Text>
        //     <Button 
        //         title = 'To images'
        //         onPress ={ ()=>{
        //             console.log('clicked');
        //             props.navigation.navigate('Image')
        //         }}
        //     />
        //     <Button 
        //         title = 'To counter'
        //         onPress ={ ()=>{
        //             props.navigation.navigate('Counter')
        //         }}
        //     />
        //     <Button 
        //         title = 'To colors'
        //         onPress ={ ()=>{
        //             props.navigation.navigate('Color')
        //         }}
        //     />
        //     <Button 
        //         title = 'To square'
        //         onPress ={ ()=>{
        //             props.navigation.navigate('Square')
        //         }}
        //     />
        // </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  
    container: {
      alignItems: 'center',
      justifyContent: 'center',
    },
  
    MainText:{
      paddingTop: 50,
      color: 'red', 
      fontSize:20,
      marginHorizontal: 16,
    },
    tinyLogo: {
      width: 50,
      height: 50,
    },
  
    logo: {
      paddingTop: 100,
      width: 360,
      height: 450,
      marginHorizontal: 15,
    },
  
    button: {
      paddingTop: 50,
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