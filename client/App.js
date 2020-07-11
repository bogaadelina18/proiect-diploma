// import React from 'react';
// import { StyleSheet, Text, View } from 'react-native';

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Text>Open up App.tsx to start working on your app!</Text>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });


import React, { useEffect, useState } from 'react';
import { Button, TextInput } from 'react-native-paper';
import { Icon } from 'native-base';
import {

  StyleSheet,
  View,
  Text,

} from 'react-native';


import {NavigationContainer}  from '@react-navigation/native';
 import  {createStackNavigator , HeaderBackButton}  from '@react-navigation/stack';
import {createBottomTabNavigator}  from '@react-navigation/bottom-tabs';;
// import { HeaderBackButton } from 'react-navigation';

//initial screens
import SignupScreen from './initialScreens/SignupScreen'
import LoginScreen from './initialScreens/LoginScreen'
import LoadingScreen from './initialScreens/LoadingScreen';
import HomeSceen from './initialScreens/HomeScreen';
import ResetScreen from './initialScreens/ResetScreen'
import AsyncStorage from '@react-native-community/async-storage';

//second screens 
import Profile from './secondScreens/Profile'
import Statistics from './secondScreens/Statistics'
import Chat from './secondScreens/Chat';

//bot screens
import Motivational from './botsScreens/Motivational'
import Weather from './botsScreens/Weather'
import Turistic from './botsScreens/Turistic'

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const App  = ({navigation}) => { 
  const [isloggedin, setLogged] = useState(null)

  const detectLogin = async () => {
    const token = await AsyncStorage.getItem('token')
    if (token) {
      setLogged(true)
    } else {
      setLogged(false)
    }
  }
  useEffect(() => {
    detectLogin()
  }, [])

  




  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="loading" component={LoadingScreen} />
         <Stack.Screen name="home" component={HomeSceen} /> 
        <Stack.Screen name="login" component={LoginScreen} />
         <Stack.Screen name="reset" component={ResetScreen} /> 
        <Stack.Screen name="signup" component={SignupScreen} />
        <Stack.Screen name="weather" component={Weather} />
        <Stack.Screen name="turistic" component={Turistic} />
        <Stack.Screen name="motivational" component={Motivational} />
        <Stack.Screen name="chat" component={Chat} />
        <Stack.Screen name="statistics" component={Statistics} />
        <Stack.Screen name="profile" component={Profile} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};


export default App;

