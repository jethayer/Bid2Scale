import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import TextInput from "../components/TextInput";
import Background from "../components/Background";
import Button from "../components/Button";
import { emailValidator } from "../helpers/emailValidator";
import { userProfileManager } from "../helpers/userProfileManager";
import { rfpDatabaseManager } from "../helpers/RFPDatabaseManager";
import RFP from "../components/RFPFile";
import { screenHeight, screenWidth } from "../App";
import DropdownBox from "../components/DropdownBox";
import Header from "../components/Header";

export default function AddRFPScreen({ navigation: { goBack } }) {
	const [inputCompanyName, setCompanyName] = useState("");
	const [inputRFPTitle, setRFPTitle] = useState("");
	const [inputContactName, setContactName] = useState("");
	const [inputEmail, setEmail] = useState("");
	const [inputDescription, setDescription] = useState("");
	const [inputID, setID] = useState("");
	const [inputKeywords, setKeywords] = useState("");

	useEffect(() => {
		if (userProfileManager.isAuthenticated()) {
			setEmail(userProfileManager.getEmail());
			setContactName(
				userProfileManager.getFirstName() + " " + userProfileManager.getLastName()
			);
		}
	},[]);

	const checkInput = () => {
		var error = "Please fill the following:\n";
		var foundError = false;

		if (!inputCompanyName.trim()) {
			error = error + "\t-Company Name\n";
			foundError = true;
		}
		if (!inputRFPTitle.trim()) {
			error = error + "\t-RFP Title\n";
			foundError = true;
		}
		if (!inputContactName.trim()) {
			error = error + "\t-Contact Name\n";
			foundError = true;
		}
		if (emailValidator(inputEmail) != "") {
			error = error + "\t-Valid Email\n";
			foundError = true;
		}
		if (!inputDescription.trim()) {
			error = error + "\t-Description";
			foundError = true;
		}

		if (!inputID.trim()) {
			error = error + "\t-ID";
			foundError = true;
		}

		if (!inputKeywords.trim()) {
			setKeywords("Bussiness Operations")
		}

		if (foundError) {
			alert(error);
			return false;
		} else {
			return true;
		}
	};

	return (
		<Background>
			<Header>Add an RFP</Header>
			<ScrollView style={styles.scroller}>
				<View style={styles.inputRow}>
					<Text style={styles.labelText}>Company Name</Text>
					<TextInput
						style={styles.inputText}
						value={inputCompanyName}
						onChangeText={(e) => setCompanyName(e)}
					/>
				</View>
				<View style={styles.inputRow}>
					<Text style={styles.labelText}>RFP Title</Text>
					<TextInput
						style={styles.inputText}
						value={inputRFPTitle}
						onChangeText={(e) => setRFPTitle(e)}
					/>
				</View>
				<View style={styles.inputRow}>
					<Text style={styles.labelText}>Name of Contact</Text>
					<TextInput
						style={styles.inputText}
						value={inputContactName}
						onChangeText={(e) => setContactName(e)}
					/>
				</View>
				<View style={styles.inputRow}>
					<Text style={styles.labelText}>Email</Text>
					<TextInput
						style={styles.inputText}
						value={inputEmail}
						onChangeText={(e) => setEmail(e)}
					/>
				</View>
				<View style={styles.inputRow}>
					<Text style={styles.labelText}>Description</Text>
					<TextInput
						style={styles.inputText}
						multiline={true}
						value={inputDescription}
						onChangeText={(e) => setDescription(e)}
					/>
				</View>
				<View style={styles.inputRow}>
					<Text style={styles.labelText}>ID *Needed</Text>
					<TextInput style={styles.inputText} value={inputID} onChangeText={e => setID(e)} />
				</View>
				<View style={styles.inputRow}>
					<Text style={styles.labelText}>Keyword</Text>
					<DropdownBox inputKeywords={inputKeywords} setKeywords={setKeywords} />
				</View>
			</ScrollView>
			<Button
				mode={"contained"}
				style={styles.submitButton}
				onPress={async () => {
					if (checkInput()) {
						let rfp = new RFP();
						rfp.company = inputCompanyName;
						rfp.title = inputRFPTitle;
						rfp.contact = inputContactName;
						rfp.email = inputEmail;
						rfp.full_description = inputDescription;
						rfp.id = inputID;
						let keywordsArray = inputKeywords.split(/,| /);
						rfp.keywords = keywordsArray;

						console.log(rfp);

						rfpDatabaseManager.postRFP(rfp, () => {
							navigation.navigate("UserHome");
						});
					}
				}}
			>
				Submit
			</Button>
		</Background>
	);
}

const styles = StyleSheet.create({
	scroller: {
		width: "100%",
		height: "100%",
		alignSelf: "center",
		alignContents: "center",
	},
	submitButton: {
		marginTop: 10,
		width: "80%",
		alignSelf: "center",
	},
	labelText: {
		fontWeight: "bold",
		textAlign: "left",
		textAlignVertical: "center",
		minWidth: 120,
	},
	inputText: {
		width: 200,
	},
	inputRow: {
		alignItems: "center",
		alignSelf: "center",
		flex: 1,
		flexDirection: "row",
	},
});