import { firestore } from "../Firebase";
import { getDocs, addDoc, updateDoc, deleteDoc, doc, collection } from "firebase/firestore"
import RFP from '../components/RFPFile'
import RFPExpressInterestFile from '../components/RFPExpressInterestFile'
import RFPScreeningFile from '../components/RFPScreeningFile'
import RFPPartnerFile from '../components/RFPPartnerFile'

class RFPDatabaseManager {
    constructor(){

    }

    /// Post a given RFP, call done when completed
    async postRFP(rfp, done) {
        // Reference: https://firebase.google.com/docs/firestore/manage-data/add-data#add_a_document
        await addDoc(collection(firestore, "rfps"), {
            id: rfp.id,
            title: rfp.title,
            company: rfp.company,
            person_of_contact: rfp.person_of_contact,
            email: rfp.email,
            short_description: rfp.short_description,
            budget: rfp.budget,
            deadline: rfp.deadline,
            full_description: rfp.full_description,
            keywords: rfp.keywords
        }).then(() => {
            alert("RFP Added");
        })
        .catch((error) => {
            alert(error);
        })
        .finally(() => {
            done();
        })
    }

    /// Search for an RFP by ID
    async findRFPByID(id) {
        // Reference: https://firebase.google.com/docs/firestore/query-data/get-data
        let rfp = null;

        let docSnapshot = await getDocs(collection(firestore, "rfps"));

        docSnapshot.forEach((doc) => {
            let data = doc.data();
            if (data.id == id) {
                rfp = new RFP();
                rfp.id = data.id;
                rfp.title = data.title;
                rfp.company = data.company;
                rfp.person_of_contact = data.person_of_contact;
                rfp.email = data.email;
                rfp.short_description = data.short_description;
                rfp.budget = data.budget;
                rfp.deadline = data.deadline;
                rfp.full_description = data.full_description;
                rfp.keywords = data.keywords;
            }
          });

        if (rfp != null) {
            console.log("RFP with id " + id + " found");
            console.log(rfp);
        } else {
            console.log("RFP with id " + id + " not found");
        }

        return rfp;
    }

    /// Search for an RFP by ID
    async findRFPsByEmail(email) {
        // Reference: https://firebase.google.com/docs/firestore/query-data/get-data
        let rfps = [];

        let docSnapshot = await getDocs(collection(firestore, "rfps"));

        docSnapshot.forEach((doc) => {
            let data = doc.data();
            let found = false;

            if (data.email == email) {
                found = true;
            }

            if (found) {
                let rfp = new RFP();
                rfp.id = data.id;
                rfp.title = data.title;
                rfp.company = data.company;
                rfp.person_of_contact = data.person_of_contact;
                rfp.email = data.email;
                rfp.short_description = data.short_description;
                rfp.budget = data.budget;
                rfp.deadline = data.deadline;
                rfp.full_description = data.full_description;
                rfp.keywords = data.keywords;
                rfps.push(rfp);

                console.log(rfp);
            }
          });

        console.log("Found " + rfps.length + " RFPs under keyword '" + email + "'");

        return rfps;
    }
    
    /// Search for an RFP by keywords
    async findRFPsByKeyword(keyword) {
        if (keyword) {} else { console.log("Must give keyword to search by"); return;}

        // Reference: https://firebase.google.com/docs/firestore/query-data/get-data
        let rfps = [];

        let docSnapshot = await getDocs(collection(firestore, "rfps"));

        docSnapshot.forEach((doc) => {
            let data = doc.data();
            let found = false;

            console.log(data.keywords);
            if (data.keywords) {
                data.keywords.forEach((key) => {
                    if (keyword.toUpperCase() == key.toUpperCase()){
                        found = true;
                        console.log("RFP with keyword '" + keyword + "' found");
                    }
                });
            }

            if (found) {
                let rfp = new RFP();
                rfp.id = data.id;
                rfp.title = data.title;
                rfp.company = data.company;
                rfp.person_of_contact = data.person_of_contact;
                rfp.email = data.email;
                rfp.short_description = data.short_description;
                rfp.budget = data.budget;
                rfp.deadline = data.deadline;
                rfp.full_description = data.full_description;
                rfp.keywords = data.keywords;
                rfps.push(rfp);

                console.log(rfp);
            }
          });

        console.log("Found " + rfps.length + " RFPs under keyword '" + keyword + "'");

        return rfps;
    }

    ///////////////////////////////////////////////////////////////////////////////////////
    // Express Interest Forms
    ///////////////////////////////////////////////////////////////////////////////////////

    /// Record a request to express interest for an RFP
    async postExpressInterestForm(interestForm, done) {
        await addDoc(collection(firestore, "rfp_express_interest_forms"), {
            rfpId: interestForm.rfpId,
            company: interestForm.company,
            firstName: interestForm.firstName,
            lastName: interestForm.lastName,
            email: interestForm.email,
            companyDescription: interestForm.companyDescription,
            allowPartner: interestForm.allowPartner,
            requestAlternatives: interestForm.requestAlternatives
        }).then(() => {
            alert("Request Form Added");
        })
        .catch((error) => {
            alert(error);
        })
        .finally(() => {
            done();
        })
    }

