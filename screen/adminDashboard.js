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
            <Text>
                DataTable
            </Text>

            <DataTable>
                <DataTable.Header>
                    <DataTable.Title>Account</DataTable.Title>
                    <DataTable.Title numeric>Values</DataTable.Title>
                </DataTable.Header>

                {data.length > 0 && data.map((item) => (
                    <DataTable.Row key={item.id}>
                        <DataTable.Cell>{item.name}</DataTable.Cell>
                        <DataTable.Cell numeric>{item.value}</DataTable.Cell>
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
});
