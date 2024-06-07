import React, { useState } from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import Checkbox from "expo-checkbox";
import Background from "../components/Background";
import Logo from "../components/Logo";
import Header from "../components/Header";
import Button from "../components/Button";
import TextInput from "../components/TextInput";
import { userProfileManager } from "../helpers/userProfileManager";
//import { expressInterestManager } from "../helpers/expressInterestManager"
import { rfpDatabaseManager } from "../helpers/RFPDatabaseManager";
import RFPPartnerFile from "../components/RFPPartnerFile";
import BackButton from "../components/BackButton";
import { screenWidth } from "../App";

// Function to return Screen Definition
export default function PartnerUpScreen({ navigation, route }) {
	const [company, setCompany] = useState({ value: "", error: "" });
	const [firstName, setFirstName] = useState({ value: "", error: "" });
	const [lastName, setLastName] = useState({ value: "", error: "" });
	const [email, setEmail] = useState({ value: "", error: "" });
	const [companyDescription, setCompanyDescription] = useState({ value: "", error: "" });
	const [partner, setPartner] = useState({ value: false, error: "" });
	const [alternatives, setAlternatives] = useState({ value: false, error: "" });

	navigation.addListener("focus", () => {
		// Screen entered focus
		loadValuesFromDB();
	});

	// Function to load all inputs from DB into input fields
	const loadValuesFromDB = async () => {
		if (userProfileManager.isAuthenticated()) {
			try {
				let companyVal = userProfileManager.getCompany();
				let firstNameVal = userProfileManager.getFirstName();
				let lastNameVal = userProfileManager.getLastName();
				let emailVal = userProfileManager.getEmail();

				loadCompanyName(companyVal);
				loadFirstName(firstNameVal);
				loadLastName(lastNameVal);
				loadEmailName(emailVal);
			} catch (e) {
				console.log(e);

				loadCompanyName("[company]");
				loadFirstName("[first name]");
				loadLastName("[last name]");
				loadEmailName("[email]");
			}
		} else {
			loadCompanyName("");
			loadFirstName("");
			loadLastName("");
			loadEmailName("");
		}
	};

	const loadCompanyName = (val) => {
		setCompany({ value: val, error: "" });
	};

	const loadFirstName = (val) => {
		setFirstName({ value: val, error: "" });
	};

	const loadLastName = (val) => {
		setLastName({ value: val, error: "" });
	};

	const loadEmailName = (val) => {
		setEmail({ value: val, error: "" });
	};

	// Get RFP object from the navigation params
	const rfpItem = route.params;

	const submitInterestForm = () => {
		let form = new RFPPartnerFile();
		form.rfpId = rfpItem.id;
		form.company = company.value;
		form.firstName = firstName.value;
		form.lastName = lastName.value;
		form.email = email.value;
		form.companyDescription = companyDescription.value;
		form.allowPartner = partner.value;
		form.requestAlternatives = alternatives.value;

		rfpDatabaseManager.postPartnerForm(form, () => {
			rfpDatabaseManager.findPartnerFormsForRFP(form.rfpId);
		});

		navigation.navigate("RFPDisplay", rfpItem);
	};

	const App = () => {
		consst[(isSelected, setSelection)] = useState(false);
	};

	//const Details = route.params;
	return (
		//create drop down for RFP categories
		<Background>
			<BackButton goBack={navigation.goBack} />
			<Logo />
			<Header>Partner Up for RFP #{rfpItem.id}</Header>
			<ScrollView style={styles.mainScroller}>
				<View style={styles.buttonRow}>
					<View style={styles.buttonView}>
						<Text style={styles.text}> </Text>
						<Text style={styles.text}>Company Name: </Text>
					</View>
					<View style={styles.buttonView}>
						<TextInput
							style={styles.inputText}
							label="Company"
							returnKeyType="next"
							value={company.value}
							onChangeText={(text) => setCompany({ value: text, error: "" })}
							error={!!company.error}
							errorText={company.error}
						/>
					</View>
				</View>
				{/*First Name*/}
				<View style={styles.buttonRow}>
					<View style={styles.buttonView}>
						<Text style={styles.text}> </Text>
						<Text style={styles.text}>First Name: </Text>
					</View>
					<View style={styles.buttonView}>
						<TextInput
							style={styles.inputText}
							label="First Name"
							returnKeyType="next"
							value={firstName.value}
							onChangeText={(text) => setFirstName({ value: text, error: "" })}
							error={!!firstName.error}
							errorText={firstName.error}
						/>
					</View>
				</View>
				{/*Last Name*/}
				<View style={styles.buttonRow}>
					<View style={styles.buttonView}>
						<Text style={styles.text}> </Text>
						<Text style={styles.text}>Last Name: </Text>
					</View>
					<View style={styles.buttonView}>
						<TextInput
							style={styles.inputText}
							label="Last Name"
							returnKeyType="next"
							value={lastName.value}
							onChangeText={(text) => setLastName({ value: text, error: "" })}
							error={!!lastName.error}
							errorText={lastName.error}
						/>
					</View>
				</View>
				{/*Email Address*/}
				<View style={styles.buttonRow}>
					<View style={styles.buttonView}>
						<Text style={styles.text}> </Text>
						<Text style={styles.text}>Email: </Text>
					</View>
					<View style={styles.buttonView}>
						<TextInput
							style={styles.inputText}
							label="Email"
							returnKeyType="next"
							value={email.value}
							onChangeText={(text) => setEmail({ value: text, error: "" })}
							error={!!email.error}
							errorText={email.error}
						/>
					</View>
				</View>
				{/*Area of Expertise*/}
				<View style={styles.buttonRow}>
					<View style={styles.buttonView}>
						<Text style={styles.text}> </Text>
						<Text style={styles.text}>Area of Expertise: </Text>
					</View>
					<View style={styles.buttonView}>
						<TextInput
							style={styles.inputText}
							label="Area of Expertise"
							returnKeyType="done"
							value={companyDescription.value}
							onChangeText={(text) =>
								setCompanyDescription({ value: text, error: "" })
							}
							error={!!companyDescription.error}
							errorText={companyDescription.error}
						/>
					</View>
				</View>
				{/*Willing to work with other vendors*/}
				<View style={styles.buttonRow}>
					<View style={styles.buttonView}>
						<Text style={styles.text}> </Text>
						<Text style={styles.text}>Willing to work with other vendors?</Text>
					</View>
					<View style={styles.buttonView}>
						<Checkbox value={partner.value} onValueChange={(bool) => setPartner({value:bool, error:""})} />
					</View>
				</View>
				{/*Alternative opportunities*/}
				<View style={styles.buttonRow}>
					<View style={styles.buttonView}>
						<Text style={styles.text}> </Text>
						<Text style={styles.text}>
							Want to know about alternative opportunities?
						</Text>
					</View>
					<View style={styles.buttonView}>
						<Checkbox value={alternatives.value} onValueChange={(bool) => setAlternatives({value:bool, error:""})} />
					</View>
				</View>
			</ScrollView>
			<Button
				mode="contained"
				onPress={() => submitInterestForm()}
				//onPress={() => navigation.navigate('ExpressInterest')}
			>
				Submit
			</Button>
		</Background>
	);
}

const styles = StyleSheet.create({
	mainScroller: {
		flex: 1,
		flexGrow: 1,
		width: "100%",
	},
	buttonRow: {
		flex: 1,
		flexShrink: 1,
		flexDirection: "row",
		width: "90%",
		minHeight: 65,
		padding: 5,
		borderBottomWidth: 0.2,
		borderStyle: "dashed",
		alignSelf: "center",
		alignContent: "center",
		alignItems: "center",
	},
	buttonView: {
		flex: 1,
		flexDirection: "row",
		justifyContent: "center",
	},
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	checkboxContainer: {
		flexDirection: "row",
	},
	inputText: {
		width: 175,
	},
	text: {
		fontSize: 15,
		lineHeight: 25,
		textAlign: "center",
	},
});