    /// Get all express interest forms for an RFP
    async findExpressInterestFormsForRFP(rfpId) {
        let forms = [];

        let docSnapshot = await getDocs(collection(firestore, "rfp_express_interest_forms"));

        docSnapshot.forEach((doc) => {
            let data = doc.data();
            console.log("Item");
            console.log(data);
            if (data.rfpId == rfpId) {
                let form = new RFPExpressInterestFile();
                form.rfpId = data.rfpId;
                form.company = data.company;
                form.firstName = data.firstName;
                form.lastName = data.lastName;
                form.email = data.email;
                form.companyDescription = data.companyDescription;
                form.allowPartner = data.allowPartner;
                form.requestAlternatives = data.requestAlternatives;

                forms.push(form);
            }
          });

        console.log("Found:");
        console.log(forms);

        return forms;
    }

    /// Delete invalid express interest forms that were submitted (invalid type structure)
    async clearInvalidExpressInterestForms() {
        console.log("Clear Invalid Express Interest Forms");
        let clearIDs = [];

        let docSnapshot = await getDocs(collection(firestore, "rfp_express_interest_forms"));

        docSnapshot.forEach((doc) => {
            let data = doc.data();
            console.log("Check");
            if (typeof data.email === 'string' || data.email instanceof String) {
                console.log("Keep " + doc.id);
            } else {
                console.log("Remove " + doc.id);
                clearIDs.push(doc.id);
            }
          });
          
        for (let i = 0; i < clearIDs.length; i++) {
            const docRef = doc(firestore, "rfp_express_interest_forms", clearIDs[i]);
          
            await deleteDoc(docRef)
            .then(docRef => {
                console.log("Doc removed");
            })
            .catch(error => {
                console.log(error);
            })
        }
    }

    ///////////////////////////////////////////////////////////////////////////////////////
    // Partner Forms
    ///////////////////////////////////////////////////////////////////////////////////////

    /// Record a request to partner up for an RFP
    async postPartnerForm(partnerForm, done) {
        await addDoc(collection(firestore, "rfp_partner_forms"), {
            rfpId: partnerForm.rfpId,
            company: partnerForm.company,
            firstName: partnerForm.firstName,
            lastName: partnerForm.lastName,
            email: partnerForm.email,
            companyDescription: partnerForm.companyDescription,
            allowPartner: partnerForm.allowPartner,
            requestAlternatives: partnerForm.requestAlternatives
        }).then(() => {
            alert("Partner Form Added");
        })
        .catch((error) => {
            alert(error);
        })
        .finally(() => {
            done();
        })
    }

    /// Get all partner up forms for an RFP
    async findPartnerFormsForRFP(rfpId) {
        let forms = [];

        let docSnapshot = await getDocs(collection(firestore, "rfp_partner_forms"));

        docSnapshot.forEach((doc) => {
            let data = doc.data();
            console.log("Item");
            console.log(data);
            if (data.rfpId == rfpId) {
                let form = new RFPPartnerFile();
                form.rfpId = data.rfpId;
                form.company = data.company;
                form.firstName = data.firstName;
                form.lastName = data.lastName;
                form.email = data.email;
                form.companyDescription = data.companyDescription;
                form.allowPartner = data.allowPartner;
                form.requestAlternatives = data.requestAlternatives;

                forms.push(form);
            }
          });

        console.log("Found Partner Forms:");
        console.log(forms);

        return forms;
    }

    /// Delete invalid partner forms that were submitted (invalid type structure)
    async clearInvalidPartnerForms() {
        console.log("Clear Invalid Partner Forms");
        let clearIDs = [];

        let docSnapshot = await getDocs(collection(firestore, "rfp_partner_forms"));

        docSnapshot.forEach((doc) => {
            let data = doc.data();
            console.log("Check");
            if (typeof data.email === 'string' || data.email instanceof String) {
                console.log("Keep " + doc.id);
            } else {
                console.log("Remove " + doc.id);
                clearIDs.push(doc.id);
            }
          });
          
        for (let i = 0; i < clearIDs.length; i++) {
            const docRef = doc(firestore, "rfp_partner_forms", clearIDs[i]);
          
            await deleteDoc(docRef)
            .then(docRef => {
                console.log("Doc removed");
            })
            .catch(error => {
                console.log(error);
            })
        }
    }

    ///////////////////////////////////////////////////////////////////////////////////////
    // Screening Forms
    ///////////////////////////////////////////////////////////////////////////////////////

    /// Record a request to screen for an RFP
    async postScreeningForm(screeningForm, done) {
        await addDoc(collection(firestore, "rfp_screening_forms"), {
            rfpId: screeningForm.rfpId,
            company: screeningForm.company,
            fullName: screeningForm.fullName,
            email: screeningForm.email,
            expertise: screeningForm.expertise,
            subtractors: screeningForm.subtractors,
            partnerUp: screeningForm.partnerUp,
            otherOp: screeningForm.otherOp,
            minority: screeningForm.minority,
            certified: screeningForm.certified,
            referred: screeningForm.referred,
            agreement: screeningForm.agreement,
            state: screeningForm.state
        }).then(() => {
            alert("Request Form Added");
        })
        .catch((error) => {
            alert(error);
        })
        .finally(() => {
            done();
        })
    }

