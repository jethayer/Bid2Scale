// Imports
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Paragraph, Searchbar } from "react-native-paper";
import Background from "../components/Background";
import Button from "../components/Button";
import SmallLogo from "../components/SmallLogo";
import SmallerButton from "../components/SmallerButton";
import TaskbarMenu from "../components/TaskbarMenu";

// Function to return Screen Definition
export default function GuestScreen({ navigation }) {
	const [text, setText] = useState("");

	return (
		// HTML Definition of Screen
		<Background>
			<View style={styles.mainView}>
				<View style={styles.buttonRow}>
					<View style={styles.buttonView}>
						<SmallLogo />
					</View>
				</View>
				<Button mode="Contained" onPress={() => navigation.navigate("CategoryDisplay")}>
					View RFP Categories
				</Button>
				{/* Take the user to new screen of the different categories that they can press on to continue to search screen of them */}
				<View style={styles.buttonRow}>
					<View style={styles.buttonView}>
						<Searchbar
							placeholder="Search"
                            style={styles.searchbarStyle}
							onChangeText={(newText) => setText(newText)}
							defaultValue={text}
						></Searchbar>
					</View>

					<View style={styles.buttonView}>
						<SmallerButton
                            style={styles.goButton}
							mode="contained"
							onPress={() =>
								navigation.navigate("UserSearchingScreen", { input: text })
							}
						>
							Search
						</SmallerButton>
					</View>
				</View>
				<TaskbarMenu
					style={styles.taskMenu}
					mode="Contained"
					onPress={() => navigation.navigate("SignUpScreen")}
				>
					Want to sign up? Press here.
				</TaskbarMenu>
			</View>
		</Background>
	);
}
const styles = StyleSheet.create({
	mainView: {
		alignItems: "center",
	},
	buttonRow: {
        width: "100%",
        alignItems: "center",
		// flexDirection: "row",
	},
    goButton: {
        marginTop: 15,
        width: "100%",
    },
    searchbarStyle: {
        alignSelf: "center",
        width: "80%",
    },
	buttonView: {
        // flexGrow: 1,
		alignSelf: "center",
	},
	taskMenu: {
		alignSelf: "center",
	},
});
