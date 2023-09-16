import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import SelectDropdown from 'react-native-select-dropdown';
import { useToast } from "react-native-toast-notifications";
import { getAll, postData } from "../services/allService";

const countries = ["Egypt", "Canada", "Australia", "Ireland"]

export const UserScreen = ({ navigation, route }) => {

    const [value, setValue] = useState();
    const [accountName, setAccountName] = useState();
    const [data, setData] = useState([]);
    const toast = useToast();


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
        console.log("data is ", accountName, value);

        if (!accountName || !value) {
            toast.show("Please insert all the info")
        }

        const test = await postData(accountName, value);
        if (test) {
            if (test.message == "added") {
                toast.show("Vlaue added")
            } else {
                toast.show("Sorry cant process the transaction")
            }
        }

    }

    return (
        <View style={styles.container}>
            <Text>
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

            <Button mode="contained" onPress={() => onClickSend(accountName, value)}>
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
    }
});