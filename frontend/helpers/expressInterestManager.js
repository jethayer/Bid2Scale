import { firestore } from "../Firebase";
import { doc, getDoc, setDoc } from "firebase/firestore"

class ExpressInterestManager {
    comapny;
    firstName;
    lastName;
    email;
    authenticated;
    constructor(){
        this.company = 'testCompany';
        this.firstName = '[]';
        this.lastName = '[]';
        this.email = '[]';
        this.authenticated = false;
    }

    authenticate (comp, pass) {
        this.company = comp;
        // TODO: add functionality to check real password against username
        if (pass === 'password') {
            this.authenticated = true;
            return true;
        } else {
            this.authenticated = false;
            return false;
        }
    }

    isAuthenticated () {
        return this.authenticated;
    }

    getCompany () { 
        if (this.authenticated !== true) {
            console.log("Must be Authenticated to get Company.");
            return "[Not Authenticated]";
        }
        return this.company; 
    }
    getFirstName () { 
        if (this.authenticated !== true) {
            console.log("Must be Authenticated to get First Name.");
            return "[Not Authenticated]";
        }
        return this.firstName; 
    }
    getLastName () { 
        if (this.authenticated !== true) {
            console.log("Must be Authenticated to get Last Name.");
            return "[Not Authenticated]";
        }
        return this.lastName; 
    }
    getEmail () { 
        if (this.authenticated !== true) {
            console.log("Must be Authenticated to get Email.");
            return "[Not Authenticated]";
        }
        return this.email; 
    }

    setCompany (v) { 
        if (this.authenticated !== true) {
            console.log("Company not authenticated yet.");
            return false;
        }
        this.company = v; 
        return true;
    }
    setFirstName (v) { 
        if (this.authenticated !== true) {
            console.log("User not authenticated yet.");
            return false;
        }
        this.firstName = v; 
        return true;
    }
    setLastName (v) { 
        if (this.authenticated !== true) {
            console.log("User not authenticated yet.");
            return false;
        }
        this.lastName = v; 
        return true;
    }
    setEmail (v) { 
        if (this.authenticated !== true) {
            console.log("User not authenticated yet.");
            return false;
        } 
        this.email = v; 
        return true;
    }

    async loadUserData() {
        if (this.authenticated !== true) {
            console.log("User not authenticated yet.");
            return false;
        } 
        let document = doc(firestore, "users", this.userName);
        const docSnapshot = await getDoc(document); 
        this.company = docSnapshot.get("company");
        this.firstName = docSnapshot.get("fName");
        this.lastName = docSnapshot.get("lName");
        this.email = docSnapshot.get("emailAddr");
        return true;
    }

    async saveUserData() {
        if (this.authenticated !== true) {
            console.log("User not authenticated yet.");
            return false;
        } 
        await setDoc(doc(firestore, "users", this.company), {
            company: this.company,
            fName: this.firstName,
            lName: this.lastName,
            emailAddr: this.email
        });
        return true;
    }
}

var expressInterestManager = new ExpressInterestManager();

export {expressInterestManager};
