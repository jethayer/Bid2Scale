import React, { useState } from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { Text } from 'react-native-paper'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import { theme } from '../core/theme'
import { emailValidator } from '../helpers/emailValidator'
import { passwordValidator } from '../helpers/passwordValidator'
import { firstNameValidator } from '../helpers/firstNameValidator'
import { lastNameValidator } from '../helpers/lastNameValidator'
import { companyNameValidator } from '../helpers/companyNameValidator'
import { businessNumberValidator } from '../helpers/businessNumberValidator'
import { provinceValidator } from '../helpers/provinceValidator'

// Function to return Screen Definition
export default function RegisterScreen({ navigation }) {
  const [firstName, setfirstName] = useState({ value: '', error: '' })
  const [lastName, setlastName] = useState({ value: '', error: '' })
  const [email, setEmail] = useState({ value: '', error: '' })
  const [password, setPassword] = useState({ value: '', error: '' })
  const [companyName, setcompanyName] = useState({ value: '', error: '' })
  const [businessNumber, setbusinessNumber] = useState({ value: '', error: '' })
  const [province, setprovince] = useState({ value: '', error: '' })

  const onSignUpPressed = () => {
    const firstNameError = firstNameValidator(firstName.value)
    const lastNameError = lastNameValidator(lastName.value)
    const emailError = emailValidator(email.value)
    const passwordError = passwordValidator(password.value)
    const companyNameError = companyNameValidator(companyName.value)
    const provinceError = provinceValidator(province.value)
    const businessNumberError = businessNumberValidator(businessNumber.value)
    if (emailError || passwordError || firstNameError || lastNameError || companyNameError || businessNumberError || provinceError) {
      setfirstName({ ...firstName, error: firstNameError })
      setlastName({ ...lastName, error: lastNameError })
      setEmail({ ...email, error: emailError })
      setPassword({ ...password, error: passwordError })
      setcompanyName({ ...companyName, error: companyNameError })
      setbusinessNumber({ ...businessNumber, error: businessNumberError })
      setprovince({ ...province, error: provinceError })
      return
    }
    navigation.reset({
      index: 0,
      routes: [{ name: 'HomeScreen' }],
    })
  }

  return (
    <Background>
      <Logo />
      <Header>Create Account</Header>
      <TextInput
        label="First Name"
        returnKeyType="next"
        value={firstName.value}
        onChangeText={(text) => setfirstName({ value: text, error: '' })}
        error={!!firstName.error}
        errorText={firstName.error}
        textContentType="name"
      />
      <TextInput
        label="Last Name"
        returnKeyType="next"
        value={lastName.value}
        onChangeText={(text) => setlastName({ value: text, error: '' })}
        error={!!lastName.error}
        errorText={lastName.error}
        textContentType="name"
      />
      <TextInput
        label="Email"
        returnKeyType="next"
        value={email.value}
        onChangeText={(text) => setEmail({ value: text, error: '' })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />
      <TextInput
        label="Company Name"
        returnKeyType="next"
        value={companyName.value}
        onChangeText={(text) => setcompanyName({ value: text, error: '' })}
        error={!!companyName.error}
        errorText={companyName.error}
        textContentType="organizationName"
      />
        <TextInput
        label="Password"
        returnKeyType="next"
        value={password.value}
        onChangeText={(text) => setPassword({ value: text, error: '' })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />
      <TextInput
        label="Province"
        returnKeyType="next"
        value={province.value}
        onChangeText={(text) => setprovince({ value: text, error: '' })}
        error={!!province.error}
        errorText={province.error}
        textContentType="location"
      />
      <TextInput
        label="Business Reference Number"
        returnKeyType="done"
        value={businessNumber.value}
        onChangeText={(number) => setbusinessReferenceNumber({ value: number, error: '' })}
        error={!!businessNumber.error}
        errorText={businessNumber.error}
      />
    
      <Button
        mode="contained"
        onPress={onSignUpPressed}
        style={{ marginTop: 24 }}
      >
        Sign Up
      </Button>
      <View style={styles.row}>
        <Text>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.replace('LoginScreen')}>
          <Text style={styles.link}>Login</Text>
        </TouchableOpacity>
      </View>
    </Background>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
})