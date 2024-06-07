import React, { useState } from 'react'
import { StyleSheet, View, Text, ScrollView} from 'react-native'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import { userProfileManager } from "../helpers/userProfileManager"
//import { applyScreeningManager } from '../helpers/applyScreeningManager'
import { rfpDatabaseManager } from "../helpers/RFPDatabaseManager";
import RFPScreeningFile from '../components/RFPScreeningFile'
import BackButton from "../components/BackButton";
import Checkbox from 'expo-checkbox'
import { screenWidth } from "../App";

export default function RFPApplyScreen({ navigation, route }) {
	// Get RFP object from the navigation params
	const rfpItem = route.params;
	const [company, setCompany] = useState({ value: "", error: "" });
	const [fullName, setName] = useState({ value: "", error: "" });
	const [email, setEmail] = useState({ value: "", error: "" });
	const [expertise, setExpertise] = useState({ value: "", error: "" });
	const [subtractors, setSubtractors] = useState({ value: false, error: "" });
	const [partnerUp, setPartnerUp] = useState({ value: false, error: "" });
	const [otherOp, setOtherOp] = useState({ value: false, error: "" });
	const [minority, setMinority] = useState({ value: false, error: "" });
	const [certified, setCertified] = useState({ value: false, error: "" });
	const [referred, setRefered] = useState({ value: false, error: "" });
	const [agreement, setAgreement] = useState({ value: false, error: "" });
  navigation.addListener('focus', () => {
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
                if (lastNameVal != '') {
                  loadFullName(firstNameVal + " " + lastNameVal);
                } else {
                  loadFullName(firstNameVal);
                }
                loadEmailName(emailVal);
            } catch(e) { 
                console.log(e);

                loadCompanyName("[company]");
                loadFullName("[first name]");
                loadEmailName("[email]");
            }
        } else {
            loadCompanyName("");
            loadFullName("");
            loadEmailName("");
        }
    }

    const loadCompanyName = (val) => {
      setCompany({ value: val, error: '' });
    }

    const loadFullName = (val) => {
        setName({ value: val, error: '' });
    }

    const loadEmailName = (val) => {
        setEmail({ value: val, error: '' });
    }

    const submitScreeningForm = () => {
        let form = new RFPScreeningFile();
        form.rfpId = rfpItem.id;
        form.company = company.value;
        form.fullName = fullName.value;
        form.email = email.value;
        form.expertise = expertise.value;
        form.subtractors = subtractors.value;
        form.partnerUp = partnerUp.value;
        form.otherOp = otherOp.value;
        form.minority = minority.value;
        form.certified = certified.value;
        form.referred = referred.value;
        form.agreement = agreement.value;
        console.log(form);
        rfpDatabaseManager.postScreeningForm(form, () => {
            rfpDatabaseManager.findScreeningFormsForRFP(form.rfpId);    
        });

		//applyScreeningManager.submitApplyScreeningForm(rfpItem, company, fullName, email, expertise, partnerUp);
		navigation.navigate("RFPDisplay", rfpItem);
	};

  return (
    <Background>
        <Logo />
        <BackButton goBack={navigation.goBack} />
        <Header>RFP Screening{/*{ rfpItem.id }*/}</Header>
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
                  onChangeText={(text) => setCompany({ value: text, error: '' })}
                  error={!!company.error}
                  errorText={company.error}
              />
          </View>
        </View>
        <View style={styles.buttonRow}>
          <View style={styles.buttonView}>
              <Text style={styles.text}> </Text>
              <Text style={styles.text}>Full Name: </Text>
          </View>
          <View style={styles.buttonView}>
              <TextInput
			  	  style={styles.inputText}
                  label="Name"
                  returnKeyType="next"
                  value={fullName.value}
                  onChangeText={(text) => setName({ value: text, error: '' })}
                  error={!!fullName.error}
                  errorText={fullName.error}
              />
          </View>
        </View>
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
                  onChangeText={(text) => setEmail({ value: text, error: '' })}
                  error={!!email.error}
                  errorText={email.error}
              />
          </View>
        </View>
        <View style={styles.buttonRow}>
          <View style={styles.buttonView}>
              <Text style={styles.text}> </Text>
              <Text style={styles.text}>Area of Expertise: </Text>
          </View>
          <View style={styles.buttonView}>
              <TextInput
			  	  style={styles.inputText}
                  label="Area of Expertise"
                  returnKeyType="next"
                  value={expertise.value}
                  onChangeText={(text) => setExpertise({ value: text, error: '' })}
                  error={!!expertise.error}
                  errorText={expertise.error}
              />
          </View>
        </View>

				<View style={styles.buttonRow}>
					<View style={styles.buttonView}>
						<Text style={styles.text}> </Text>
						<Text style={styles.text}>
							I will partner with subtractors or other businesses to meet Deadline:{" "}
						</Text>
					</View>
					<View style={styles.buttonView}>
						<Checkbox
							value={subtractors.value}
							onValueChange={(bool) => setSubtractors({value:bool, error:""})}
						/>
					</View>
				</View>

				<View style={styles.buttonRow}>
					<View style={styles.buttonView}>
						<Text style={styles.text}> </Text>
						<Text style={styles.text}>Willing to work with other vendors?</Text>
					</View>
					<View style={styles.buttonView}>
						<Checkbox
							value={partnerUp.value}
							onValueChange={(bool) => setPartnerUp({value:bool, error:""})}
						/>
					</View>
				</View>

				<View style={styles.buttonRow}>
					<View style={styles.buttonView}>
						<Text style={styles.text}> </Text>
						<Text style={styles.text}>I am interested in other opportunities:</Text>
					</View>
					<View style={styles.buttonView}>
						<Checkbox
							value={otherOp.value}
							onValueChange={(bool) => setOtherOp({value:bool, error:""})}
						/>
					</View>
				</View>

				<View style={styles.buttonRow}>
					<View style={styles.buttonView}>
						<Text style={styles.text}> </Text>
						<Text style={styles.text}>I am a Minority Supplier: </Text>
					</View>
					<View style={styles.buttonView}>
						<Checkbox
							value={minority.value}
							onValueChange={(bool) => setMinority({value:bool, error:""})}
						/>
					</View>
				</View>

				<View style={styles.buttonRow}>
					<View style={styles.buttonView}>
						<Text style={styles.text}> </Text>
						<Text style={styles.text}>I am Certified:</Text>
					</View>
					<View style={styles.buttonView}>
						<Checkbox
							value={certified.value}
							onValueChange={(bool) => setCertified({value:bool, error:""})}
						/>
					</View>
				</View>

				<View style={styles.buttonRow}>
					<View style={styles.buttonView}>
						<Text style={styles.text}> </Text>
						<Text style={styles.text}>Were you Referred?</Text>
					</View>
					<View style={styles.buttonView}>
						<Checkbox
							value={referred.value}
							onValueChange={(bool) => setRefered({value:bool, error:""})}
						/>
					</View>
				</View>

				<View style={styles.buttonRow}>
					<View style={styles.buttonView}>
						<Text style={styles.text}> </Text>
						<Text style={styles.text}>
							I have read the bid and apply for official status as plan taker.
						</Text>
					</View>
					<View style={styles.buttonView}>
						<Checkbox
							value={agreement.value}
							onValueChange={(bool) => setAgreement({value:bool, error:""})}
						/>
					</View>
				</View>
			</ScrollView>
				<Button mode="contained" onPress={() => submitScreeningForm()}>
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
	inputText: {
		width: 175,
	},
	checkboxContainer: {
		flexDirection: "row",
	},
	text: {
		fontSize: 15,
		lineHeight: 25,
		textAlign: "center",
	},
});
