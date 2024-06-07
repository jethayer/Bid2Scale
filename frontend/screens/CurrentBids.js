import React, { useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import Background from "../components/Background";
import Logo from "../components/Logo";
import Header from "../components/Header";
import { Text } from "react-native-paper";
import BackButton from "../components/BackButton";
import { rfpDatabaseManager } from "../helpers/RFPDatabaseManager";
import { userProfileManager } from "../helpers/userProfileManager";

// Function to return Screen Definition
export default function CurrentBids({ navigation, route }) {
	const [sentScreenings, setForms] = useState([]);

	navigation.addListener("focus", () => {
		// Screen entered focus
		getActiveForms();
	});

	//retrieve all corresponding RFPs
	async function getActiveForms() {
		// Load from searching Firebase
		console.log("Email To Find: " + userProfileManager.getEmail());
		let search = await rfpDatabaseManager.findScreeningFormsForEmail(
			userProfileManager.getEmail()
		);
		setForms(search);
		console.log("New List");
		console.log(search);
		console.log(sentScreenings);

		//rfpDatabaseManager.updateScreeningFormState(userProfileManager.getEmail(), search[0].rfp.id, "Pending");
		//await rfpDatabaseManager.clearInvalidScreeningForms();
		//await rfpDatabaseManager.clearInvalidPartnerForms();
		//await rfpDatabaseManager.clearInvalidExpressInterestForms();
	}

	const renderList = ({ item }) => {
		return (
			<View style={styles.buttonRow}>
				<View style={styles.buttonView}>
					<Text style={styles.baseText}>ID: {item.rfp.id}</Text>
					<Text style={styles.baseText}>RFP Company: {item.rfp.company}</Text>
					<Text style={styles.baseText}>State: {item.form.state}</Text>
				</View>
				<View style={styles.buttonView}></View>
			</View>
		);
	};

	return (
		//create drop down foor RFP categories
		<Background>
			<BackButton goBack={navigation.goBack} />
			<View style={styles.buttonRow}>
				<View style={styles.profile}>
					<Logo />
				</View>
			</View>

			<Header>Current Bids</Header>
			<FlatList data={sentScreenings} renderItem={renderList} extraData={sentScreenings} />
		</Background>
	);
}

const styles = StyleSheet.create({
	buttonRow: {
		flexDirection: "row",
		width: "95%",
	},
	buttonView: {
		width: "70%",
		padding: 5,
	},
	profile: {
		alignItems: "center",
		width: "100%",
		padding: 5,
	},
});
