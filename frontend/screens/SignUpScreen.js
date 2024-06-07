// Imports
import React, { useState } from "react";
import { View, StyleSheet, Platform } from "react-native";
import Background from "../components/Background";
import Button from "../components/Button";
import Header from "../components/Header";
import TextInput from "../components/TextInput";
// Import the information validators for the user input
import { emailValidator } from "../helpers/emailValidator";
import { passwordValidator } from "../helpers/passwordValidator";
import { firstNameValidator } from "../helpers/firstNameValidator";
import { lastNameValidator } from "../helpers/lastNameValidator";

import { auth } from "../Firebase";
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { userProfileManager } from "../helpers/userProfileManager";
import { AuthContext } from "../helpers/context";
import { screenWidth } from "../App";

//Function that will register user using their emial and password
async function registerUser(email, password) {
	await createUserWithEmailAndPassword(auth, email, password)
		.then(
			() => {
				return Promise.resolve();
			},
			(fail) => {
				return Promise.reject(fail);
			}
		)
		.catch((err) => {
			return Promise.reject(err);
		});
}

// Function to return Screen Definition
export default function SignUpScreen({ navigation }) {
	// Values, setter definitions to bind to values
	// First and last name input field binding
	const [firstName, setFirstName] = useState({ value: "", error: "" });
	const [lastName, setLastName] = useState({ value: "", error: "" });
	const [email, setEmail] = useState({ value: "", error: "" });
	// Password value binding (input field can be secured by using secureTextEntry attribute )
	const [password, setPassword] = useState({ value: "", error: "" });
	const { signUp } = React.useContext(AuthContext);

	// Event for when the user taps cancel sign up
	const onSignUpCanceled = () => {
		// goBack() returns to the previously opened screen.
		navigation.goBack();
	};

	// Event for when the user taps cancel sign up
	const onSignUpCompleted = () => {
		// Use the validators to process the inputs and return errors if any
		const firstNameError = firstNameValidator(firstName.value);
		const lastNameError = lastNameValidator(lastName.value);
		const emailError = emailValidator(email.value);
		const passwordError = passwordValidator(password.value);

		// Check to see if there was an error
		if (firstNameError || lastNameError || emailError || passwordError) {
			// Update UI with the information about the error
			setFirstName({ ...firstName, error: firstNameError });
			setLastName({ ...lastName, error: lastNameError });
			setEmail({ ...email, error: emailError });
			setPassword({ ...password, error: passwordError });
			// Cancel the sign-up due to errors with info.
			return;
		} else {
			registerUser(email.value, password.value)
				.then(
					() => {
						signUp();
						userProfileManager.saveUserData(
							firstName.value,
							lastName.value,
							email.value,
							""
						);
						sendEmailVerification(auth.currentUser);
					},
					(fail) => {
						if (fail == "FirebaseError: Firebase: Error (auth/email-already-in-use).") {
							alert("User already exists");
						}
					}
				)
				.catch((err) => {
					console.log(err);
					alert("Fatal error occurred when signing up");
				});
		}
	};

	// Styles props are used to include styles like CSS in React Native
	const styles = StyleSheet.create({
		textInp: {
			alignSelf: "center",
			width: 275,
			...Platform.select({
				web: {
					width: "100%",
				}
			}),
		},
		mainView: {
			alignContent: "center",
			alignItems: "center",
		},
		inputView: {
			alignContent: "center",
			flexDirection: "column",
		},
		// Row style to horizontally align buttons
		buttonRow: {
			flexDirection: "row",
		},
		// Button style to size buttons
		buttonView: {
			padding: 5,
		},
	});

	return (
		// HTML Definition of Screen
		<Background>
			{/* Input List starts here */}
			{/* First name input field */}
			<View style={styles.mainView}>
				<Header>Sign Up</Header>
				<View style={styles.inputView}>
					<TextInput
						style={styles.textInp}
						label="First Name"
						returnKeyType="next"
						value={firstName.value}
						onChangeText={(fName) => setFirstName({ value: fName, error: "" })}
						error={!!firstName.error}
						errorText={firstName.error}
						textContentType="name"
					/>

					{/* Last name input field */}
					<TextInput
						style={styles.textInp}
						label="Last Name"
						returnKeyType="next"
						value={lastName.value}
						onChangeText={(lName) => setLastName({ value: lName, error: "" })}
						error={!!lastName.error}
						errorText={lastName.error}
						textContentType="name"
					/>

					<TextInput
						style={styles.textInp}
						label="Email"
						returnKeyType="next"
						value={email.value}
						onChangeText={(text) => setEmail({ value: text, error: "" })}
						error={!!email.error}
						errorText={email.error}
						autoCapitalize="none"
						autoCompleteType="email"
						textContentType="emailAddress"
						keyboardType="email-address"
					/>

					{/* Input for password with 'secureTextEntry' attribute */}
					<TextInput
						style={styles.textInp}
						label="Password"
						returnKeyType="done"
						value={password.value}
						onChangeText={(text) => setPassword({ value: text, error: "" })}
						error={!!password.error}
						errorText={password.error}
						secureTextEntry
					/>
				</View>

				{/* Row of buttons to confirm or cancel sign up */}
				<View style={styles.buttonRow}>
					{/* Cancel button that navigates back to previous screen.
                Uses 'contained' button style. */}
					<View style={styles.buttonView}>
						<Button mode="contained" onPress={onSignUpCanceled}>
							Cancel
						</Button>
					</View>

					{/* Sign up button to confirm the info provided*/}
					<View style={styles.buttonView}>
						<Button mode="contained" onPress={onSignUpCompleted}>
							Sign-Up
						</Button>
					</View>
				</View>
			</View>
		</Background>
	);
}
