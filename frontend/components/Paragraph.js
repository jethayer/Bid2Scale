import React from 'react'
import { StyleSheet } from 'react-native'
import { Text } from 'react-native-paper'

export default function Paragraph(props) {
  return <Text style={styles.text} {...props} />
}

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 12,
  },
})