    /// Get all screen request forms for an RFP
    async findScreeningFormsForRFP(rfpId) {
        let forms = [];

        let docSnapshot = await getDocs(collection(firestore, "rfp_screening_forms"));

        docSnapshot.forEach((doc) => {
            let data = doc.data();
            console.log("Item");
            console.log(data);
            if (data.rfpId == rfpId) {
                let form = new RFPScreeningFile();
                form.rfpId = data.rfpId;
                form.company = data.company;
                form.fullName = data.fullName;
                form.email = data.email;
                form.expertise = data.expertise;
                form.subtractors = data.subtractors;
                form.partnerUp = data.partnerUp;
                form.otherOp = data.otherOp;
                form.minority = data.minority;
                form.certified = data.certified;
                form.referred = data.referred;
                form.agreement = data.agreement;
                form.state = data.state;

                forms.push(form);
            }
          });

        console.log("Found:");
        console.log(forms);

        return forms;
    }

    /// Get all screen request forms for an RFP
    async findScreeningFormsForEmail(email) {
        let forms = [];

        let docSnapshot = await getDocs(collection(firestore, "rfp_screening_forms"));

        docSnapshot.forEach((doc) => {
            let data = doc.data();
            //console.log("Item");
            //console.log(data.email + "=" + email);
            if (data.email == email) {
                let form = new RFPScreeningFile();
                form.rfpId = data.rfpId;
                form.company = data.company;
                form.fullName = data.fullName;
                form.email = data.email;
                form.expertise = data.expertise;
                form.subtractors = data.subtractors;
                form.partnerUp = data.partnerUp;
                form.otherOp = data.otherOp;
                form.minority = data.minority;
                form.certified = data.certified;
                form.referred = data.referred;
                form.agreement = data.agreement;
                form.state = data.state;

                forms.push(form);
            }
          });

          //console.log(forms);

          let docSnapshot2 = await getDocs(collection(firestore, "rfps"));

          let fullPair = [];

          for (let i = 0; i < forms.length; i++) {
            docSnapshot2.forEach((doc) => {
                let data = doc.data();
                //console.log("compare:");
                //console.log(data.id);
                //console.log(forms[i].rfpId);
                if (data.id == forms[i].rfpId) {
                    let rfp = new RFP();
                    rfp.id = data.id;
                    rfp.title = data.title;
                    rfp.company = data.company;
                    rfp.person_of_contact = data.person_of_contact;
                    rfp.email = data.email;
                    rfp.short_description = data.short_description;
                    rfp.budget = data.budget;
                    rfp.deadline = data.deadline;
                    rfp.full_description = data.full_description;
                    rfp.keywords = data.keywords;

                    fullPair.push({form : forms[i], rfp : rfp});
                }
              });
          }

        //console.log("Found:");
        //console.log(fullPair);

        return fullPair;
    }

    /// Get all screen request forms for an RFP
    async updateScreeningFormState(email, rfpId, newState) {
        let formID = "";
        let foundData = {};
        let foundDoc = {};

        let docSnapshot = await getDocs(collection(firestore, "rfp_screening_forms"));

        await docSnapshot.forEach((doc) => {
            let data = doc.data();
            console.log("Find Item");
            if (data.email == email && data.rfpId == rfpId) {
                formID = doc.id;
                foundDoc = doc;
                foundData = data;
                //console.log("Found");
                //console.log(foundData);
            }
          });

        if (formID == "") {
            console.log("Not Found");
            return;
        }

        foundData.state = newState;
        //console.log("Updating...");
        //console.log(foundData);
        //console.log(formID);

        const docRef = doc(firestore, "rfp_screening_forms", formID);
          
        await updateDoc(docRef, foundData)
        .then(docRef => {
            console.log("State Updated");
        })
        .catch(error => {
            console.log(error);
        })
    }

    /// Delete invalid screening forms that were submitted (invalid type structure)
    async clearInvalidScreeningForms() {
        console.log("Clear Invalid Screening Forms");
        let clearIDs = [];

        let docSnapshot = await getDocs(collection(firestore, "rfp_screening_forms"));

        docSnapshot.forEach((doc) => {
            let data = doc.data();
            console.log("Check");
            if (typeof data.email === 'string' || data.email instanceof String) {
                console.log("Keep " + doc.id);
            } else {
                console.log("Remove " + doc.id);
                clearIDs.push(doc.id);
            }
          });
          
        for (let i = 0; i < clearIDs.length; i++) {
            const docRef = doc(firestore, "rfp_screening_forms", clearIDs[i]);
          
            await deleteDoc(docRef)
            .then(docRef => {
                console.log("Doc removed");
            })
            .catch(error => {
                console.log(error);
            })
        }
    }

}

var rfpDatabaseManager = new RFPDatabaseManager();

export {rfpDatabaseManager};
