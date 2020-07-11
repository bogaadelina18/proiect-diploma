
import React, { useEffect, useState } from 'react';
import { TextInput } from 'react-native-paper';


import AsyncStorage from '@react-native-community/async-storage';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  FlatList,
  Image,
  Alert,
  ActivityIndicator,
  StatusBar,
  Modal

} from 'react-native';
import {
  Container,
  Header,
  Content,
  Footer,
  FooterTab,
  Button,
  Icon,
  Card,
  CardItem,
  Thumbnail,
  Left,
  Body,
  Right
} from 'native-base';

import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
const cityList = () => {
  fetch('https://licenta-aplicatie2020.herokuapp.com/cityList')
    .then(response => response.json())
    .then(data => console.log(data));
}



class ExampleOne extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tableHead: ['Head', 'Head2', 'Head3', 'Head4'],
      tableData: [
        ['1', '2', '3', '4'],
        ['a', 'b', 'c', 'd'],
        ['1', '2', '3', '456\n789'],
        ['a', 'b', 'c', 'd']
      ]
    }
  }

  render() {
    const state = this.state;
    return (
      <View style={styles.container}>
        <Table borderStyle={{ borderWidth: 2, borderColor: '#c8e1ff' }}>
          <Row data={state.tableHead} style={styles.head} textStyle={styles.text} />
          <Rows data={state.tableData} textStyle={styles.text} />
        </Table>
      </View>
    )
  }
}



