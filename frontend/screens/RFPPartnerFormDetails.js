import React from 'react'
import { StyleSheet, View } from 'react-native'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import { Text } from "react-native-paper";
import BackButton from "../components/BackButton";

// Function to return Screen Definition
export default function RFPPartnerFormDetails ({ navigation, route }) {

    // Load in the RFP object from the navigation parameters
    const partnerForm = route.params;

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
                    RFP ID: { partnerForm.rfpId }
                </Text>

                <Text style={styles.baseText}> 
                    Company: { partnerForm.company }
                </Text>

                <Text style={styles.baseText}> 
                    Email: { partnerForm.email }
                </Text>

                <Text style={styles.baseText}> 
                    First Name: { partnerForm.firstName }
                </Text>

                <Text style={styles.baseText}> 
                    Last Name: { partnerForm.lastName }
                </Text>

                <Text style={styles.baseText}> 
                    Company Description: { partnerForm.companyDescription }
                </Text>

                <Text style={styles.baseText}> 
                    Allow Partners: { partnerForm.allowPartner ? "Yes" : "No" }
                </Text>

                <Text style={styles.baseText}> 
                    Send Alternatives: { partnerForm.requestAlternatives ? "Yes" : "No" }
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
