import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, TextInput } from 'react-native-paper';
import { useToast } from "react-native-toast-notifications";
import { loginPost } from "../services/allService";

export const LoginScreen = ({ navigation }) => {

    const [userName, setUserName] = useState();
    const [password, setPassword] = useState();

    const [loading, setLoading] = useState(false);

    const toast = useToast();

    const onClickLogin = async (username, password) => {
        if (!username || !password) {
            return toast.show("Please insert all the info")
        }
        setLoading(true)
        const test = await loginPost(username, password);
        if (test) {
            setLoading(false)
            if (test.message == "User found") {
                if (test.data.username == "admin") {
                    toast.show(`Welcome ${test.data.username}`)
                    navigation.navigate('adminDashboard')
                } else {
                    toast.show(`Welcome ${test.data.username}`)
                    navigation.navigate('userDashboard')
                }
            } else {
                toast.show("User not found")
            }
        }

    }

    return (
        <View style={styles.div}>
            <TextInput
                label="Username"
                value={userName}
                style={styles.input}
                onChangeText={text => setUserName(text)}
            />
            <TextInput
                label="Password"
                value={password}
                style={styles.input}
                secureTextEntry
                onChangeText={text => setPassword(text)}
            />
            <Button mode="contained" onPress={() => onClickLogin(userName, password)} loading={loading}>
                Login
            </Button>
        </View>
    );
};


const styles = StyleSheet.create({
    div: {
        marginTop: 50,
        padding: 10
    },
    input: {
        marginBottom: 10,
        fontSize: 30
    },
    button: {
    }
});