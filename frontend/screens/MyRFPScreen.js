import React, { Suspense, useEffect, useState } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import SmallerButton from "../components/SmallerButton";
import { getDocs, collection, where, query, deleteDoc, doc } from "firebase/firestore";
import { userProfileManager } from "../helpers/userProfileManager";
import { rfpDatabaseManager } from "../helpers/RFPDatabaseManager";
import { firestore } from "../Firebase";
import RFP from "../components/RFPFile";
import Background from "../components/Background";
import Logo from "../components/Logo";

async function getCollection(query) {
	const tempDocs = await getDocs(query);
	return tempDocs;
}

export default function MyRFPScreen({ navigation }) {
	const [rfpList, setList] = useState([]);
	const [emptyMsg, setMsg] = useState("");
	var shouldShow = true;

	useEffect(() => {
		fillList();
	}, []);

	async function fillList() {
		let tempList = [];
		tempList = await rfpDatabaseManager.findRFPsByEmail(userProfileManager.getEmail());
		console.log();
		if (tempList.length == 0) {
			setMsg("No RFPs found...");
			shouldShow = true;
		} else {
			shouldShow = false;
			setList(tempList);
		}
	}

	const renderList = (item) => {
		return (
			<View style={styles.contentRow}>
				<View style={styles.rfpView}>
					<Text style={styles.categoryText}>Title:</Text>
					<Text style={styles.titleText}>
						{item.title} {"\n"}
					</Text>
					<Text style={styles.categoryText}>Company:</Text>
					<Text style={styles.companyText}>
						{item.company} {"\n"}
					</Text>
					<Text style={styles.categoryText}>Description:</Text>
					<Text style={styles.descText}>
						{item.full_description} {"\n"}
					</Text>
				</View>
				<View>
					<SmallerButton
						style={styles.detailButton}
						mode={"contained"}
						onPress={() => navigation.navigate("RFPDisplay", item)}
					>
						Details
					</SmallerButton>
					<SmallerButton
						style={styles.detailButton}
						mode={"contained"}
						onPress={() => navigation.navigate("RFPPosterDisplay", item)}
					>
						Requests
					</SmallerButton>
					<SmallerButton
						style={styles.deleteButton}
						mode={"contained"}
						onPress={async () => {
							//TODO: Create a prompt confirming before deleting
							await getCollection(
								query(
									collection(firestore, "rfps"),
									where("title", "==", item.title)
								)
							).then((results) => {
								if (results.docs.length === 0) {
									console.log("Error deleting RFP");
								} else {
									deleteDoc(doc(firestore, "rfps", results.docs[0].id)).then(
										() => {
											navigation.navigate();
											console.log("Successful Deletion");
										}
									);
								}
							});
						}}
					>
						Delete
					</SmallerButton>
				</View>
			</View>
		);
	};

	return (
		<Background>
			<View>
				<Suspense
					fallback={
						<View>
							<Text>Loading...</Text>
						</View>
					}
				>
					<View style={{ justifyContent: "center" }}>
						{shouldShow ? (
							<Text
								style={{
									textAlignVertical: "center",
									alignSelf: "center",
									fontSize: 20,
									marginTop: 300,
								}}
							>
								{emptyMsg}
							</Text>
						) : null}
					</View>
					<FlatList
						data={rfpList}
						renderItem={({ item }) => renderList(item)}
						keyExtractor={(item, index) => index.toString()}
					/>
				</Suspense>
			</View>
		</Background>
	);
}

const styles = StyleSheet.create({
	contentRow: {
		width: "100%",
		flexDirection: "row",
		borderBottomWidth: 1,
		borderStyle: "dotted",
	},
	categoryText: {
		fontWeight: "bold",
		textAlign: "center",
	},
	titleText: {
		textAlign: "left",
	},
	companyText: {
		textAlign: "left",
	},
	descText: {
		textAlign: "left",
	},
	rfpView: {
		maxWidth: 270,
		minWidth: 270,
		paddingRight: 10,
		alignSelf: "center",
	},
	detailButton: {
		width: "100%",
	},
	deleteButton: {
		width: "100%",
	},
});
