import React, { useState } from "react";
import { KeyboardAvoidingView, StyleSheet, View } from "react-native";
import Background from "../components/Background";
import Logo from "../components/Logo";
import { Searchbar } from "react-native-paper";
import TaskbarMenu from "../components/TaskbarMenu";
import SmallerButton from "../components/SmallerButton";
import Header from "../components/Header";
import { screenWidth } from "../App";

// Function to return Screen Definition
export default function UserHome({ navigation }) {
	const [text, setText] = useState("");
	return (
		//create drop down foor RFP categories
		<Background>
			<View style={styles.logoView}>
				<Logo />
			</View>
			<Header>Search Active RFPs</Header>
			<View style={styles.searchView}>
				<View style={styles.buttonView}>
					<Searchbar
						style={styles.searchStyle}
						placeholder="Search"
						onChangeText={(newText) => setText(newText)}
						returnKeyType="go"
						defaultValue={text}
					></Searchbar>
				</View>
				<View style={styles.buttonView}>
					<SmallerButton
						style={styles.buttonStyle}
						mode="contained"
						onPress={() => navigation.navigate("UserSearchingScreen", { input: text })}
					>
						Search
					</SmallerButton>
				</View>
			</View>
			<View style={styles.buttonRow}>
				<View style={styles.taskMenu}>
					{/* This will take user to current bids screen*/}
					<TaskbarMenu
						style={styles.tbarStyle}
						mode="contained"
						onPress={() => navigation.navigate("CurrentBids")}
					>
						Current Bids
					</TaskbarMenu>
				</View>

				<View style={styles.taskMenu}>
					{/* This will take user to transaction details screen*/}
					<TaskbarMenu style={styles.tbarStyle} mode="contained" onPress={() => navigation.navigate("BidHistory")}>
						Bid History
					</TaskbarMenu>
				</View>
			</View>
		</Background>
	);
}

const styles = StyleSheet.create({
	searchView: {
		// flex: 1,
		width: "100%",
		alignSelf: "center",
		alignContent: "center",
		alignItems: "center",
	},
	searchStyle: {
		width: "80%",
	},
	tbarStyle: {
		alignSelf: "center",
		width: "100%",
	},
	logoView: {
		// flex: 2,
		alignSelf: "center",
		flexDirection: "row",
	},
	buttonRow: {
		// flex: 1,
		margin: 50,
		alignSelf: "center",
		alignContent: "center",
		width: "100%",
		flexDirection: "row",
	},
	buttonView: {
		// flex:1,
		width: "100%",
		alignItems: "center",
	},
	taskMenu: {
		flex: 1,
		width: "100%",
		alignSelf: "center",
		padding: 5,
	},
	dropdown: {
		height: 40,
		borderColor: "blue",
		borderWidth: 0.5,
		borderRadius: 4,
		paddingHorizontal: 4,
	},
	profile: {
		width: "100%",
		alignSelf: "center",
	},
});
