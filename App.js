import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect } from 'react';
import { StyleSheet, Text, View} from 'react-native'; //
import * as Location from 'expo-location';//


export default function App() {//

  const [errorMessage, setErrorMessage] = useState(null)
  const [location, setLocation] = useState(null);

  useEffect (() => {
    load()
  }, [])

  async function load() {
    
    try{
      let { status } = await Location.requestBackgroundPermissionsAsync()

      if (status != 'granted'){
        setErrorMessage('Permita a localizacao do aplicativo para correto funcionamento')
        return
      }
      //alert('location status: ' + status)
      //alert('location: Rio de Janeiro' )
      let location = await Location.getCurrentPositionAsync({})
      setLocation(location)
      latitude = location.coords.latitude
      longitude = location.coords.latitude


    } catch (error) {}
  }
  return (
    <View style={styles.container}>
      <Text>Osdasadsa</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
