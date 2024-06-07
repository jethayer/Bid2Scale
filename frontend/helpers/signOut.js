import React from "react";
import { auth } from "../Firebase";
import { signOut } from "firebase/auth";
import { AuthContext } from "./context";
import { Alert, Platform } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

export default function UserSignOut() {
	const { logOut } = React.useContext(AuthContext);
	var confirm;

	useFocusEffect(
		React.useCallback(() => {
			if (Platform.OS == "web") {
				confirm = window.confirm("Are you sure you want to log out?");
				if (confirm) {
					signOut(auth)
						.then(() => {
							logOut();
							console.log("sign out successful");
						})
						.catch((error) => console.log(error)),
						[];
				}
			} else {
				Alert.alert("Confirm?", "Are you sure you want to log out?", [
					// The "Yes" button
					{
						text: "Yes",
						onPress: () => {
							signOut(auth)
								.then(() => {
									logOut();
									console.log("sign out successful");
								})
								.catch((error) => console.log(error)),
								[];
						},
					},
					// The "No" button
					// Does nothing but dismiss the dialog when tapped
					{
						text: "No",
						onPress: () => {
							console.log("FALSE");
							confirm = false;
						},
					},
				]);
			}
		})
	);

	return null;
}
