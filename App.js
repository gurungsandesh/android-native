import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet } from 'react-native';
import { LoginScreen } from './screen/login';
import { userScreen } from './screen/userScreen';
import { Demo1 } from './screen/test';
import { PaperProvider } from 'react-native-paper';
import { ToastProvider } from 'react-native-toast-notifications';
import { AdminDashboard } from './screen/adminDashboard';



const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <PaperProvider>
      <ToastProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Home"
              component={LoginScreen}
              options={{ title: 'Login Portal' }}
            />
            <Stack.Screen
              name="adminDashboard"
              component={AdminDashboard}
              options={{ title: 'Dashboard' }}
            />
            {/* <Stack.Screen name="Profile" component={ProfileScreen} /> */}
          </Stack.Navigator>
        </NavigationContainer>
      </ToastProvider>
    </PaperProvider>
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
