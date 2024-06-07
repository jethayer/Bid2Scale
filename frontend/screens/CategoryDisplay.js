// Imports
import React, { useState } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import Background from "../components/Background";
import SmallLogo from "../components/SmallLogo";
import Categories from "../components/Categories";
import Paragraph from "../components/Paragraph";
import Header from "../components/Header";
import { screenHeight, screenWidth } from "../App";
import BackButton from "../components/BackButton";
import Logo from "../components/Logo";


// Function to return Screen Definition
export default function CategoryDisplay({ navigation }) {
	// Function to navigate to the user searching screen with a specified search
	const navigateToSearch = (cat) => {
		navigation.navigate("UserSearchingScreen", {
			input: cat,
		});
	};

	return (
		// HTML Definition of Screen
		<Background>
            <BackButton goBack={navigation.goBack} />
			<View style={styles.logoView}>
					<Logo />
			</View>
			<Header>RFP Categories</Header>
			<ScrollView style={styles.mainScroller}>
				<View style={styles.catView}>
					<Categories
						style={styles.categories}
						mode="contained"
						onPress={() => navigateToSearch("Business Operations")}
					>
						Business Operations
					</Categories>

					<Categories
						style={styles.categories}
						mode="contained"
						onPress={() => navigateToSearch("Construction")}
					>
						Construction
					</Categories>

					<Categories
						style={styles.categories}
						mode="contained"
						onPress={() => navigateToSearch("Financial")}
					>
						Financial
					</Categories>

					<Categories
						style={styles.categories}
						mode="contained"
						onPress={() => navigateToSearch("Healthcare")}
					>
						Healthcare
					</Categories>

					<Categories
						style={styles.categories}
						mode="contained"
						onPress={() => navigateToSearch("Marketing")}
					>
						Marketing
					</Categories>

					<Categories
						style={styles.categories}
						mode="contained"
						onPress={() => navigateToSearch("Technology")}
					>
						Technology
					</Categories>
				</View>
			</ScrollView>
		</Background>
	);
}
const styles = StyleSheet.create({
	mainScroller: {
		// flexGrow: 1,
		width: "100%",
		height: "100%",
		flexDirection: "column",
	},
	catView: {
		alignSelf: "center",
		justifyContent: "center",
		width: "100%",
	},
	buttonRow: {
		alignContent: "center",
		flexDirection: "row",
		width: "100%",
	},
	logoView: {
		alignSelf: "center",
		alignItems: "center",
	},
	categories: {
		flex: 1,
		padding: 10,
		width: "100%",
		alignSelf: "center",
	},
});
