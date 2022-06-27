import React, {useState, Component } from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import { Button } from 'react-native-web';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import { DataTable } from 'react-native-paper';


const TableScreen = () =>{
    const [table, setTable] = useState(0);
    const CONTENT = {
        tableHead: ['Doenças', 'Munícipio', 'Casos'],
        tableData: [
          ['Dengue', 'RJ', '3'],
          ['Picadas de Cobra', 'Buzios', '14'],
          [' ', ' ', ' '],
          [' ', ' ', ' '],
        ],
      }

    return (
        <View style={styles.container}>
        
        <View style={{width: '100%', height: '15%', backgroundColor: '#D8D7D7'}}> 
            <Text style = {styles.MainText}>Voce esta em: Rio de Janeiro </Text>

        </View>

            <Table borderStyle={{ borderWidth: 1 }}>
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
                        heightArr={[28, 28]}
                        textStyle={styles.textHeader}
                    />
                    <Rows
                        data={CONTENT.tableData}
                        flexArr={[1, 1, 1]}
                        style={styles.row}
                        textStyle={styles.text}
                    />

                </TableWrapper>
            </Table>

            <View style={{
            flex:1 , backgroundColor: '#D8D7D7'}} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff', },


    head: { height: 40, backgroundColor: '#FF0028', },
    wrapper: { flexDirection: 'row', },
    title: { flex: 1, backgroundColor: '#2ecc71',padding: 10 },
    row: { height: 28, },
    text: { textAlign: 'center', fontSize: 12, },
    textHeader: { textAlign: 'center', fontSize: 17,fontWeight: 'bold',},
    MainText:{fontSize: 17,fontWeight: 'bold',  },
    buttonSearch: {
        backgroundColor: 'red',
        padding: 10,
        borderRadius: 10,
        width:300,
        height: 50,
      },
  });

export default TableScreen;