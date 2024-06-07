import React, { useState } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import Background from "../components/Background";
import Logo from "../components/Logo";
import Header from "../components/Header";
import Button from "../components/Button";
import TextInput from "../components/TextInput";
import { theme } from "../core/theme";
import { emailValidator } from "../helpers/emailValidator";
import { passwordValidator } from "../helpers/passwordValidator";
import { userProfileManager } from "../helpers/userProfileManager";
import { auth } from "../Firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { AuthContext } from "../helpers/context";

async function loginUser(email, password) {
	return await signInWithEmailAndPassword(auth, email, password);
}

export default function LoginScreen({ navigation }) {
	const [email, setEmail] = useState({ value: "", error: "" });
	const { login } = React.useContext(AuthContext);
	const [password, setPassword] = useState({ value: "", error: "" });
	const [errorMsg, setError] = useState({ value: "", error: "" });
	const onLoginPressed = () => {
		const emailError = emailValidator(email.value);
		const passwordError = passwordValidator(password.value);

		loginUser(email.value.toLowerCase(), password.value)
			.then(() => {
				login();
				userProfileManager
					.loadUserData(email.value)
					.then(
						() => {
							console.log("Success loading user data");
						},
						() => {
							console.log("Failure fetching user data");
						}
					)
					.catch((err) => {
						console.log("Error fetching user data:\n" + err);
					});
			})
			.catch((error) => {
				setErrorMessage(error);
			});
	};

	function setErrorMessage(error) {
		console.log(error);
		if (error == "auth/too-many-requests") {
			setError({ value: "Too many login attempts. Try again later." });
		} else {
			setError({ value: "Incorrect Email or Password" });
		}
	}

	return (
		<Background>
			<Logo />
			<Header>Login Here</Header>
			<View style={styles.inputView}>
				<Text style={styles.errorText}>{errorMsg.value}</Text>
				<TextInput
					label="Email"
					blurOnSubmit={false}
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
				<TextInput
					label="Password"
					blurOnSubmit={false}
					onKeyPress={(press) => {
						if (press.key == "Enter") {
							onLoginPressed();
						}
					}}
					returnKeyType="done"
					value={password.value}
					onChangeText={(text) => setPassword({ value: text, error: "" })}
					error={!!password.error}
					errorText={password.error}
					secureTextEntry
				/>
				<Button mode="contained" onPress={onLoginPressed}>
					Login
				</Button>
			</View>
		</Background>
	);
}

const styles = StyleSheet.create({
	errorText: {
		fontSize: 20,
		color: "red",
		textAlign: "center",
	},
	inputView: {
		width: '75%',
		...Platform.select({
			web: {
				width: '50%'
			},
		}),
	},
	forgotPassword: {
		width: "100%",
		alignItems: "flex-end",
		marginBottom: 24,
	},
	row: {
		flexDirection: "row",
		marginTop: 4,
	},
	forgot: {
		fontSize: 13,
		color: theme.colors.secondary,
	},
	link: {
		fontWeight: "bold",
		color: theme.colors.primary,
	},
});
