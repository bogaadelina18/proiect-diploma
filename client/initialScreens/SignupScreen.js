
import React, { useState } from 'react';
import { Button, TextInput } from 'react-native-paper';
import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  KeyboardAvoidingView,
  StyleSheet
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

const SignupScreen = (props) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('')
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')

  const sendCred = async (props) => {
    fetch("https://licenta-aplicatie2020.herokuapp.com/register", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "firstName": firstName,
        "lastName" : lastName,
        "address": address,
        "email": email,
        "password": password
      })
    })
      .then(res => res.json())
      .then(async (data) => {
        try {
          await AsyncStorage.setItem('token', data.token)
          props.navigation.replace("home")
        } catch (e) {
          console.log("error hai", e)
        }
      })
  }
  return (
    <>
      <KeyboardAvoidingView behavior="position">
        <StatusBar backgroundColor="blue" barStyle="light-content" />
       
        <View style={{marginTop :1}}>
         {/* <Image
                        source={require("../assets/chatbot.png")}
                        style={{ marginTop: -300, marginLeft: -50 }}
                    ></Image> */}
        <Text style={styles.greeting}>{`SIGN UP`}</Text>
        <TextInput
          label='First Name'
          mode="outlined"
          value={firstName}
          style={{ marginLeft: 18, marginRight: 18, marginTop: 18 }}
          theme={{ colors: { primary: "blue" } }}
          onChangeText={(text) => setFirstName(text)}

        />
        <TextInput
          label='Last Name'
          mode="outlined"
          value={lastName}
          style={{ marginLeft: 18, marginRight: 18, marginTop: 18 }}
          theme={{ colors: { primary: "blue" } }}
          onChangeText={(text) => setLastName(text)}

        />
        
        <TextInput
          label='Address'
          mode="outlined"
          value={address}
          style={{ marginLeft: 18, marginRight: 18, marginTop: 18 }}
          theme={{ colors: { primary: "blue" } }}
          onChangeText={(text) => setAddress(text)}

        />
        <TextInput
          label='Email'
          mode="outlined"
          value={email}
          style={{ marginLeft: 18, marginRight: 18, marginTop: 18 }}
          theme={{ colors: { primary: "blue" } }}
          onChangeText={(text) => setEmail(text)}

        />
        <TextInput
          label='Password'
          mode="outlined"
          secureTextEntry={true}
          value={password}
          onChangeText={(text) => { setPassword(text) }}
          style={{ marginLeft: 18, marginRight: 18, marginTop: 18 }}
          theme={{ colors: { primary: "blue" } }}

        />
        <Button
          mode="contained"
          style={{ marginLeft: 18, marginRight: 18, marginTop: 18 }}
          onPress={() => sendCred(props)}>
          signup
      </Button>
      <TouchableOpacity
              style={{ alignSelf: "center", marginTop: 32 }}
              onPress={() => props.navigation.replace("login")}
            >
              <Text style={{ color: "#414959", fontSize: 13 }}>
              Already have an account ? <Text style={{ fontWeight: "500", color: "#E9446A" }}>Login</Text>
              </Text>
            </TouchableOpacity>
       
        </View>
      </KeyboardAvoidingView>
    </>
  );
};



export default SignupScreen;



const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  greeting: {
    marginTop: 32,
    fontSize: 18,
    fontWeight: "400",
    textAlign: "center"
  },
  form: {
    marginBottom: 40,
    marginHorizontal: 30
  },
  inputTitle: {
    color: "#8A8F9E",
    fontSize: 10,
    textTransform: "uppercase"
  },
  input: {
    borderBottomColor: "#8A8F9E",
    borderBottomWidth: StyleSheet.hairlineWidth,
    height: 40,
    fontSize: 15,
    color: "#161F3D"
  },
  button: {
    marginHorizontal: 30,
    backgroundColor: "#E9446A",
    borderRadius: 4,
    height: 52,
    alignItems: "center",
    justifyContent: "center"
  },
  errorMessage: {
    height: 72,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 30
  },
  error: {
    color: "#E9446A",
    fontSize: 13,
    fontWeight: "600",
    textAlign: "center"
  },
  back: {
    position: "absolute",
    top: 48,
    left: 32,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "rgba(21, 22, 48, 0.1)",
    alignItems: "center",
    justifyContent: "center"
  },
  avatar: {
    width: 100,
    height: 100,
    backgroundColor: "#E1E2E6",
    borderRadius: 50,
    marginTop: 48,
    justifyContent: "center",
    alignItems: "center"
  }
});
