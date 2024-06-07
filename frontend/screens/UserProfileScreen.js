// Imports
import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import Background from "../components/Background";
import Header from "../components/Header";
import TextInput from "../components/TextInput";
import Button from "../components/Button";
// Import the information validators for the input fields
import { firstNameValidator } from "../helpers/firstNameValidator";
import { lastNameValidator } from "../helpers/lastNameValidator";
import { emailValidator } from "../helpers/emailValidator";
import { userProfileManager } from "../helpers/userProfileManager";
import { getAuth } from "firebase/auth";
import { screenHeight, screenWidth } from "../App";
import Logo from "../components/Logo";

// Function to return Screen Definition
export default function UserProfileScreen({ navigation }) {
	const auth = getAuth();
	const user = auth.currentUser;
	const [firstName, setFirstName] = useState({ value: "", error: "" });
	const [lastName, setLastName] = useState({ value: "", error: "" });
	const [email, setEmail] = useState({ value: "", error: "" });
	const [error, setError] = useState({ value: "", error: "" });

	React.useEffect(() => {
		if (user === null) {
			setError({ value: "                                        Sign up to view your profile", error: "" });
		} else {
			userProfileManager.setUserName(user.uid);
			loadValuesFromDB();
		}
	}, [user]);

	const styles = StyleSheet.create({
		mainView: {
			width: screenWidth,
			height: screenHeight,
			justifyContent: "center",
		},
		headerView: {
			alignItems: "center",
			textAlign: "center",
			alignSelf: "center",
		},
		buttonRow: {
			alignSelf: "center",
			flexDirection: "row",
			width: "90%",
		},
		buttonStyle: {
			flexShrink: 1,
			width: "100%",
		},
		inputStyle: {
			width: "80%",
			alignSelf: "center",
		},
	});

	navigation.addListener("focus", () => {
		// Screen entered focus
		loadValuesFromDB();
	});

    // Function to load all inputs from DB into input fields
    const loadValuesFromDB = async () => {
        try { 
            let firstNameVal = userProfileManager.getFirstName();
            let lastNameVal = userProfileManager.getLastName();
            let emailVal = userProfileManager.getEmail();

			loadFirstName(firstNameVal);
			loadLastName(lastNameVal);
			loadEmailName(emailVal);
		} catch (e) {
			setError({ value: "Error loading data", error: "" });

			loadFirstName("[first name]");
			loadLastName("[last name]");
			loadEmailName("[email]");
		}
	};

	// DB stubs to load inputs.
	const loadFirstName = (val) => {
		setFirstName({ value: val, error: "" });
	};

	const loadLastName = (val) => {
		setLastName({ value: val, error: "" });
	};

	const loadEmailName = (val) => {
		setEmail({ value: val, error: "" });
	};

	// DB stubs to save inputs.
	const saveEntries = async () => {
		try {
			userProfileManager.setFirstName(firstName.value);
			userProfileManager.setLastName(lastName.value);
			userProfileManager.setEmail(email.value);
			await userProfileManager.saveUserData();
		} catch (e) {
			setError({ value: "Error saving data", error: "" });
		}
	};

	// Event for when the user taps save
	const onSaveChanges = () => {
		// Use the validators to process the inputs and return errors if any
		const firstNameError = firstNameValidator(firstName.value);
		const lastNameError = lastNameValidator(lastName.value);
		const emailError = emailValidator(email.value);

		// Check to see if there was an error
		if (firstNameError || lastNameError || emailError) {
			// Update UI with the information about the error
			setFirstName({ ...firstName, error: firstNameError });
			setLastName({ ...lastName, error: lastNameError });
			setEmail({ ...email, error: emailError });

			setError({ value: "Enter valid info", error: "" });

			// Cancel the save to errors with info.
			return;
		}
		setError({ value: "", error: "" });
		// Continue with save
		saveEntries();
	};

	// Event for when the user taps cancel changes
	const onCanceled = () => {
		// Screen entered focus
		loadValuesFromDB();
	};

	return (
		// HTML Definition of Screen
		<Background>
			{/* First name input field */}
			<View style={styles.mainView}>
				<View style={styles.headerView}>
					<Logo />
					<Header>Update User Profile</Header>
				</View>
				<TextInput
					style={styles.inputStyle}
					label="First Name"
					returnKeyType="next"
					value={firstName.value}
					onChangeText={(newFName) => setFirstName({ value: newFName, error: "" })}
					error={!!firstName.error}
					errorText={firstName.error}
					textContentType="name"
				/>

				{/* Last name input field */}
				<TextInput
					style={styles.inputStyle}
					label="Last Name"
					returnKeyType="next"
					value={lastName.value}
					onChangeText={(newLastName) => setLastName({ value: newLastName, error: "" })}
					error={!!lastName.error}
					errorText={lastName.error}
					textContentType="name"
				/>

				<TextInput
					style={styles.inputStyle}
					label="Email"
					returnKeyType="done"
					value={email.value}
					onChangeText={(text) => setEmail({ value: text, error: "" })}
					error={!!email.error}
					errorText={email.error}
					autoCapitalize="none"
					autoCompleteType="email"
					textContentType="emailAddress"
					keyboardType="email-address"
				/>

				<Text>{error.value}</Text>

				<View style={styles.buttonRow}>
					<Button style={styles.buttonStyle} mode="contained" onPress={onCanceled}>
						Cancel
					</Button>
					<Button style={styles.buttonStyle} mode="contained" onPress={onSaveChanges}>
						Save
					</Button>
				</View>
			</View>
		</Background>
	);
}
