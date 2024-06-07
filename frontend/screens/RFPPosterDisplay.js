import React, { useState } from "react";
import { StyleSheet, View, Image, FlatList } from "react-native";
import Background from "../components/Background";
import SmallLogo from "../components/SmallLogo";
import Logo from "../components/Logo";
import { Searchbar } from "react-native-paper";
import TaskbarMenu from "../components/TaskbarMenu";
import SmallerButton from "../components/SmallerButton";
import Header from "../components/Header";
import Paragraph from "../components/Paragraph";
import { Text } from "react-native-paper";
import BackButton from "../components/BackButton";
import { rfpDatabaseManager } from "../helpers/RFPDatabaseManager";

// Function to return Screen Definition
export default function RFPPosterDisplay({ navigation, route }) {
	const [screeningForms, setScreeningForms] = useState([]);
	const [partnerForms, setPartnerForms] = useState([]);
	const [expressInterestForms, setExpressInterestForms] = useState([]);

	// Load in the RFP object from the navigation parameters
	const rfpItem = route.params;

	navigation.addListener("focus", () => {
		// Screen entered focus
		getActiveForms();
	});

	//retrieve all corresponding RFPs
	async function getActiveForms() {
		// Load from searching Firebase
		console.log("Find active froms for RFP#" + rfpItem.id);

		let screen = await rfpDatabaseManager.findScreeningFormsForRFP(rfpItem.id);
		let interest = await rfpDatabaseManager.findExpressInterestFormsForRFP(rfpItem.id);
		let partner = await rfpDatabaseManager.findPartnerFormsForRFP(rfpItem.id);

		setScreeningForms(screen);
		setPartnerForms(partner);
		setExpressInterestForms(interest);

		//rfpDatabaseManager.updateScreeningFormState(userProfileManager.getEmail(), search[0].rfp.id, "Pending");
		//await rfpDatabaseManager.clearInvalidScreeningForms();
		//await rfpDatabaseManager.clearInvalidPartnerForms();
		//await rfpDatabaseManager.clearInvalidExpressInterestForms();
	}

	async function acceptScreening(form) {
		//console.log("will accept");
		//console.log(form);
		await rfpDatabaseManager.updateScreeningFormState(form.email, form.rfpId, "Accepted");
		await getActiveForms();
	}

	async function rejectScreening(form) {
		//console.log("will reject");
		//console.log(form);
		await rfpDatabaseManager.updateScreeningFormState(form.email, form.rfpId, "Rejected");
		await getActiveForms();
	}

	const renderPartnerList = ({ item }) => {
		return (
			<View style={styles.buttonRow}>
				<View style={styles.buttonView}>
					<Text style={styles.baseText}>Email: {item.email}</Text>
				</View>
				<View style={styles.buttonView}>
					<SmallerButton
						style={styles.detailButton}
						mode={"contained"}
						onPress={() => navigation.navigate("RFPPartnerFormDetails", item)}
					>
						View
					</SmallerButton>
				</View>
			</View>
		);
	};

	const renderInterestList = ({ item }) => {
		return (
			<View style={styles.buttonRow}>
				<View style={styles.buttonView}>
					<Text style={styles.baseText}>Email: {item.email}</Text>
				</View>
				<View style={styles.buttonView}>
					<SmallerButton
						style={styles.detailButton}
						mode={"contained"}
						onPress={() => navigation.navigate("RFPExpressInterestFormDetails", item)}
					>
						View
					</SmallerButton>
				</View>
			</View>
		);
	};

	const renderScreeningList = ({ item }) => {
		return (
			<View style={styles.buttonRow}>
				<View style={styles.buttonView}>
					<Text style={styles.baseText}>Email: {item.email}</Text>
					<Text style={styles.baseText}>State: {item.state}</Text>
					<Text style={styles.baseText}>RFP ID: {item.rfpId}</Text>
				</View>

				<View style={styles.buttonView}>
					<SmallerButton
						style={styles.detailButton}
						mode={"contained"}
						onPress={() => navigation.navigate("RFPScreeningFormDetails", item)}
					>
						View
					</SmallerButton>
				</View>
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
			<Header>Current Screenings</Header>
			<FlatList
				data={screeningForms}
				renderItem={renderScreeningList}
				extraData={screeningForms}
			/>

			<Header>Current Express Interest Forms</Header>
			<FlatList
				data={expressInterestForms}
				renderItem={renderInterestList}
				extraData={expressInterestForms}
			/>

			<Header>Current Partner Up Forms</Header>
			<FlatList data={partnerForms} renderItem={renderPartnerList} extraData={partnerForms} />
		</Background>
	);
}

const styles = StyleSheet.create({
	buttonRow: {
		alignItems: "center",
		alignSelf: "center",
		flexDirection: "row",
		width: "100%",
	},
	buttonView: {
		alignSelf: "center",
		alignItems: "center",
		width: "50%",
		// padding: 5,
	},
	profile: {
		alignItems: "center",
		width: "100%",
		padding: 5,
	},
});
