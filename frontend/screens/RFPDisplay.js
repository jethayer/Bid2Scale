import React from "react";
import { Alert, ScrollView, StyleSheet, View } from "react-native";
import { Linking } from "react-native";
import { Text } from "react-native-paper";
import Background from "../components/Background";
import Logo from "../components/Logo";
import Header from "../components/Header";
import SmallerButton from "../components/SmallerButton";
import BackButton from "../components/BackButton";
import Paragraph from "../components/Paragraph";
import InformationIcon from "../components/InformationIcon";
import { screenWidth } from "../App";

// Function to return Screen Definition
export default function RFPDisplay({ navigation, route }) {
	// Load in the RFP object from the navigation parameters
	const rfpItem = route.params;

	return (
		//create drop down for RFP categories
		<Background>
			<BackButton goBack={navigation.goBack} />
			<Logo />
			<Header>RFP Details</Header>
			<ScrollView style={styles.textView}>
				<Text style={styles.baseText}>Company: </Text>
				<Text style={styles.rfpText}>{rfpItem.company}</Text>
				<Text style={styles.baseText}>Title:</Text>
				<Text style={styles.rfpText}>{rfpItem.title}</Text>
				<Text style={styles.baseText}>Deadline: </Text>
				<Text style={styles.rfpText}>{rfpItem.deadline}</Text>
				<Text style={styles.baseText}>Description: </Text>
				<Text style={styles.rfpText}>{rfpItem.full_description}</Text>
				{/* <Text
					style={{ color: "blue", marginBottom: 10, textAlign: "center" }}
					onPress={() => Linking.openURL("")}
				>
					View RFP
				</Text> */}
			</ScrollView>
			<ScrollView style={styles.buttonView}>
				<View style={styles.buttonRow}>
					<SmallerButton
						style={styles.expIntButton}
						mode="contained"
						onPress={() => navigation.navigate("ExpressInterest", rfpItem)}
					>
						Express Interest
					</SmallerButton>
					<InformationIcon
						onPress={() => {
							Alert.alert(
								"Express Interest Button",
								"Not sure if you meet the requirements? Express your Interest by filling out some simple questions and letting the RFP owner inform you if you do."
							);
						}}
					/>
				</View>
				<View style={styles.buttonRow}>
					<SmallerButton
						style={styles.partnerUpButton}
						mode="contained"
						onPress={() => navigation.navigate("PartnerUpScreen", rfpItem)}
					>
						Partner Up
					</SmallerButton>
					<InformationIcon
						onPress={() => {
							Alert.alert(
								"Partner Up Button",
								"Want to reach out? Connect with others to let them know you want to work together."
							);
						}}
					/>
				</View>
				<View style={styles.buttonRow}>
					<SmallerButton
						style={styles.applyButton}
						mode="contained"
						onPress={() => navigation.navigate("RFPApplyScreen", rfpItem)}
					>
						Apply for RFP
					</SmallerButton>
					<InformationIcon
						onPress={() => {
							Alert.alert(
								"Apply Button",
								"Ready to apply? Bid on this RFP to be considered as a potential supplier."
							);
						}}
					/>
				</View>
			</ScrollView>
		</Background>
	);
}

const styles = StyleSheet.create({
	buttonView: {
		alignContent: "center",
		maxWidth: '100%',
		padding: 5,
	},
	textView: {
		maxHeight: 300,
	},
	expIntButton: {
		flexGrow: 1,
		maxWidth: 300,
	},
	partnerUpButton: {
		// flex: 1,
		flexGrow: 1,
		maxWidth: 300,
	},
	baseText: {
		fontWeight: "bold",
		textAlign: "center",
	},
	rfpText: {
		textAlign: "center",
		width: 285,
	},
	applyButton: {
		// flex: 1,
		flexGrow: 1,
		maxWidth: 300,
	},
	buttonRow: {
		flexDirection: "row",
		alignSelf: "center",
		margin: 10,
		alignItems: "center",
	},
});
