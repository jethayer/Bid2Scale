import React from "react";
import Logo from "../components/Logo";
import SplashBackground from "../components/SplashBackground";

//SplashScreen to be shown when starting the app
export default function SplashScreen({ navigation }) {
	//useEffect is basically run AFTER the component is done rendering,
	//In this case, it will change the screen to HomeScreen after 2 seconds
	// useEffect(() => {
	// 	setTimeout(() => {
	// 		navigation.navigate("HomeScreen");
	// 	}, 2000);
	// });
	//Next it will return the specific SplashBackground with the logo.
	return (
		<SplashBackground>
			<Logo />
		</SplashBackground>
	);
}
