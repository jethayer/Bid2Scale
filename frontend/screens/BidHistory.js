import React from 'react'
import { StyleSheet, View } from 'react-native'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Paragraph from '../components/Paragraph'
import { Text } from "react-native-paper";
import BackButton from "../components/BackButton";

// Function to return Screen Definition
export default function BidHistory({ navigation }) {
    return (
      //create drop down foor RFP categories
        <Background>
            <BackButton goBack={navigation.goBack} />
            <View style={styles.buttonRow}>
                <View style={styles.profile}>
                    <Logo />
                </View>
            </View>
            <Header>Previous Bids</Header>
            <Text> You currently have no Previous Bids</Text>
            
        </Background>
        )
    }

const styles = StyleSheet.create({
    buttonRow: {
        flexDirection: "row",
        width: '95%',
    },
    buttonView: {
        width: '70%',
        padding: 5,
    },
    profile: {
        alignItems: "center",
        width: '100%',
        padding: 5,
    },
})
