import React, { useState } from 'react'
import { View, StyleSheet, TouchableOpacity, ScrollView,Image } from 'react-native'
import { Text,Checkbox } from 'react-native-paper'
import Background from '../components/Background'
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import BackButton from '../components/BackButton'
import { theme } from '../core/theme'
import { emailValidator } from '../helpers/emailValidator'
import { passwordValidator } from '../helpers/passwordValidator'
import { nameValidator } from '../helpers/nameValidator'
import image from '../assets/logo.png'

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState({ value: '', error: '' })
  const [email, setEmail] = useState({ value: '', error: '' })
  const [password, setPassword] = useState({ value: '', error: '' })
  const [passwordValid, setPasswordVD] = useState({ value: '', error: '' })
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(false);

  const onSignUpPressed = () => {
    const nameError = nameValidator(name.value)
    const emailError = emailValidator(email.value)
    const passwordError = passwordValidator(password.value)
    if (emailError || passwordError || nameError) {
      setName({ ...name, error: nameError })
      setEmail({ ...email, error: emailError })
      setPassword({ ...password, error: passwordError })
      return
    }
    navigation.reset({
      index: 0,
      routes: [{ name: 'Dashboard' }],
    })
  }

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Image source={image} style={{width:100,height:100, marginTop:60, marginBottom:10}}/>
      <ScrollView style={{width:'100%'}}>
      <TextInput
        label="이름"
        returnKeyType="next"
        value={name.value}
        onChangeText={(text) => setName({ value: text, error: '' })}
        error={!!name.error}
        errorText={name.error}
      />

      <TextInput
        label="비밀번호"
        returnKeyType="done"
        value={password.value}
        onChangeText={(text) => setPassword({ value: text, error: '' })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />

      <TextInput
        label="비밀번호 확인"
        returnKeyType="done"
        value={passwordValid.value}
        onChangeText={(text) => setPasswordVD({ value: text, error: '' })}
        error={!!passwordValid.error}
        errorText={passwordValid.error}
        secureTextEntry
      />

      <TextInput
        label="이메일"
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
        label="전화번호"
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

      <Checkbox.Item 
      label="이용약관동의" 
      status={checked1 ? 'checked' : 'unchecked'}
      onPress={() => {
        setChecked1(!checked1);
      }} />

      <Checkbox.Item 
      label="개인정보 수집 및 이용 동의" 
      status={checked2 ? 'checked' : 'unchecked'}
      onPress={() => {
        setChecked2(!checked2);
      }} />
      
      <Button
        mode="contained"
        onPress={onSignUpPressed}
        style={{ marginTop: 24 }}
      >
        회원가입
      </Button>
      <View style={styles.row}>
        <Text>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.replace('LoginScreen')}>
          <Text style={styles.link}>Login</Text>
        </TouchableOpacity>
      </View>
      </ScrollView>
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
