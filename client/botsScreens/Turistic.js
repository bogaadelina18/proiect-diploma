
import React, { Component, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import { Dialogflow_V2 } from 'react-native-dialogflow';


import { dialogflowConfig } from '../botsConfig/turistic';

const BOT_USER = {
  _id: 2,
  name: 'Turistic Bot',
  avatar: 'https://i.imgur.com/7k12EPD.png'
};


const list=[];

class   Turistic extends Component {
  state = {
    messages: [
      {
        _id: 1,
        text: `Hi! I am the Turistic bot 🤖 `,
        createdAt: new Date(),
        user: BOT_USER
      }
    ]
  };

  componentDidMount() {
    Dialogflow_V2.setConfiguration(
      dialogflowConfig.client_email,
      dialogflowConfig.private_key,
      Dialogflow_V2.LANG_ENGLISH_US,
      dialogflowConfig.project_id
    );
  }

  getCred(message){
    fetch('https://licenta-aplicatie2020.herokuapp.com/getPlace')
  .then(response => response.text())
  .then(data => {
    let raspuns= 'The name of the place is '+data.name+', address : '+data.address+' '+data.city+' '+data.country+' , lat: '+data.lat+' long: '+data.lng+' categories: '+data.categories
    return raspuns
  })
    // console.log(data));
  }
 


  sendCred(message){
    fetch("https://licenta-aplicatie2020.herokuapp.com/TQ", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "text": message,
      })
    })
      .then(res => res.text())
      // .then((data) => {
      //   res.send(data.name)})
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
  handleGoogleResponse(result) {
    
    let text = result.queryResult.fulfillmentMessages[0].text.text[0];
    //let image = result.queryResult.fulfillmentMessages[0].image.imageUri;
    // if(text= 'I suggest you this places')
    this.sendBotResponse(text);
    // list.push(text);
  }

  onSend(messages = []) {
    
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages)
    }));

    let message = messages[0].text;
    list.push(message);
    //this.sendCred(message)
    if(message==='more')
    {
      let text2='Which place?'
      this.sendBotResponse(text2) 
    }
    else{

      Dialogflow_V2.requestQuery(
        message,
        result => {
          this.handleGoogleResponse(result)
          console.log(JSON.stringify(result))
        },
        
        error => console.log(error)
      );
    }
    
  }

  sendBotResponse(text) {
    let msg = {
      _id: this.state.messages.length + 1,
      text,
      createdAt: new Date(),
      user: BOT_USER
    };
    console.log("msg "+msg)

    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, [msg])
      //console.log(messages)
    }));
    //console.log("messsages: " +messages)
  }

   backLista() {
    console.log(list);
  }

  // sendList(){
  //   fetch('https://42394769bd75.ngrok.io/lista',{
  //     method: 'POST',
  //     body: JSON.stringify({
  //       lista: list
  //     }),
  //     //headers: {"Content-Type": "application/json"}
  //   })
  //   .then(function(response){
  //   return response.json()
  //   }).catch(error => console.log(error));
  // }
  // sendToDB(message){
  //   firebaseSDK.send
  // }

  render() {
    return (
      <SafeAreaView style={styles.container}>

      <TouchableOpacity
            style={{ alignSelf: "center", marginTop: 32 }}
            onPress={() => this.props.navigation.navigate("chat")}
          >
           

          </TouchableOpacity>
        {/* <Text style={{ fontWeight: "500" }}>TURISTIC</Text> */}

    
      
      
        <GiftedChat
          messages={this.state.messages}
          onSend={messages => this.onSend(messages)}
          // messages={this.state.messages}
				// onSend={firebaseSDK.send}
				//user={this.user}
        
          user={{
            _id: 1
          }}
           //onEnd={firebaseSDK.send}
          // onEnd={this.sendList()}
          
        />
      </SafeAreaView>
    );
  }

 }



export default Turistic;


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
