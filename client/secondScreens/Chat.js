import React, { Component , useState } from 'react';
import { View, TouchableOpacity, FlatList, StyleSheet, StatusBar } from 'react-native';
import { Container, Header, Title, Content, List, ListItem, Footer, FooterTab, Button, Left, Right, Body, Icon, Text, Thumbnail } from 'native-base';
//import { Container, Header, Content, List, ListItem, Left, Body, Right, Thumbnail, Text } from 'native-base';

import { YellowBox } from 'react-native';

const  navigationOptions = {
  headerLeft: () => { return(<Icon name='md-refresh' size={30} color='black' />)},
};
const Chat = (props) => {

  const [nameM, setNameM] = useState('motivational')
  const [nameT, setNameT] = useState('turistic')
  const [nameW, setNameW] = useState('weather')

  const sendBot = async (props) => {
    fetch("https://licenta-aplicatie2020.herokuapp.com/bots", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "name": name
      })
    })
      .then(res => res.json())
      .then(async (data) => {
        try {
          await AsyncStorage.setItem('token', data.token)
          //props.navigation.replace("home")
        } catch (e) {
          console.log("error hai", e)
        }
      })
  }
  
  return (
    <Container>
      <Content>
        <View style={styles.container}>
          {/* <View style={styles.header}>
            <Text style={styles.headerTitle}>CHAT </Text>
          </View> */}

          <Container>
            <Content>
            <StatusBar backgroundColor="red" barStyle="light-content" />
              <List>
                <ListItem avatar   onPress={() => props.navigation.navigate("motivational")}>
                  <Left>
                    <Thumbnail source={{ uri: 'https://avatarfiles.alphacoders.com/195/195594.jpg' }} />
                  </Left>
                  <Body>
                    <Text>Motivatinal</Text>
                    <Text note>Doing what you like will always keep you happy...</Text>
                  </Body>
                  <Right >
                    <Text note>Chat with me</Text>
                  </Right>
                </ListItem>
                <ListItem avatar   onPress={() =>  props.navigation.navigate("turistic")}>
                  <Left>
                    <Thumbnail source={{ uri: 'https://image.freepik.com/free-vector/woman-tourist-avatar-character_24877-4961.jpg' }} />
                  </Left>
                  <Body>
                    <Text>Turistic</Text>
                    <Text note>Where do you want to go?</Text>
                  </Body>
                  <Right >
                    <Text note>Chat with me</Text>
                  </Right>
                </ListItem>
                <ListItem avatar   onPress={() => props.navigation.navigate("weather")}>
                {/* setNameW() , sendBot(props) */}

                  <Left>
                    <Thumbnail source={{ uri: 'https://wi-images.condecdn.net/image/doEYpG6Xd87/crop/810/f/weather.jpg' }} />
                  </Left>
                  <Body>
                    <Text>Weather</Text>
                    <Text note>It's raining? Outdoor temperature? It's sunny?...</Text>
                  </Body>
                  <Right >
                    <Text note>Chat with me</Text>
                  </Right>
                </ListItem>
              </List>

            </Content>

          </Container>
        </View>
      </Content>
      <Footer>
        <FooterTab>
          <Button vertical onPress={() => props.navigation.replace("home")}>

            <Text>Home</Text>
          </Button>
          <Button vertical onPress={() => props.navigation.replace("statistics")}>

            <Text>Statistics</Text>
          </Button>
          <Button vertical active >

            <Text>Chat</Text>
          </Button>
          <Button vertical onPress={() => props.navigation.replace("profile")}>

            <Text>Profile</Text>
          </Button>
        </FooterTab>
      </Footer>
    </Container>
  )

}
// }
//     )
//   }
// }



// Chat.navigationOptions = ({ navigation }) => ({
//    title: 'Chat'

// //   // buttonStyle={{ padding: 0, marginRight: 20, backgroundColor: 'transparent' }}
// //   // title="log out"
// //   // onPress={() => {auth().signOut()}} />,

//  });

export default Chat;

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


