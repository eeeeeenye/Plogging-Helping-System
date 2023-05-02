import React, { useState } from 'react'
import { TouchableOpacity, StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import BackButton from '../components/BackButton'
import { theme } from '../core/theme'
import { emailValidator } from '../helpers/emailValidator'
import { passwordValidator } from '../helpers/passwordValidator'
import axios from 'axios'

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState({ value: '', error: '' })
  const [password, setPassword] = useState({ value: '', error: '' })
  const [client, setClient] = useState(null);

  const onLoginPressed = () => {
    const emailError = emailValidator(email.value)
    const passwordError = passwordValidator(password.value)

    if (emailError || passwordError) {
      setEmail({ ...email, error: emailError })
      setPassword({ ...password, error: passwordError })
      return
    }

    axios.post('http://192.168.35.2:3000/api/login', {email: email.value, password: password.value})
    .then((response) => {
      // MySQL 서버에서 받은 데이터를 클라이언트에 저장
      const client = response.data;
      setClient(client);}
      )

    if(client.success !== true){
      setEmail({...email,error: client.message})
      setPassword({...password,error:client.message})
      return
    }

    console.log('[##] loggedIn', client.success)
    navigation.reset({
      index: 0,
      routes: [{ name: 'Dashboard' }],
      params: {                                   // 다른페이지로 사용자 이메일을 넘겨줌
        email: email
      }
    })
  }

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Logo />
      <Header>Welcome back.</Header>
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
        label="비밀번호"
        returnKeyType="done"
        value={password.value}
        onChangeText={(text) => setPassword({ value: text, error: '' })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />
      <View style={styles.forgotPassword}>
        <TouchableOpacity
          onPress={() => navigation.navigate('ResetPasswordScreen')}
        >
          <Text style={styles.forgot}>비밀번호를 잊어버리셨나요?</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.column}>
      <Button mode="contained" onPress={onLoginPressed}>
        로그인
      </Button>
        <Button mode="contained" onPress={() => navigation.replace('RegisterScreen')}>
          회원가입
        </Button>
        <Button mode="contained" onPress={() => navigation.replace('RegisterScreen')}>
          카카오톡
        </Button>
        <Button mode="contained" onPress={() => navigation.replace('RegisterScreen')}>
          구글
        </Button>
      </View>
    </Background>
  )
}

const styles = StyleSheet.create({
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  column:{
    flexDirection: 'column',
    width: '100%',
  },
  forgot: {
    fontSize: 13,
    color: theme.colors.secondary,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
})
