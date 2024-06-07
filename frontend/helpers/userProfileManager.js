import { firestore } from "../Firebase";
import { auth } from "../Firebase";
import { collection, doc, getDocs, query, where, addDoc } from "firebase/firestore";

class UserProfileManager {
	company;
	userName;
	firstName;
	lastName;
	email;
	authenticated;
	constructor() {
		this.userName = "";
		this.firstName = "";
		this.lastName = "";
		this.email = "";
		this.UID = "";

		this.authenticated = false;
	}

	authenticate() {
		//No need to check password and user when Firebase does that for us.
		let user = auth.currentUser;

		if (user) {
			this.authenticated = true;
		} else {
			this.authenticated = false;
		}

		return this.authenticated;
	}

	isAuthenticated() {
		return this.authenticate();
	}

	setAuthenticated(boolean) {
		this.authenticated = boolean;
	}

	getCompany() {
		if (!this.isAuthenticated()) {
			console.log("Must be Authenticated to get Company.");
			return "[Not Authenticated]";
		}
		return this.company;
	}
	getFirstName() {
		if (!this.isAuthenticated()) {
			console.log("Must be Authenticated to get First Name.");
			return "[Not Authenticated]";
		}
		return this.firstName;
	}
	getLastName() {
		if (!this.isAuthenticated()) {
			console.log("Must be Authenticated to get Last Name.");
			return "[Not Authenticated]";
		}
		return this.lastName;
	}
	getEmail() {
		if (!this.isAuthenticated()) {
			console.log("Must be Authenticated to get Email.");
			return "[Not Authenticated]";
		}
		return this.email;
	}
	getUID() {
		return this.UID;
	}

	setCompany(v) {
		if (!this.isAuthenticated()) {
			console.log("Company not authenticated yet.");
			return false;
		}
		this.company = v;
		return true;
	}
    setUserName (v) { 
        if (this.authenticated !== true) {
            console.log("User not authenticated yet.");
            return false;
        }
        this.userName = v; 
        return true;
    }
	setFirstName(v) {
		if (!this.isAuthenticated()) {
			console.log("User not authenticated yet.");
			return false;
		}
		this.firstName = v;
		return true;
	}
	setLastName(v) {
		if (!this.isAuthenticated()) {
			console.log("User not authenticated yet.");
			return false;
		}
		this.lastName = v;
		return true;
	}
	setEmail(v) {
		if (!this.isAuthenticated()) {
			console.log("User not authenticated yet.");
			return false;
		}
		this.email = v;
		return true;
	}

	setUID(UID) {
		this.UID = UID;
	}

	async loadUserData(email) {
		if (!this.isAuthenticated()) {
			console.log("User not authenticated yet.");
			return Promise.reject();
		}
		let q = query(collection(firestore, "users"), where("email", "==", email));
		getDocs(q)
			.then((data) => {
				data.forEach((meta) => {
					var user = meta.data();
					this.firstName = user.fName;
					this.lastName = user.lName;
					this.email = user.email;
					this.company = user.company;
				});
			})
			.catch((err) => {
				console.log(err);
			});
		console.log("User Info: " + this.firstName + " " + this.lastName + "\n" + this.company + " - " + this.email);
	}

	async saveUserData(first, last, email, company) {
		await addDoc(collection(firestore, "users"), {
			fName: first,
			lName: last,
			email: email,
			company: company,
		});
		this.firstName = first;
		this.lastName = last;
		this.email = email;
		this.company = company;
		return true;
	}
}

var userProfileManager = new UserProfileManager();

export { userProfileManager };
