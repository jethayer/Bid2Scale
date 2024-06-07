// Imports
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import Background from "../components/Background";
import SmallLogo from "../components/SmallLogo";
import Categories from "../components/Categories";
import Paragraph from "../components/Paragraph";
import { screenWidth } from "../App";

// Function to return Screen Definition
export default function RFPOptions({ navigation }) {
	const [text, setText] = useState("");

	// Function to navigate to the user searching screen with a specified search
	const navigateToSearch = (cat) => {
		navigation.navigate("UserSearchingScreen", {
			input: cat,
		});
	};

	return (
		// HTML Definition of Screen
		<Background>
			<View style={styles.mainView}>
				<View style={styles.buttonRow}>
					<SmallLogo />
				</View>
				<Paragraph>RFP Options</Paragraph>
				<View style={styles.catView}>
					<Categories
						style={styles.categories}
						mode="contained"
						onPress={() => navigation.navigate("CategoryDisplay")}
					>
						View by RFP Categories
					</Categories>
					<Categories
						style={styles.categories}
						mode="contained"
						onPress={() => navigation.navigate("Add RFP")}
					>
						Add RFP
					</Categories>
					<Categories
						style={styles.categories}
						mode="contained"
						onPress={() => navigation.navigate("MyRFPs")}
					>
						View my RFPs
					</Categories>
				</View>
			</View>
		</Background>
	);
}
const styles = StyleSheet.create({
	buttonRow: {
		width: "100%",
		alignItems: "center",
	},
	mainView: {
		width: "100%",
	},
	catView: {},
	categories: {
		width: "90%",
        height: 50,
        alignSelf: "center",
		marginTop: 40,
	},
});
