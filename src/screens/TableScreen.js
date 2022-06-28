import React from 'react';
import {Text, Button, View} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import {useState, useEffect } from 'react';
import { StyleSheet, Image, TouchableOpacity, TextInput, ScrollView} from 'react-native'; //
import * as Location from 'expo-location';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import { DataTable } from 'react-native-paper';
import {users, cases, currentCity} from '../api/api'



const TableScreen = () =>{
    
    const CONTENT = {
        tableHead: ['Doenças', 'Munícipio', 'Casos'],
        tableData: [
          ['Dengue', 'RJ', '3'],
          ['Picadas de Cobra', 'Buzios', '14'],
          ['Picadas de Cobra', 'Buzios', '14'],
          ['Picadas de Cobra', 'Buzios', '14'],
          ['Picadas de Cobra', 'Buzios', '14'],
          ['Picadas de Cobra', 'Buzios', '14'],
          ['Picadas de Cobra', 'Buzios', '14'],
          ['Picadas de Cobra', 'Buzios', '14'],
          ['Picadas de Cobra', 'Buzios', '14'],
          ['Picadas de Cobra', 'Buzios', '14'],
          ['Picadas de Cobra', 'Buzios', '14'],
        ],
      }
    const [table, setTable] = useState(0);
    const [text, onChangeText] = React.useState("Useless Text");
    const [number, onChangeNumber] = React.useState(null);
    const [flexDirection, setflexDirection] = useState("column");
    const [cityName, setCityName] = useState("Salvador");
    const [radius, setRadius] = useState("50")
    const [notiData, setNotiData] = useState(CONTENT.tableData)


    

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

    return (
        
        <View style={styles.container}>
            <View style={{flex: 1, width: '100%', height: '5%', backgroundColor: 'red', borderRadius: 5,}}> 
                <Text style = {styles.MainText}>IDQBRN</Text>
            </View>
            <View style={{backgroundColor: 'white', height:'1%',}}> 
            </View>

        
        <View style={{ flex:5, width: '100%', height: 35,  backgroundColor: '#D8D7D7', borderRadius: 15,flexDirection: "row", flexWrap: "wrap", paddingTop:10, paddingStart:10,}}> 
        
            <Text style = {styles.MainText}>Voce esta em:</Text>
            <View style={{width: '50%', height: '22%', backgroundColor: '#fff', borderRadius: 15, paddingHorizontal: 10,}}>
                <Text style = {styles.LocationText}>{cityName}</Text> 
            </View> 
            <Text>{'\n\n'}</Text>
            <Text style = {styles.MainText}>Mostrar os casos em até (km) :</Text>
            
            <View style={{width: '20%', height: 35, backgroundColor: '#fff', borderRadius: 15, paddingHorizontal: 15, paddingTop:7, }}>
                    <TextInput
                        style={styles.input}
                        value={number}
                        placeholder="50km"
                        keyboardType="numeric"
                        onChangeText={newText => setRadius(newText)}
                    />
            </View> 
            <Text style = {styles.MainText}>{'\n'}Doenças (Ordenadas por mais casos):</Text>

        </View>

        <View style={{backgroundColor: 'white', height:'1%',}}> 
        </View>
        <View style={ {flex:13}}>

        <ScrollView style={styles.scrollView}>
            <Table borderStyle={{ borderWidth: 1,}}>
                <Row
                    data={CONTENT.tableHead}
                    flexArr={[1, 1, 1]}
                    style={styles.head}
                    textStyle={styles.textHeader}
                />
                <TableWrapper style={styles.wrapper}>
                    <Col
                        data={CONTENT.tableTitle}
                        style={styles.title}
                        heightArr={[28, 28,28,28]}
                        textStyle={styles.textHeader}
                    />
                    <Rows
                        data={notiData}
                        flexArr={[1, 1, 1, 1]}
                        style={styles.row}
                        textStyle={styles.text}
                    />

                </TableWrapper>
            </Table>
            </ScrollView>
        <View style={{flex:1 , backgroundColor: '#D8D7D7'}} />

        </View>

        <View style={{flex:3 , backgroundColor: '#D8D7D7', alignItems: 'center', paddingTop: 20,}}>

            <TouchableOpacity onPress={() =>{
                var dataOutput = [];
                console.log("no app")

                currentCity(location.coords.latitude, location.coords.longitude)
                .then( data => setCityName(data[0].nome))
                .catch(error=>{
                    // console.log(error)
                    // setCityName("RJ")
                    alert(error.message);
                    throw error;
                  });
                  
                cases(location.coords.latitude, location.coords.longitude, radius)
                .then( data => {
                    dataOutput = data;
                    setNotiData(parseNotiData(dataOutput))
                }
                )
                .catch(error=>{
                    // console.log("erro")
                    // console.log(error)
                    // setNotiData(tableData)
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

const parseNotiData = ( data ) => {
    const final = [];
    data.forEach(row => {
        final.push([row.nome, row.nomedoenca_id, row.casosTotal]);
    });
    return final;
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: 'white', },

    head: { height: 40, backgroundColor: '#FF0028', },
    wrapper: { flexDirection: 'row', },
    title: { flex: 1, backgroundColor: '#2ecc71',padding: 10 },
    row: { height: 28, },
    text: { textAlign: 'center', fontSize: 12, },
    textHeader: { textAlign: 'center', fontSize: 17,fontWeight: 'bold',},

    MainText:{fontSize: 17,fontWeight: 'bold', paddingTop:4,paddingHorizontal:10, alignItems: 'center',
    justifyContent: 'center',},

    SubText:{fontSize:14, paddingTop:4,paddingHorizontal:10, alignItems: 'center', fontWeight: 'bold'},
    buttonText:{fontSize:20, paddingTop:4, alignItems: 'center',justifyContent: 'center', display: 'flex', fontWeight: 'bold', color:'#fff'},

    buttonSearch: {
        backgroundColor: 'red',
        padding: 5,
        paddingTop: 10,
        borderRadius: 10,
        width:300,
        height: 60,
      },
      input: {
        height: 20,
        margin: 1,
        borderWidth: 0,
        paddingTop:5,
        paddingBottom:-9,
      },

    LocationText:{fontSize:15, paddingTop:7,paddingHorizontal:10, alignItems: 'center'},

    scrollView: {
        backgroundColor: 'white',
        marginHorizontal: 20,
      },
  });

export default TableScreen;