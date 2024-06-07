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
export default function RFPScreeningFormDetails ({ navigation, route }) {

    // Load in the RFP object from the navigation parameters
    const screeningForm = route.params;

    const [formState, setFormState] = useState({ value: '', error: '' })

    navigation.addListener('focus', () => {
        // Screen entered focus
        setFormState({ value: screeningForm.state, error: '' })
        });

    async function acceptScreening() {
        await rfpDatabaseManager.updateScreeningFormState(screeningForm.email, screeningForm.rfpId, "Accepted");
        let updatedForms = await rfpDatabaseManager.findScreeningFormsForRFP(screeningForm.rfpId);
        for (let i = 0; i < updatedForms.length; i++) {
            if (updatedForms[i].email == screeningForm.email) {
                screeningForm.state = updatedForms[i].state;
                setFormState({ value: screeningForm.state, error: '' })
            }
        }
    }

    async function rejectScreening() {
        await rfpDatabaseManager.updateScreeningFormState(screeningForm.email, screeningForm.rfpId, "Rejected");
        let updatedForms = await rfpDatabaseManager.findScreeningFormsForRFP(screeningForm.rfpId);
        for (let i = 0; i < updatedForms.length; i++) {
            if (updatedForms[i].email == screeningForm.email) {
                screeningForm.state = updatedForms[i].state;
                setFormState({ value: screeningForm.state, error: '' })
            }
        }
    }

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
                        Email: { screeningForm.email }
                    </Text>
                    <Text style={styles.baseText}> 
                        State: { formState.value }
                    </Text>
                    <Text style={styles.baseText}> 
                        RFP ID: { screeningForm.rfpId }
                    </Text>
                    <SmallerButton
						style={styles.detailButton}
						mode={"contained"}
						onPress={() => acceptScreening()}
					>
						Accept
					</SmallerButton>
					<SmallerButton
						style={styles.detailButton}
						mode={"contained"}
						onPress={() => rejectScreening()}
					>
						Reject
					</SmallerButton>
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
        alignItems: "center",
        padding: 5,
    },
    profile: {
        alignItems: "center",
        width: '100%',
        padding: 5,
    },
})
