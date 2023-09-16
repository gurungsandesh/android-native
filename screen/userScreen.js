import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import SelectDropdown from 'react-native-select-dropdown';
import { useToast } from "react-native-toast-notifications";
import { getAll, postData } from "../services/allService";


export const UserScreen = ({ navigation, route }) => {

    const [value, setValue] = useState();
    const [accountName, setAccountName] = useState();
    const [data, setData] = useState([]);
    const toast = useToast();

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getAllData()
    }, []);

    const getAllData = async () => {
        const data = await getAll();

        if (data) {
            let allCompany = data.map(val => val.name)
            setData(allCompany)
        }
    }

    const onClickSend = async (accountName, value) => {

        if (!accountName || !value) {
            return toast.show("Please insert all the info")
        }
        setLoading(true)

        const test = await postData(accountName, value);
        if (test) {
            setLoading(false)
            if (test.message == "added") {
                toast.show("Vlaue added")
            } else {
                toast.show("Sorry cant process the transaction")
            }
        }

    }

    return (
        <View style={styles.container}>
            <Text style={styles.black} >
                Please select account
            </Text>

            <SelectDropdown
                styles={styles.select}
                data={data}
                onSelect={(selectedItem, index) => {
                    setAccountName(selectedItem)
                }}
                buttonTextAfterSelection={(selectedItem, index) => {
                    return selectedItem
                }}
                rowTextForSelection={(item, index) => {
                    return item
                }}
            />

            <Text>
            </Text>


            <TextInput
                label="Value"
                value={value}
                style={styles.input}
                keyboardType='numeric'
                onChangeText={text => setValue(text)}
            />

            <Button mode="contained" onPress={() => onClickSend(accountName, value)} loading={loading}>
                Send
            </Button>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        margin: 50,
    },
    input: {
        marginBottom: 10,
        fontSize: 30,
    },
    select: {
        marginBottom: 100,
    },
    black: {
        color: '#000000'
    }
});