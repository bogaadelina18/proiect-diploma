

import React from 'react';
import { View, Text, StyleSheet, ScrollView, StatusBar, Dimensions } from 'react-native';
// import FusionCharts from "react-native-fusioncharts";
import {
    Container,
    Header,
    Content,
    Footer,
    FooterTab,
    Button,

    Card,
    CardItem,
    Thumbnail,
    Left,
    Body,
    Right
} from 'native-base';

import { Icon } from 'react-native-elements';


import { Pie, BarChart, XAxis, Grid, AreaChart, YAxis } from 'react-native-svg-charts'
import { Circle, G, Line } from 'react-native-svg'
import { LinearGradient, Stop, Defs } from 'react-native-svg'
import * as scale from 'd3-scale'
import { Doughnut } from 'react-chartjs-2';

import { VictoryPie } from "victory-native";

const Statistics = (props) => {


    const cities = [];
    const counters = [];
    const date = [];
    // const dataa = {
    //     labels: [
    //       'MFA',
    //       'NON-MFA'
    //     ],
    //     datasets: [{
    //       data: [5667, 223829],
    //       backgroundColor: [
    //       '#FF6384',
    //       '#36A2EB'
    //       ],
    //       hoverBackgroundColor: [
    //       '#FF6384',
    //       '#36A2EB'
    //       ]
    //     }]
    //   };
      
    //   const option = {
    //     tooltips: {
    //       callbacks: {
    //         label: function(tooltipItem, dataa) {
    //           var dataset = data.datasets[tooltipItem.datasetIndex];
    //           var meta = dataset._meta[Object.keys(dataset._meta)[0]];
    //           var total = meta.total;
    //           var currentValue = dataset.data[tooltipItem.index];
    //           var percentage = parseFloat((currentValue/total*100).toFixed(1));
    //           return currentValue + ' (' + percentage + '%)';
    //         },
    //         title: function(tooltipItem, dataa) {
    //           return data.labels[tooltipItem[0].index];
    //         }
    //       }
    //     }
    //   }

    const data = {
        graphicData: [
            { y: 68.9, x: '68.9%' },
            { y: 25.6, x: '25.6%' },
            { y: 5.5, x: '5.5%' },
            // { y: 20, x: '20%' },
            // { y: 70, x: '70%' },
        ],
        graphicColor: ['red', 'blue', 'green']

    }



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
                    date.push({
                        value: dataCounter[city.counter],
                        label: dataCityName[city.cityName]
                    })

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

    
    }
    let newData = date.map(function (elem) {
        return {
            value: elem.value,
            label: elem.emotion,
        }
    });
    console.log(date.map(function (elem) {
        return {
            value: elem.value,
            label: elem.emotion,
        }
    }))
    console.log(counters[0])

    return (
        <Container>
            <Content>
                <StatusBar backgroundColor="red" barStyle="light-content" />
                <ScrollView>
                    <View style={styles.container}>
                  
                    </View>
                    <Card>
                        <CardItem button onPress={() => setModal1Open(true)} style={{ backgroundColor: "white" }}>
                            <Left>

                                <Body>
                                    <Text>CHATBOTS ACCESSED</Text>
                             
                                </Body>
                            </Left>
                        </CardItem>

                        <CardItem cardBody>
                            <VictoryPie
                                data={data.graphicData}
                                width={250}
                                height={250}
                                margin={120}
                             
                                colorScale={data.graphicColor}
                                style={{
                                    labels: {
                                        fill: 'black', fontSize: 20, padding: 10,
                                    },
                                }}
                            />
                           
                        </CardItem>
                        <CardItem style={{ backgroundColor: "white" }}>
                            <Left>
                                <Button transparent>
                                  

                                    <Text style={{ color: "red" }}>TURISTIC BOT</Text>

                                </Button>
                            </Left>
                        </CardItem>
                        <CardItem style={{ backgroundColor: "white" }}>
                            <Left>
                                <Button transparent>


                                    <Text style={{ color: "blue" }}>WEATHER BOT</Text>

                                </Button>
                            </Left>
                        </CardItem>
                        <CardItem style={{ backgroundColor: "white" }}>
                            <Left>
                                <Button transparent>


                                    <Text style={{ color: "green" }}>MOTIVATIONAL BOT</Text>

                                </Button>
                            </Left>
                        </CardItem>
                    
                    </Card>
                  
                </ScrollView>
            </Content>
            <Footer>
                <FooterTab>
                    <Button vertical onPress={() => props.navigation.replace("home")}>

                        <Text>Home</Text>
                    </Button>
                    <Button vertical active >

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
    )
}

export default Statistics;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#EBECF4"
    },
    container2: {
        height: '90%'
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
    },
    gauge: {
        position: 'absolute',
        width: 140,
        height: 140,
        alignItems: 'center',
        justifyContent: 'center',
    },
    gaugeText: {
        backgroundColor: 'transparent',
        color: '#000',
        fontSize: 24,
    },
    chartContainer: {
        height: 400,
        borderColor: '#000',
        borderWidth: 2
    }
});
