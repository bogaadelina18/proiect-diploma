
import React, { useState } from 'react';
import { Button, TextInput } from 'react-native-paper';
import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  KeyboardAvoidingView,
  Alert,
  Image,
  StyleSheet,
  ImageBackground
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';


const ResetScreen = (props) => {
  const [email, setEmail] = useState('');
  

  const sendCred = async (props) => {
    fetch("https://licenta-aplicatie2020.herokuapp.com/reset", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "email": email
      })
    })
      .then(res => res.json())
      .then(async (data) => {
        try {
          await AsyncStorage.setItem('token', data.token)
          props.navigation.replace("login")
        } catch (e) {
          console.log("error hai", e)
          Alert(e)
        }
      })
  }

  return (
    <>
      <KeyboardAvoidingView behavior="position">

        <View>
          <Image
            source={require("../assets/loginImg.png")}
            style={{ marginTop: 10, marginLeft: 20, height: 240, width: null }}
          ></Image>
        </View>

        <View style={{ marginTop: -40 }}>

          <StatusBar backgroundColor="blue" barStyle="light-content" />
          {/* <Text style={styles.greeting}>{`LOGIN`}</Text> */}
          <TextInput
            label='Email'
            mode="outlined"
            value={email}
            style={{ marginLeft: 18, marginRight: 18, marginTop: 45 }}
            theme={{ colors: { primary: "blue" } }}
            onChangeText={(text) => setEmail(text)}

          />
        
          <Button
            mode="contained"
            style={{ marginLeft: 18, marginRight: 18, marginTop: 18 }}
            onPress={() => sendCred(props)}>
            Reset
             </Button>
          <TouchableOpacity
            style={{ alignSelf: "center", marginTop: 32 }}
            onPress={() => props.navigation.replace("login")}
          >
            <Text style={{ color: "#414959", fontSize: 13 }}>
              back to <Text style={{ fontWeight: "500", color: "#E9446A" }}>Login</Text>
            </Text>
          </TouchableOpacity>

         
        
        </View>

      </KeyboardAvoidingView>
    </>
  );
};



export default ResetScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column"
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
  greeting: {
    marginTop: 40,
    fontSize: 26,
    fontWeight: "400",
    textAlign: "center",
 
    borderColor :"#000000"
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
