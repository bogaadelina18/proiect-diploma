
import React, { useState, useEffect } from 'react';

import { Container, Header, Card, Title, Content, Footer, FooterTab, Left, Right, Body, Icon, TextStyleSheet } from 'native-base';
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
    ImageBackground,
    Modal
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

const Profile = (props) => {


    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [address, setAddress] = useState('')
    const [email, setEmail] = useState('');


    const [modalOpen, setModalOpen] = useState(false);
 

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
                setAddress(data.address)
                setEmail(data.email)
            }
            )
    }
    useEffect(() => {
        Boiler()
    }, [])

    const sendCred = async (props) => {
        fetch("https://licenta-aplicatie2020.herokuapp.com/editProfile", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "name": name,
                "email": email

            })
        })
            .then(res => res.json())
            .then(async (data) => {
                try {
                    await AsyncStorage.setItem('token', data.token)
                    props.navigation.replace("profile")
                } catch (e) {
                    console.log("error hai", e)
                    Alert(e)
                }
            })
    }



    return (
        <Container>
            <Content>

                <Modal visible={modalOpen} animationType='slide' >

                    <View style={{ backgroundColor: '#000000aa', flex: 1 }}>

                        <View style={{ backgroundColor: "#ffffff", margin: 50, padding: 40, borderRadius: 10, flex: 1 }}>
                            <Text style={{ fontSize: 20 }}> PROFILE DATA </Text>
                            <Card>
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
                                    onChangeText={(text) => { setEmail(text) }}
                                    style={{ marginLeft: 18, marginRight: 18, marginTop: 18 }}
                                    theme={{ colors: { primary: "blue" } }}

                                />

                            </Card>
                            <Button
                                mode="contained"
                                style={{ marginLeft: 18, marginRight: 18, marginTop: 18 }}
                                onPress={() => sendCred(props)}>
                                SAVE CHANGES
                         </Button>
                            <Button
                                mode="contained"
                                style={{ marginLeft: 18, marginRight: 18, marginTop: 18 }}
                                onPress={() => setModalOpen(false)}>
                                <Text > CLOSE</Text>
                            </Button>
                        </View>
                    </View>

                </Modal>

                <>
                    <KeyboardAvoidingView behavior="position">

                        {/* <View style={styles.container}> */}

                        <StatusBar backgroundColor="red" barStyle="light-content" />


                        <View style={{margin: 5, padding: 5, borderRadius: 5, flex: 1}}> 
                        <Image source={{ uri: 'https://banner2.cleanpng.com/20180509/tje/kisspng-internet-bot-robot-chatbot-user-5af2f5c81982a4.6038090215258720721045.jpg' }} style={{ height: 130, width: null, flex: 1 }} />
                        </View>
                       
                        <TextInput
                            label='First Name'
                            mode="outlined"
                            editable={false}
                            value={firstName}
                            style={{ marginLeft: 18, marginRight: 18, marginTop: 18 }}
                            theme={{ colors: { primary: "blue" } }}
                            // onChangeText={(text) => setFirstName(text)}

                        />
                        <TextInput
                            label='Last Name'
                            mode="outlined"
                            editable={false}
                            value={lastName}
                            style={{ marginLeft: 18, marginRight: 18, marginTop: 18 }}
                            theme={{ colors: { primary: "blue" } }}
                            // onChangeText={(text) => setLastName(text)}

                        />
                        <TextInput
                            label='Address'
                            mode="outlined"
                            editable={false}
                            value={address}
                            style={{ marginLeft: 18, marginRight: 18, marginTop: 18 }}
                            theme={{ colors: { primary: "blue" } }}
                            // onChangeText={(text) => setAddress(text)}

                        />
                        <TextInput
                            label='Email'
                            mode="outlined"
                            editable={false}
                            value={email}
                            // onChangeText={(text) => { setEmail(text) }}
                            style={{ marginLeft: 18, marginRight: 18, marginTop: 18 }}
                            theme={{ colors: { primary: "blue" } }}

                        />
                        <Button
                            mode="contained"
                            style={{ marginLeft: 18, marginRight: 18, marginTop: 18 }}
                            onPress={() => setModalOpen(true)}>
                            CHANGE
                         </Button>

                    </KeyboardAvoidingView>
                </>


            </Content>
            <Footer>
                <FooterTab>
                    <Button vertical onPress={() => props.navigation.replace("home")}>

                        <Text>Home</Text>
                    </Button>
                    <Button vertical onPress={() => props.navigation.replace("statistics")}>

                        <Text>Statistics</Text>
                    </Button>
                    <Button vertical onPress={() => props.navigation.replace("chat")} >

                        <Text>Chat</Text>
                    </Button>
                    <Button vertical active>

                        <Text>Profile</Text>
                    </Button>
                </FooterTab>
            </Footer>
        </Container>
    );
}

export default Profile;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#EBECF4"
    },
    form: {
        marginBottom: 48,
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


