import React from 'react'
import Background from '../../components/Background'
import Logo from '../../components/Logo'
import Header from '../../components/Header'
import Button from '../../components/Button'
import Paragraph from '../../components/Paragraph'
import { useSelector } from 'react-redux'
export default function StartScreen({ navigation }) {
  const State = useSelector((state) => state.auth.user)

console.log(State)
  return (
    <Background>
      <Header>Plog</Header>
      <Logo />
      <Paragraph>Step for the Environment!</Paragraph>
      <Button
        mode="contained"
        onPress={() => navigation.navigate('LoginScreen')}
      >
        로그인
      </Button>
      <Button
        mode="outlined"
        onPress={() => navigation.navigate('RegisterScreen')}
      >
        회원가입
      </Button>
      <Button mode="contained" onPress={() => navigation.navigate('MyPage')}>
        임시 로그인 버튼
      </Button>
    </Background>
  )
}