const HomeScreen = (props) => {
  const [fistName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('')
  const [email, setEmail] = useState('');
  const header1 = {
    HeadTable: ['City', 'Searched',],
    DataTable: [
      ['Rome', '21'],
      ['Berlin', '15'],
      ['London', '9'],
      ['Lisbon', '8'],
      ['Constanta', '6']
    ]
  }

  const header2 = {
    HeadTable: ['Questions', 'Searched',],
    DataTable: [
      ['Weather in San Francisco', '33'],
      ['Tell me th weather for London', '18'],
      ['Can you tell me the weather forcast in Paris now', '11'],
      ['I want to know the weather in Pakistan', '2'],
      ['weather in Telaviv', '1']
    ]
  }
  const header3 = {
    HeadTable: ['Place', 'Searched',],
    DataTable: [
      ['Classic Remise Berlin', '8'],
      ['C/O Berlin', '8'],
      ['Akademie der Künste | Academy of Arts', '8'],
      ['Martin-Gropius-Bau', '8'],
      ['Mmmozza', '6']
    ]
  }
  const header4 = {
    HeadTable: ['QUESTIONS', 'Searched',],
    DataTable: [
      ['are we free', '2'],
      ['what make you feel happy', '1'],
      ['not fine, you?', '1'],
      ['do we all have the same right?', '1'],
      ['get engaged', '1']
    ]
  }
  const cities = [];
  const counters = [];
  const date = [];

  const [modal1Open, setModal1Open] = useState(false);
  const [modal2Open, setModal2Open] = useState(false);
  const [modal3Open, setModal3Open] = useState(false);
  const [modal4Open, setModal4Open] = useState(false);

  const Boiler = async () => {
    const token = await AsyncStorage.getItem("token")
    fetch('https://licenta-aplicatie2020.herokuapp.com/user', {
      headers: new Headers({
        Authorization: "Bearer " + token
      })
    }).then(res => res.json())
      .then(data => {
        console.log(data)
        setFirstName(data.firstName)
        setLastName(data.lastName)
        setEmail(data.email)
        setAddress(data.address)

      }
      )
  }
  useEffect(() => {
    Boiler()
  }, [])

  const cityList = () => {
    fetch('https://licenta-aplicatie2020.herokuapp.com/cityList')
      .then(response => response.json())
      .then(data => {
        var dataCityName = {};
        var dataCounter = {};

        var i = 0;

        data.forEach(function (city) {

          dataCityName[city.cityName] = city.cityName;

          cities[i] = dataCityName[city.cityName]
          console.log("cityName :" + dataCityName[city.cityName])
          dataCounter[city.counter] = city.counter
          counters[i] = dataCounter[city.counter]
          console.log("counter :" + dataCounter[city.counter])
          // date.push({
          //     value: dataCounter[city.counter],
          //     label: dataCityName[city.cityName]
          // })
          //setDate(date.tite.dataCityName[city.cityName],date.value.dataCounter[city.counter])

          //console.log("counter " + dataCityName[counter])
          // placesMap[place.counter] = place;
          i++;
        });
        // for(var j=0;cities.length;j++)
        // {
        //     console.log("cities : "+cities[j]+ " and counters : "+counters[j])
        //     data=[{
        //         value :counters[j],
        //         label :cities[j]
        //     }]
        // }
        console.log(date)
      })

    //console.log(data[0].cityName)
    // console.log(data[0].counter)} );
  }

  const logout = (props) => {

    AsyncStorage.removeItem("token").then(() => {
      props.navigation.navigate("login")
    })
  }

  // const  navigationOptions = {
  //   headerRight: () => { return(<Icon name='md-refresh' size={30} color='black' />)},
  // };

  return (
    <>

      <Modal visible={modal1Open} animationType='slide' >

        <View style={{ backgroundColor: '#000000aa', flex: 1 }}>

          <View style={{ backgroundColor: "#ffffff", margin: 50, padding: 40, borderRadius: 10, flex: 1 }}>
            <Text style={{ fontSize: 18 }}> Other users search for: </Text>
            <Card>
              {/* <Text>Hi</Text> */}
              <Table borderStyle={{ borderWidth: 1, borderColor: '#ffa1d2' }}>
                <Row data={header1.HeadTable} style={styles.HeadStyle} textStyle={styles.TableText} />
                <Rows data={header1.DataTable} textStyle={styles.TableText} />
              </Table>
            </Card>
            <Button onPress={() => setModal1Open(false)}>
              <Text > Close</Text>
            </Button>
          </View>
        </View>

      </Modal>
      <Modal visible={modal2Open} animationType='slide' >

        <View style={{ backgroundColor: '#000000aa', flex: 1 }}>

          <View style={{ backgroundColor: "#ffffff", margin: 50, padding: 40, borderRadius: 10, flex: 1 }}>
            <Text style={{ fontSize: 18 }}> Other users search for: </Text>
            <Card>
              {/* <Text>Hi</Text> */}
              <Table borderStyle={{ borderWidth: 1, borderColor: '#ffa1d2' }}>
                <Row data={header2.HeadTable} style={styles.HeadStyle} textStyle={styles.TableText} />
                <Rows data={header2.DataTable} textStyle={styles.TableText} />
              </Table>
            </Card>
            <Button onPress={() => setModal2Open(false)}>
              <Text > Close</Text>
            </Button>
          </View>
        </View>

      </Modal>
      <Modal visible={modal3Open} animationType='slide' >

        <View style={{ backgroundColor: '#000000aa', flex: 1 }}>

          <View style={{ backgroundColor: "#ffffff", margin: 50, padding: 40, borderRadius: 10, flex: 1 }}>
            <Text style={{ fontSize: 18 }}> Other users search for: </Text>
            <Card>
              {/* <Text>Hi</Text> */}
              <Table borderStyle={{ borderWidth: 1, borderColor: '#ffa1d2' }}>
                <Row data={header3.HeadTable} style={styles.HeadStyle} textStyle={styles.TableText} />
                <Rows data={header3.DataTable} textStyle={styles.TableText} />
              </Table>
            </Card>
            <Button onPress={() => setModal3Open(false)}>
              <Text > Close</Text>
            </Button>
          </View>
        </View>

      </Modal>
      <Modal visible={modal4Open} animationType='slide' >

        <View style={{ backgroundColor: '#000000aa', flex: 1 }}>

          <View style={{ backgroundColor: "#ffffff", margin: 50, padding: 40, borderRadius: 10, flex: 1 }}>
            <Text style={{ fontSize: 18 }}> Other users search for: </Text>
            <Card>
              {/* <Text>Hi</Text> */}
              <Table borderStyle={{ borderWidth: 1, borderColor: '#ffa1d2' }}>
                <Row data={header4.HeadTable} style={styles.HeadStyle} textStyle={styles.TableText} />
                <Rows data={header4.DataTable} textStyle={styles.TableText} />
              </Table>
            </Card>
            <Button onPress={() => setModal4Open(false)}>
              <Text > Close</Text>
            </Button>
          </View>
        </View>

      </Modal>

      <Container>
        <Content>

          <StatusBar backgroundColor="red" barStyle="light-content" />
          <ScrollView>
            <View style={styles.container}>

              <TouchableOpacity
                style={{ alignSelf: "center", marginTop: 32 }}

                onPress={() => logout(props)}>


                <Text style={{ fontWeight: "500", color: "#E9446A" }}>log out</Text>

              </TouchableOpacity>


              {/* <Text style={{ fontSize: 18 }}>Hi {name} your email is: {email}</Text> */}
              {/* <Text style={{ fontSize: 18 }}>Hi {name} your email is: {email}</Text> */}
              <Card>
                <CardItem button onPress={() => setModal1Open(true)} style={{backgroundColor:"#EADE9E"}}>
                  <Left>
                    <Thumbnail source={{ uri: 'data:image/png;base64,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' }} />
                    <Body>
                      <Text>TURISTIC BOT</Text>
                      <Text note>THE MOST SEARCHED CITIES</Text>
                    </Body>
                  </Left>
                </CardItem>

                <CardItem cardBody>
                  <Text>

                  </Text>
                  <Image source={{ uri: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?ixlib=rb-1.2.1&w=1000&q=80' }} style={{ height: 200, width: null, flex: 1 }} />
                </CardItem>
                <CardItem style={{backgroundColor:"#EADE9E"}}>
                  <Left>
                    <Button transparent>
             
                      <Text>Rome</Text>
                    </Button>
                  </Left>
                  <Body>
                    <Button transparent>
                    
                      <Text>Paris</Text>
                    </Button>
                  </Body>
                  <Right>
             
                    <Text>London</Text>
                  </Right>

                </CardItem>


                <View>
                  <Text> </Text>
                </View>
                <CardItem button onPress={() => setModal2Open(true)} style={{backgroundColor:"#EADE9E"}}>
                  <Left>
                    <Thumbnail source={{ uri: 'data:image/png;base64,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' }} />
                    <Body>
                      <Text>WEATHER BOT</Text>
                      <Text note>THE MOST ASKED QUESTIONS</Text>
                    </Body>
                  </Left>
                </CardItem>
                <CardItem cardBody>
                  <Image source={{ uri: 'https://openweathermap.org/themes/openweathermap/assets/img/new-history-forecast-bulk.png' }} style={{ height: 200, width: null, flex: 1 }} />
                </CardItem>
                <View>
                  <Text> </Text>
                </View>
                <CardItem style={{backgroundColor:"#EADE9E"}}>
                  <Left>
                    <Button transparent>
                  
                      <Text>Weather in...</Text>
                    </Button>
                  </Left>
                  <Body>
                    <Button transparent>
                      
                      <Text>Can you tell me...</Text>
                    </Button>
                  </Body>
                  <Right>
                
                    <Text>I want to know...</Text>
                  </Right>
                </CardItem>

                <View>
                  <Text> </Text>
                </View>
                <CardItem button onPress={() => setModal3Open(true)} style={{backgroundColor:"#EADE9E"}}>
                  <Left>
                    <Thumbnail source={{ uri: 'data:image/png;base64,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' }} />
                    <Body>
                      <Text>TURISTIC BOT</Text>
                      <Text note>THE MOST SEARCHED PLACES</Text>
                    </Body>
                  </Left>
                </CardItem>
                <CardItem cardBody>
                  <Image source={{ uri: 'https://thumbor.forbes.com/thumbor/960x0/https%3A%2F%2Fblogs-images.forbes.com%2Ftrevornace%2Ffiles%2F2015%2F11%2Fbeautiful-places-world-1200x900.jpg' }} style={{ height: 200, width: null, flex: 1 }} />
                </CardItem>
                <CardItem style={{backgroundColor:"#EADE9E"}}>
                  <Left>
                    <Button transparent>
                  
                      <Text>HOTELS</Text>
                    </Button>
                  </Left>
                  <Body>
                    <Button transparent>
                      
                      <Text>RESTAURANTS</Text>
                    </Button>
                  </Body>
                  <Right>
                
                    <Text>COFFE SHOP</Text>
                  </Right>
           
                </CardItem>

                <View>
                  <Text> </Text>
                </View>
                <CardItem button onPress={() => setModal4Open(true)} style={{backgroundColor:"#EADE9E"}}>
                  <Left>
                    <Thumbnail source={{ uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAARwAAACyCAMAAACnS4D4AAAAkFBMVEX///8JCQkAAACWlpaSkpJ6enr29vbo6Oj5+flzc3MEBASPj481NTXz8/PBwcH8/PyhoaGbm5unp6e8vLzh4eHOzs6zs7Ps7OzHx8fY2Ni/v7/U1NROTk6wsLARERHPz88dHR0uLi4YGBhPT09bW1tnZ2eAgIB1dXVHR0clJSWHh4c+Pj5ra2soKChfX18cHBxr2AjqAAALK0lEQVR4nO2d7WKiOhCGNVKhUuRThFrqaq216nbv/+4OzARIYsTaA9pE3z+riK48nZlkJhPs9e6666677rrrrqNynWkEmjrutb/Lr5IZxVlgV/KCcTq9E8rlRknOxRhwMuxBMI6u/dWuLScnI4CpAQUz59rf74pyEv8IGZQ9eJ5e+zteSRwaw7Z9D+SzTmYMkuG1v+c1lHp2BcYLJmnkWCAnSpPAqwAZXnpzsdkJjYpMGFniy1b0XPGxwxvzrcgzqNvExwzDTcMBPcm/qYFrUkaU2Gw6zSzxDJJLfbOry03wku3spEWYGQYmY3zgeXrKGgMbw5h844LdORqPEd4EHZeyCRo9qtY0uyE66FN29u35ixWDaxnP+g/pE7SD5IwrdUOgY2sflSO0gsnhK8PpJBmPk4kpMak5RGXdR/ShjyOzYDeuGXpGpXxWKNoV2o6v92wQgquR8dduTXIyXEJu+JOh7I2hzmFnYsM4xY077sSTpOY5Hu4sC+jYEnfURQ46FeccZpV/FhbDWJDhc2P91NfcsWLwjRl7aFKl5oYdxLkGdgWIH55mYHXPl/3Gl9MUQATMESumqaURjCMaZSxzHJT5+DPrWnCutqaDJJjSp0UpGLFQT4/KFzKGjolHLvRlLywwHGNcH3CxpmN46eHJKeIxYuYYzK1tPU0nFA0naUqarGc6la4PQTxn6eojyxMCaipe/dAch0ldFcREw2biN9LUsag8g6Gqdgon4BIJN9wT0PKhPDQHFl5taxB1bB2TCAjHzFAFlYtqtJ7sCBn1C+V8VvT6E4hSYf2eYiaoY0i2DN6HcFIXUB8ZENKvRQjGYReMa1BPBmea+lUELlG7CBiOQa97xaIBOmgeU4M3HUdTv3rmvQpHHmpI76R0KEKda0TG9buYfKPwTdbPNJFwWQkTngOCPJZ7L/O/0MFIH4zMEQa0RAhcesgSHCKoZ3gmGMuIrNHHUvQxsodnGMar+TMM/7Zu1WSHDzngVZTVngCbyh7cD6QDr2Ll0DnyMZoI/+T10+KaPRh2pmA4ZFCfO9wUdMgWHgONKr9wBzpmEDjdrZ7O6tiRAYkNd3LBa0TwZXam2Ot5/FM9BHDq6RuEZww5XwCHz5jQdMBAQj4EF08N3ZYhEn6wgng8h4dLUoxN/Nk+wInLN4pwdBvLx4dwMJK4fSJ6VT69ATiABCLyrcIZFvGFPAhnC3C86hUt4UjcqgFOAnAAyewG3CoxuLJeVk18G+AAEiEgF/mEdvWuhB+tsurpKcuJ+eGJTcm00ZyfBM6qrOAUnICf2IilUy1k8klRnRVI4UwqOFCVr2fIQy1nyA5/VVBQhms+AQco+hb/MbrlVpAUMYudVZw9AYfJ3uEF3jt1kTAGQ+ZZFEClcOYlHNOup9KFoH4Y93QTDFf1ZA4XauIjcGZw0KMw/KpojPan20ieR1YhlM6pX0nhpCWchB/IHS3jMS0FMmt6Q++7cGrDoeanYQcThGC/fj63T8EZAA3GcFwhPOujCErqdRW5aD/5Bhy2Rw4+wpa0Hagv+LMzy5WmbzTDsWHNk+nvCnX1qnI1hrnW9Cgc87Uo8hj5ewaMnWCDzryno2Dqz3WSjr2TcNhhGwzH0G16TDUWok4+4XVPwDEZlKmwNqyXwHToggzKbbQcPk0YBkJDimY6aCnpNcLZcsfSol1Z50ZkbCnhxuIGOGv+oJt6tqfbSjAj6EMZcN3XDXA+ipdnmb3exhNsKwi1nOOUGtti4GiA89BL1wvsSyF/91pzAdHO47gOyg1wVjapGr7yR3v9Ek5BkJzn+VFF5zicftkliBqR15n4aboJw46RlWbQAEcUIXrOjhmlSKfcdieFM63h0JhDH39z06y6QjoDH6cscjhLUqJ589IozVa0GW4j+Ty9ROnY4FpSOM4/aiqvZTFntkA6uPbphHGWhXqGIIw7uWslx+D8QRR/6jHfwp6dp/xhsKS+Rh50dDOT7ok5VrIo4bDXTkewKCDVKJY/etQw16Ib6ZvhCEd9QoFwI9irbmvDhdLiHhUn4PCT4qjPTnvq0UzHIoYTnnIrwmeZzkI6vo+IloE5Co5VAikc/qD1RMq58uc2ThLvhY7vT3qm6tGRSmAjHELKBZ4JHmF7mPWSFM6wAQ5h3Mh5g/Neh8XefWP9tTdCrfYbnQ+HDcDTT9rF7JVxiOhU25DCsT6PwhEyCOx/f9tUA/yICOVVlXU2HH41eIo2xs59RmSlS+XnbDi817gbwlAp09U3TVZFz4YjWMULUyv8fC1rG0JtXlWdDUfINUs45F8QTc0x1jZGRI+kQgrHPRsO2VCLCoEOWXX3jS8oKZze3zPhkEWVnYdoOlpsIZbDWZwLh3Ej2AVJtGg5bQUOeWOOpHDkvYsve2m1A8cTzyNLHeY67cDh7lb1KDtPSbUDhxu5t1hP7eDLXlpyOE9nwuH6tv07HCqJ5fiSNENNdQAH7o2hRfFUDqe4ZPJTtwoOeSkqOZxZUbYSWtWtxTctJ5Ns41dTcji9yNge+MVKYk4yy8n0sZyRFI5MaWFOokFgFZnroxxrYzmO3HKkGo4Pf3tmkL+fEK6snhzOCxXV9Aw4MlnvRFwSntS70hXX/4WTf4L4myPJHc5xzbSBc07M+aYQjn/6xF8l17VccV2gAzipanCsKNu+b3afu91qbQdR3XJ0h5Nuy070Uis7RUAdxByl4KTvQjsWrL+Rfw9z6+bh+CKZehVu5zvWTcNZs/sXqpuPlkf+PcC/HYxW3ukTry67arcmy93m7WW34AjR5qzbnOfMEUPRiT43h8W2RSeae487wYJahaPMDHmF649fwpaOYeStmCjdBZzf32SKd6yVB8fIf6p6RlqFM1YkK8c/4uORV4fZgnpdq3BCReo53omi3BBvvt4uHFUqgafg5JOSPySPSa3ekT9QxHLQ/Rv7hM0X0q7hUDi/fwd6BN/zs3lri9nymr8q61bYz0hWF22dVmbF08MZ8Gdwwf5OZeAM/9Ke/P7lch1bmUaCSfUTMv1LzVkf1OnPyappMNlc5gsXcEZqwOnN+jWeixRZ9grB6bmDelfdywU2rBY/XTMaKdMTaHn9KvR0PzlbqdYw6W6rWy507Vpu0VtAdkrtSjPplsxR1/uhhkUfj3L9/UFpPO+d7liFDaLkq8v/ogtFdPMz+eqSjgMdP/sO/4eO9HgBOtPGAttvlkFLfx16FlYClNyO5tHFmH1nmehM4V0zz5SO0dV/oMzKjEwlna7S9FiRKqlcMf2FwY5K4IYq5Ry5aAVs2U1uuFamnCOXgXS62f79oVJSLhP9NcpOEgnIOxcK367K2nW2/dstPppsVL4nQQR3AiTL9v/A2GSo9v7XEB2r/Vk+Zg8Kplas1gcbwtvRTN3sodYQ95Z9th0ccA7Y6uL7FYRNX60nQdi7oPz9b7ed3HXiQfE5IJWD9zppuWb3ovockCrGmNzqeoQ1KqY5b6dP/PXCPYiLNj8y0WEkB6UYk9ssL2DI0eI3sB7aNh2cH/fVDzm9ot47arctFusVqi1aHRFezGtbM0Hqp7+/k/Rbol3cLeWJruwmlApri8N5Ozem3eOHqVo/PpD1tz06tISmdrmC05yW2z/+b1vEdEWbMxVqPjkpny4RP/2/mXK4pK2Z2jgVaFt27nwlP7UeJyzvOa7H/I/RuuoZXKzjNDLPU5RmH3+r1ijVCzmH8uuWyh+qfLtudlNo/Mnsahydp+p9hGyUL+NI5Wz5n/o6X7n5+CqvxzQqfSQ/51PsPV7rNIQfaBqsfhxz9pnCS5zf1HTmrR8+Hs/Sehuk+pO566677rrrrrvu6k7/AUqTn6fRNa+nAAAAAElFTkSuQmCC' }} />
                    <Body>
                      <Text>MOTIVATIONAL BOT</Text>
                      <Text note>THE MOST ASKED QUESTIONS</Text>
                    </Body>
                  </Left>
                </CardItem>
                <CardItem cardBody>
                  <Image source={{ uri: 'https://img.freepik.com/free-photo/man-jumping-impossible-possible-cliff-sunset-background-business-concept-idea_1323-266.jpg?size=626&ext=jpg' }} style={{ height: 200, width: null, flex: 1 }} />
                </CardItem>
                <View>
                  <Text> </Text>
                </View>
                <CardItem style={{backgroundColor:"#EADE9E"}}>
                  <Left>
                    <Button transparent>
                  
                      <Text>Are we really free?</Text>
                    </Button>
                  </Left>
                  <Body>
                    <Button transparent>
                      
                      <Text>Does money makes you happy?</Text>
                    </Button>
                  </Body>
                  <Right>
                
                    <Text>Do we all have...</Text>
                  </Right>
           
                </CardItem>
              </Card>

              


            </View>

          </ScrollView>
        </Content>
        <Footer>
          <FooterTab>
            <Button vertical active>

              <Text>Home</Text>
            </Button>
            <Button vertical onPress={() => props.navigation.replace("statistics")}>

              <Text>Statistics</Text>
            </Button>
            <Button vertical onPress={() => props.navigation.replace("chat")} >

              <Text>Chat</Text>
            </Button>
            <Button vertical onPress={() => props.navigation.replace("profile")}>

              <Text>Profile</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    </>
  );
};



export default HomeScreen;




const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#EBECF4"
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
  HeadStyle: {
    height: 50,
    alignContent: "center",
    backgroundColor: '#ffe0f0'
  },
  TableText: {
    margin: 10
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
  },

  header: {
    paddingTop: 5,
    paddingBottom: 16,
    backgroundColor: "#FFF",
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#EBECF4",
    shadowColor: "#454D65",
    shadowOffset: { height: 1 },
    shadowRadius: 15,
    shadowOpacity: 0.2,
    zIndex: 10
  },
  headerTitle: {
    fontSize: 10,
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
