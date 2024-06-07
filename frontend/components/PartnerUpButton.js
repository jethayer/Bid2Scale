import React from 'react'
import { TouchableOpacity, Image, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'

export default function PartnerUpButton() {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={() => navigation.navigate('PartnerUpScreen')} style={styles.container}>
      <Image
        style={styles.image}
        source={require('../assets/partnerUp.jpg')}
      />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  image: {
    width: 48,
    height: 48,
  },
})