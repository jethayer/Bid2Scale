import React from "react";
import { StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import Background from "../components/Background";
import Logo from "../components/Logo";
import Header from "../components/Header";
import Paragraph from "../components/Paragraph";
import * as data from "../mockData/RFPList.json";

export default function RFPDetailsScreen({ navigation, route }) {
	const input = route.params.input;
	const rfpList = getRFP();

	function getRFP() {
		let filtered = " ";
		try {
			filtered = data.items.filter((item) => item.category === input.toLowerCase());
		} catch (err) {
			//Log the error somewhere maybe?
		}
		if (filtered.length == 0) {
			return (
				<Text style={styles.baseText}>
					No RFPs found in {input} category.{"\n"}
					Please try again
				</Text>
			);
		} else {
			return (
				<View>
					<Text style={styles.baseText}>Company Name:</Text>
					<Text>
						{rfpDetails[0].company} {"\n"}
					</Text>
					<Text style={styles.baseText}>Bid Deadline:</Text>
					<Text>
						{rfpDetails[0].deadline} {"\n"}
					</Text>
					<Text style={styles.baseText}>Description:</Text>
					<Text>
						{rfpDetails[0].desc} {"\n"}
					</Text>
					<Text
						style={{ color: "blue" }}
						onPress={() => console.log("Show document")}
					>
						View RFP
					</Text>
				</View>
			);
		}
	}

	return (
		<Background>
			<View style={styles.buttonRow}>
				<View style={styles.profile}>
					<Logo />
				</View>
			</View>
			<Header>RFP Details</Header>
			<Paragraph>{rfpList}</Paragraph>
		</Background>
	);
}

const styles = StyleSheet.create({
	buttonRow: {
		flexDirection: "row",
		width: "90%",
	},
	buttonView: {
		width: "90%",
		padding: 1,
	},
	profile: {
		width: "90%",
		padding: 5,
	},
	baseText: {
		fontWeight: "bold",
	},
});
