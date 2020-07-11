

import React, { Component } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import { Dialogflow_V2 } from 'react-native-dialogflow';
import { Container, Header, Title, Left, Icon, Right, Button, Body, Content, Card, CardItem } from "native-base";
import { dialogflowConfig } from '../botsConfig/motivational';

const BOT_USER = {
  _id: 2,
  name: 'Motivational Bot',
  avatar: 'https://i.imgur.com/7k12EPD.png'
};


const list = [];

class Motivational extends Component {

  state = {
    messages: [
      {
        _id: 1,
        text: `Hi! I am the Motivational bot 🤖.\n\nHow may I help you with today?`,
        createdAt: new Date(),
        user: BOT_USER
      }
    ]
  };
  
  sendCred(message){
    fetch("https://licenta-aplicatie2020.herokuapp.com/MQ", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "text": message,
      })
    })
      .then(res => res.text())
      // .then(async (data) => {
      //   try {
      //     await AsyncStorage.setItem('token', data.token)
      //     props.navigation.replace("home")
      //   } catch (e) {
      //     console.log("error hai", e)
      //     Alert(e)
      //   }
      // })
  }

  componentDidMount() {
    Dialogflow_V2.setConfiguration(
      dialogflowConfig.client_email,
      dialogflowConfig.private_key,
      Dialogflow_V2.LANG_ENGLISH_US,
      dialogflowConfig.project_id
    );
  }

  handleGoogleResponse(result) {
    let text = result.queryResult.fulfillmentMessages[0].text.text[0];
    this.sendBotResponse(text);
    //list.push(text);
  }

  onSend(messages = []) {

    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages)
    }));

    let message = messages[0].text;
    console.log(message);
    list.push(message);
    this.sendCred(message)
    Dialogflow_V2.requestQuery(
      message,
      result => this.handleGoogleResponse(result),
      error => console.log(error)
    );
  }

  sendBotResponse(text) {
    let msg = {
      _id: this.state.messages.length + 1,
      text,
      createdAt: new Date(),
      user: BOT_USER
    };
    console.log("msg " + msg)

    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, [msg])
      //console.log(messages)
    }));
    //console.log("messsages: " +messages)
  }

  // backLista() {
  //   console.log(list);
  // }

  sendList() {
    fetch('https://licenta-aplicatie2020.herokuapp.com/lista', {
      method: 'POST',
      body: JSON.stringify({
        lista: list
      }),
      //headers: {"Content-Type": "application/json"}
    })
      .then(function (response) {
        return response.text()
      }).catch(error => console.log(error));
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
         {/* <Text style={{ fontWeight: "500", color: "#E9446A" }}>back</Text> */}
       
          <TouchableOpacity
            style={{ alignSelf: "center", marginTop: 32 }}
            onPress={() => this.props.navigation.navigate("chat")}
            // , this.sendList()
          >
           

          </TouchableOpacity>
          {/* <Text style={{ fontWeight: "500" }}>MOTIVATIONAL</Text> */}

        

        {/* <Button title="SAVE"
          onPress={this.sendList()}
        /> */}
        <GiftedChat
          messages={this.state.messages}
          onSend={messages => this.onSend(messages)}
          
          user={{
            _id: 1
          }}
         // onEnd={this.backLista()}

        />
        {/* </View> */}
      </SafeAreaView>

    );
  }
}



// Motivational.navigationOptions = ({ navigation }) => ({
//     title: 'Motivational'

//  //   // buttonStyle={{ padding: 0, marginRight: 20, backgroundColor: 'transparent' }}
//  //   // title="log out"
//  //   // onPress={() => {auth().signOut()}} />,


//   });
export default Motivational;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EBECF4"
  },
  header: {
    paddingTop: 30,
    paddingBottom: 16,
    backgroundColor: "#FFF",
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#EBECF4",
    shadowColor: "#454D65",
    shadowOffset: { height: 5 },
    shadowRadius: 15,
    shadowOpacity: 0.2,
    zIndex: 10
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "500"
  },
  feed: {
    marginHorizontal: 16
  },
  feedItem: {
    backgroundColor: "#FFF",
    borderRadius: 5,
    padding: 8,
    flexDirection: "row",
    marginVertical: 8
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 16
  },
  name: {
    fontSize: 15,
    fontWeight: "500",
    color: "#454D65"
  },
  timestamp: {
    fontSize: 11,
    color: "#C4C6CE",
    marginTop: 4
  },
  post: {
    marginTop: 16,
    fontSize: 14,
    color: "#838899"
  },
  postImage: {
    width: undefined,
    height: 150,
    borderRadius: 5,
    marginVertical: 16
  }
});
