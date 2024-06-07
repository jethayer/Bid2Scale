import React from "react";
import { Dimensions, Platform, StyleSheet, View } from "react-native";
import Background from "../components/Background";
import Logo from "../components/Logo";
import Header from "../components/Header";
import Button from "../components/Button";
import { screenWidth, screenHeight } from "../App";
import { AuthContext } from "../helpers/context";

// Function to return Screen Definition
export default function HomeScreen({ navigation }) {
	const { guestLogin } = React.useContext(AuthContext);
	return (
		<Background>
			<View style={styles.mainView}>
				<Logo />
				<Header>Welcome to Bid2Scale</Header>
				<Button
					style={styles.button}
					mode="contained"
					onPress={() => navigation.navigate("LoginScreen")}
				>
					Login
				</Button>
				<Button
					style={styles.button}
					mode="contained"
					onPress={() => guestLogin()}
				>
					Continue as Guest
				</Button>
				<Button
					style={styles.button}
					mode="outlined"
					onPress={() => navigation.navigate("SignUpScreen")}
				>
					Sign Up
				</Button>
			</View>
		</Background>
	);
}

const styles = StyleSheet.create({
	mainView: {
		width: "75%",
		...Platform.select({
			web: {
				width: "30%"
			},
		}),
		height: "100%",
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	button: {
		alignSelf: "center",
		maxWidth: "100%",
	},
});
