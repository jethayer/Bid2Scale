// Import the functions you need from the SDKs you need

import { initializeApp } from "@firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "@firebase/database";
import { getAuth } from "@firebase/auth";
import { getReactNativePersistence, initializeAuth} from 'firebase/auth/react-native'
import AsyncStorage from "@react-native-async-storage/async-storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyDAbsQFo7tIKRi7xiTwOAkpusI1Hqkr2ng",
	authDomain: "bid2scale-b8b73.firebaseapp.com",
	projectId: "bid2scale-b8b73",
	storageBucket: "bid2scale-b8b73.appspot.com",
	messagingSenderId: "762037997450",
	appId: "1:762037997450:web:e4562ddf9fe060ef7b0273",
	measurementId: "G-5PY0CNC4Y4",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const firestore = getFirestore(app)
const db = getDatabase(app);
export const auth = initializeAuth(app, {
	persistence: getReactNativePersistence(AsyncStorage)
});
export const actionCodeSettings = {
	url: "http://localhost:19006/",
	handleCodeInApp: true,
  android: {
    packageName: 'com.bid2scale',
    installApp: true,
    minimumVersion: '12'
  },
  dynamicLinkDomain: 'example.page.link'
};
