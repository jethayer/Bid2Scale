import { TouchableOpacity, View } from "react-native";
import { parseFile } from "../helpers/fileReader";
import React from "react"
import { Text, StyleSheet } from "react-native";
import * as DocPicker from 'expo-document-picker'
import * as FileSystem from 'expo-file-system'

async function pickFile() {
    DocPicker.getDocumentAsync({
        type:["application/xml", "text/plain", "text/xml"],
        copyToCacheDirectory: true,
        multiple: false})
        .then((file) => {
            if(file.type === "cancel") {
                console.log("Canceled File")
            } else {
                
                FileSystem.readAsStringAsync(file.uri)
                    .then((content) => {
                        let rfp = parseFile(content)

                        if (rfp === null) {
                            console.log("Invalid Format (not xml)")
                        } else {
                            console.log(rfp)
                        }
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            }
        })
        .catch((err) => {
            console.log(err)
        })
}

export default function FileReaderButton() {
    return (
        <View>
            <TouchableOpacity
                onPress={pickFile}
                style={styles.button}
            >
            <Text>Upload File...</Text>
            </TouchableOpacity>
        </View>
    )
}

    const styles = StyleSheet.create({
        button: {
            width: "100%",
        },

        text: {
            textAlign:"center",
        }
    })