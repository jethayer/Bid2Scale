import React from "react";
import { TouchableNativeFeedback, Image, Vibration, StyleSheet } from "react-native";
import informationIcon from '../assets/information.png'


export default function InformationIcon(props) {
    return (
        <TouchableNativeFeedback
            onPress={props.onPress}
            onLongPress={() => {
                console.log("Long Press")
                Vibration.vibrate(50)
            }}
        >
            <Image
                style={styles.infoIcon}
                source={informationIcon}
            />
        </TouchableNativeFeedback>
    )
}

const styles =  StyleSheet.create({
    infoIcon: {
		marginLeft: 5,
        alignSelf: "center",
		maxWidth: 50,
		maxHeight: 60,
	}
})