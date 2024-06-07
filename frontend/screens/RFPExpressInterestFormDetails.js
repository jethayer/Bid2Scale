import React, { useState } from 'react'
import { StyleSheet, View, Image, FlatList } from 'react-native'
import Background from '../components/Background'
import SmallLogo from '../components/SmallLogo'
import Logo from '../components/Logo'
import { Searchbar } from 'react-native-paper'
import TaskbarMenu from '../components/TaskbarMenu'
import SmallerButton from '../components/SmallerButton'
import Header from '../components/Header'
import Paragraph from '../components/Paragraph'
import { Text } from "react-native-paper";
import BackButton from "../components/BackButton";
import { rfpDatabaseManager } from "../helpers/RFPDatabaseManager";

// Function to return Screen Definition
export default function RFPExpressInterestFormDetails ({ navigation, route }) {

    // Load in the RFP object from the navigation parameters
    const interestForm = route.params;

    navigation.addListener('focus', () => {
        // Screen entered focus

        });

    return (
      //create drop down foor RFP categories
        <Background>
            <BackButton goBack={navigation.goBack} />
            <View style={styles.buttonRow}>
                <View style={styles.profile}>
                    <Logo />
                </View>
            </View>
            <Header>Current Screenings</Header>
            <View style={styles.buttonRow}>
                <View style={styles.buttonView}>
                
                    <Text style={styles.baseText}> 
                        RFP ID: { interestForm.rfpId }
                    </Text>

                    <Text style={styles.baseText}> 
                        Company: { interestForm.company }
                    </Text>

                    <Text style={styles.baseText}> 
                        Email: { interestForm.email }
                    </Text>

                    <Text style={styles.baseText}> 
                        First Name: { interestForm.firstName }
                    </Text>

                    <Text style={styles.baseText}> 
                        Last Name: { interestForm.lastName }
                    </Text>

                    <Text style={styles.baseText}> 
                        Company Description: { interestForm.companyDescription }
                    </Text>

                    <Text style={styles.baseText}> 
                        Allow Partners: { interestForm.allowPartner ? "Yes" : "No" }
                    </Text>

                    <Text style={styles.baseText}> 
                        Send Alternatives: { interestForm.requestAlternatives ? "Yes" : "No" }
                    </Text>
                </View>
                
                <View style={styles.buttonView}>
              </View>
          </View>
        </Background>
        )
    }

const styles = StyleSheet.create({
    baseText: {
        textAlign: "center",
    },
    buttonRow: {
        flexDirection: "row",
        width: '100%'
    },
    buttonView: {
        width: '100%',
        padding: 5,
    },
    profile: {
        alignItems: "center",
        width: '100%',
        padding: 5,
    },
})
