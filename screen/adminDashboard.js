import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { DataTable, Text } from 'react-native-paper';
import { getAll } from '../services/allService';

export const AdminDashboard = ({ navigation }) => {

    const [data, setData] = useState([]);

    useEffect(() => {
        getAllData()
    }, []);

    const getAllData = async () => {
        const data = await getAll();

        if (data) {
            setData(data)
        }
    }

    return (
        <View style={styles.dataContainer} >
            <Text style={styles.black} >
                DataTable
            </Text>

            <DataTable style={styles.black} >
                <DataTable.Header>
                    <DataTable.Title>
                        <Text style={styles.black} >
                            Account
                        </Text>
                    </DataTable.Title>
                    <DataTable.Title numeric>
                        <Text style={styles.black} >
                            Values
                        </Text>
                    </DataTable.Title>
                </DataTable.Header>

                {data.length > 0 && data.map((item) => (
                    <DataTable.Row key={item.id}>
                        <DataTable.Cell>
                            <Text style={styles.black} >
                                {item.name}
                            </Text>
                        </DataTable.Cell>
                        <DataTable.Cell numeric>
                            <Text style={styles.black} >
                                {item.value}
                            </Text>
                        </DataTable.Cell>
                    </DataTable.Row>
                ))}
            </DataTable>

        </View>
    )
}

const styles = StyleSheet.create({
    dataContainer: {
        margin: 10,
        padding: 10
    },
    black: {
        color: '#000000'
    }
});
