import React, { useState } from "react";
import { StyleSheet, View, FlatList } from "react-native";
import { Text } from "react-native-paper";
import { Searchbar } from "react-native-paper";
import Background from "../components/Background";
import Logo from "../components/Logo";
import SmallerButton from "../components/SmallerButton";
import Header from "../components/Header";
import RFP from "../components/RFPFile";
import { rfpDatabaseManager } from "../helpers/RFPDatabaseManager";
//import * as data from '../mockData/RFPList.json';
//import * as rfpData from '../mockData/RFPList.json';

// Function to return Screen Definition
export default function UserSearchingScreen({ navigation, route }) {
	const input = route.params.input;
	const [rfpsList, setRFPs] = useState([]);
	const [text, setText] = useState({ value: "", error: "" });

	navigation.addListener("focus", () => {
		// Screen entered focus
		getRFPs();
	});

	async function getRFPsWithButton() {
		let search = await rfpDatabaseManager.findRFPsByKeyword(text.value.trim());
		console.log("Found: ");
		console.log(search);
		setRFPs(search);
	}

	//retrieve all corresponding RFPs
	async function getRFPs() {
		// Load from searching Firebase
		let search = await rfpDatabaseManager.findRFPsByKeyword(input);
		console.log("Found: ");
		console.log(search);
		setRFPs(search);

		// Legacy Code below if dummy data is needed
		/*let filtered =" ";
        filtered = rfpData.items.filter(item => item.category === input.toLowerCase());

        let list = [];
        for (let i = 0; i < filtered.length; i++) {
            console.log(filtered[i]);
            let dummyRFP = new RFP();
            dummyRFP.id = filtered[i].id;
            dummyRFP.company = filtered[i].company;
            dummyRFP.short_description = filtered[i].desc; 
            dummyRFP.full_description = filtered[i].desc; 
            dummyRFP.deadline = filtered[i].deadline; 
            list.push(dummyRFP);
            console.log(dummyRFP);
        }

        return list;*/
	}

	const renderList = ({ item }) => {
		return (
			<View style={styles.buttonRow}>
				<View style={styles.buttonView}>
					<Text style={styles.baseText}>
						ID: {item.id} {"\n"}
						Company: {item.company} {"\n"}
						Description: {item.short_description}
					</Text>
				</View>
				<View style={styles.buttonView}>
					<SmallerButton
						mode="contained"
						onPress={() => navigation.navigate("RFPDisplay", item)}
					>
						Details
					</SmallerButton>
				</View>
			</View>
		);
	};

	return (
		//create drop down for RFP categories
		<Background>
			<View style={styles.mainView}>
				<View style={styles.buttonRow}>
					<View style={styles.profile}>
						<Logo />
					</View>
				</View>
				<View style={{ alignSelf: "center" }}>
					<Header>Search Active RFPs</Header>
				</View>

				<View style={styles.buttonRow}>
					<View style={styles.buttonView}>
						{/*<Search />*/}
						<Searchbar
							placeholder="Search"
							onChangeText={(newText) => {
								setText({ value: newText, error: "" });
							}}
							returnKeyType="go"
							value={text}
						></Searchbar>
					</View>
					<View style={styles.buttonView}>
						<SmallerButton
							mode="contained"
							onPress={() => {
								getRFPsWithButton();
								//navigation.navigate("UserSearchingScreen", { input: text });
							}}
						>
							Search
						</SmallerButton>
					</View>
				</View>
				<View>
					<FlatList data={rfpsList} renderItem={renderList} />
				</View>
			</View>
		</Background>
	);
}

const styles = StyleSheet.create({
	mainView: {
		width: "100%",
		alignSelf: "center",
	},
	buttonRow: {
		alignSelf: "center",
		flexDirection: "row",
		width: "90%",
	},
	buttonView: {
		width: "70%",
		padding: 5,
	},
	profile: {
		alignItems: "center",
		width: "90%",
		padding: 5,
	},
});
