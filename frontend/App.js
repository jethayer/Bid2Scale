import "react-native-gesture-handler";
import React from "react";
import { Provider } from "react-native-paper";
import { Dimensions, View, Image, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { theme } from "./core/theme";
import { AuthContext } from "./helpers/context";
import SplashScreen from "./screens/SplashScreen";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import RFPApplyScreen from "./screens/RFPApplyScreen";
import UserHome from "./screens/UserHome";
import RFPDisplay from "./screens/RFPDisplay";
import RFPPosterDisplay from './screens/RFPPosterDisplay';
import RFPScreeningFormDetails from './screens/RFPScreeningFormDetails';
import RFPPartnerFormDetails from './screens/RFPPartnerFormDetails';
import RFPExpressInterestFormDetails from './screens/RFPExpressInterestFormDetails';
import UserSearchingScreen from "./screens/UserSearchingScreen";
import GuestScreen from "./screens/GuestScreen";
import SignUpScreen from "./screens/SignUpScreen";
import CategoryDisplay from "./screens/CategoryDisplay";
import UserProfileScreen from "./screens/UserProfileScreen";
import ExpressInterest from "./screens/ExpressInterest";
import PartnerUpScreen from "./screens/PartnerUpScreen";
import AddRFPScreen from "./screens/AddRFPScreen";
import MyRFPScreen from "./screens/MyRFPScreen";
import BidHistory from "./screens/BidHistory";
import CurrentBids from "./screens/CurrentBids";
import RFPOptions from './screens/RFPOptions'
import UserSignOut from "./helpers/signOut";
import uuid from "react-native-uuid";
import { auth } from "./Firebase";
import { userProfileManager } from "./helpers/userProfileManager";
import { LogBox } from "react-native";

LogBox.ignoreAllLogs();
const Stack = createNativeStackNavigator();
const HomeStack = createNativeStackNavigator();
const BidStack = createNativeStackNavigator();
const ProfileStack = createNativeStackNavigator();
const CategoryStack = createNativeStackNavigator();

const Tabs = createBottomTabNavigator();

export const screenWidth = Dimensions.get("screen").width;
export const screenHeight = Dimensions.get("screen").height;

auth.onAuthStateChanged((user) => {
	if (user) {
		getUID(user);
	}
});

async function getUID(user) {
	var UID = await user.getIdToken();
	userProfileManager.setUID(UID);
}

const HomeStackScreen = () => (
	<HomeStack.Navigator
		screenOptions={{
			headerShown: false,
		}}
	>
		<HomeStack.Screen name="User Home" component={UserHome} />
		<HomeStack.Screen name="UserSearchingScreen" component={UserSearchingScreen} />
		<HomeStack.Screen name="RFPDisplay" component={RFPDisplay} />

    <Stack.Screen name="RFPPosterDisplay" component={RFPPosterDisplay} />
    <Stack.Screen name="RFPScreeningFormDetails" component={RFPScreeningFormDetails} />
    <Stack.Screen name="RFPPartnerFormDetails" component={RFPPartnerFormDetails} />
    <Stack.Screen name="RFPExpressInterestFormDetails" component={RFPExpressInterestFormDetails} />
    
		<HomeStack.Screen name="ExpressInterest" component={ExpressInterest} />
		<HomeStack.Screen name="PartnerUpScreen" component={PartnerUpScreen} />
		<HomeStack.Screen name="CurrentBids" component={CurrentBids} />
		<HomeStack.Screen name="BidHistory" component={BidHistory} />
		<HomeStack.Screen name="RFPApplyScreen" component={RFPApplyScreen} />
    <ProfileStack.Screen name="Profile" component={UserProfileScreen} />
    <HomeStack.Screen name="RFPOptions" component={RFPOptions} />
    <HomeStack.Screen name="Add RFP" component={AddRFPScreen} />
    <HomeStack.Screen name="MyRFPs" component={MyRFPScreen} />
	</HomeStack.Navigator>
);

const BidStackScreen = () => (
	<BidStack.Navigator
		screenOptions={{
			headerShown: false,
		}}
	>
		<BidStack.Screen name="User Home" component={UserHome} />
		<BidStack.Screen name="UserSearchingScreen" component={UserSearchingScreen} />
		<BidStack.Screen name="RFPDisplay" component={RFPDisplay} />

    <Stack.Screen name="RFPPosterDisplay" component={RFPPosterDisplay} />
    <Stack.Screen name="RFPScreeningFormDetails" component={RFPScreeningFormDetails} />
    <Stack.Screen name="RFPPartnerFormDetails" component={RFPPartnerFormDetails} />
    <Stack.Screen name="RFPExpressInterestFormDetails" component={RFPExpressInterestFormDetails} />

		<BidStack.Screen name="ExpressInterest" component={ExpressInterest} />
		<BidStack.Screen name="PartnerUpScreen" component={PartnerUpScreen} />
	</BidStack.Navigator>
);

const CategoryDisplayStack = () => (
	<CategoryStack.Navigator
		screenOptions={{
			headerShown: false,
		}}
	>
    <CategoryStack.Screen name="RFPOptions" component={RFPOptions} />
		<CategoryStack.Screen name="CategoryDisplay" component={CategoryDisplay} />
    <CategoryStack.Screen name="Add RFP" component={AddRFPScreen} />
    <CategoryStack.Screen name="MyRFPs" component={MyRFPScreen} />
		<CategoryStack.Screen name="GuestScreen" component={GuestScreen} />
	</CategoryStack.Navigator>
);

const ProfileStackScreen = () => (
	<ProfileStack.Navigator
		screenOptions={{
			headerShown: false,
		}}
	>
		<ProfileStack.Screen name="Profile" component={UserProfileScreen} />
	</ProfileStack.Navigator>
);

const TabNavigator = () => (
  <Tabs.Navigator
  screenOptions={{
    headerShown: false,
	tabBarShowLabel: false
  }}>
	
  <Tabs.Screen name="Home" component={HomeStackScreen} options={{
	tabBarIcon: ({focused}) => (
		<View style={{alignItems: 'center', justifyContent: 'center'}}>
			<Image
				source={require('./assets/icons/homeImg.png')}
				resizeMode='contain'
				style={{
					width: 25,
					height: 25,
					tintColor: focused? '#205493' : 'black'
				}}
			/>
			<Text
				style={{color: focused? '#205493' : 'black', fontSize: 12}}>
					Home
			</Text>
		</View>
	),
  }}/>
  <Tabs.Screen name="RFPs" component={CategoryDisplayStack} options={{
	tabBarIcon: ({focused}) => (
		<View style={{alignItems: 'center', justifyContent: 'center'}}>
			<Image
				source={require('./assets/icons/rfpImg.png')}
				resizeMode='contain'
				style={{
					width: 25,
					height: 25,
					tintColor: focused? '#205493' : 'black'
				}}
			/>
			<Text
				style={{color: focused? '#205493' : 'black', fontSize: 12}}>
					RFPs
			</Text>
		</View>
	),
  }}/>
  <Tabs.Screen name="Profile" component={ProfileStackScreen} options={{
	tabBarIcon: ({focused}) => (
		<View style={{alignItems: 'center', justifyContent: 'center'}}>
			<Image
				source={require('./assets/icons/profileImg.png')}
				resizeMode='contain'
				style={{
					width: 25,
					height: 25,
					tintColor: focused? '#205493' : 'black'
				}}
			/>
			<Text
				style={{color: focused? '#205493' : 'black', fontSize: 12}}>
					Profile
			</Text>
		</View>
	),
  }}/>
</Tabs.Navigator>
)

const Drawer = createDrawerNavigator();

export default function App() {
	const [isLoading, setIsLoading] = React.useState(true);

	const [userToken, setUserToken] = React.useState(null);

	const authContext = React.useMemo(() => {
		return {
			login: () => {
				setIsLoading(false);
				setUserToken(userProfileManager.getUID());
				userProfileManager.setAuthenticated(true);
			},
			signUp: () => {
				setIsLoading(false);
				setUserToken(userProfileManager.getUID());
				userProfileManager.setAuthenticated(true);
			},
			logOut: () => {
				setIsLoading(false);
				setUserToken(null);
				userProfileManager.setAuthenticated(false);
			},
			guestLogin: () => {
				setIsLoading(false);
				setUserToken(uuid.v4);
				userProfileManager.setAuthenticated(false);
			}
		};
	}, []);

	React.useEffect(() => {
		setTimeout(() => {
			setIsLoading(false);
		}, 2000);
	}, []);

	if (isLoading) {
		return <SplashScreen />;
	}

  return (
    <Provider theme={theme}>
      <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {userToken ? (
          <Drawer.Navigator>
            <Drawer.Screen name="Home" component={TabNavigator} />
            <Drawer.Screen name="Add RFP" component={AddRFPScreen} />
            <Drawer.Screen name="Log Out" component={UserSignOut} />
          </Drawer.Navigator>
        ) : (
          <Stack.Navigator
            initialRouteName="HomeScreen"
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="SplashScreen" component={SplashScreen} />
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
          </Stack.Navigator>
        )}
      </NavigationContainer>
      </AuthContext.Provider>
    </Provider>
  )
}
