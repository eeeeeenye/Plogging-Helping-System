import React from 'react'
import { toggleImageClick } from '../../slices/All/footerSlice'
import { useDispatch, useSelector } from 'react-redux'

import Background from '../../components/Background'
import Logo from '../../components/Logo'
import Header from '../../components/Header'
import Button from '../../components/Button'
import Paragraph from '../../components/Paragraph'
import Background2 from '../../components/Background2'
import { useEffect } from 'react'
import axios from 'axios'
export default function StartScreen({ navigation }) {
  const dispatch = useDispatch()

  return (
    <Background2>
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
      <Button
        mode="contained"
        onPress={() => {
          dispatch(toggleImageClick({ id: 4, clicked: true }))
          navigation.navigate('MyPage')
        }}
      >
        임시 로그인 버튼
      </Button>
      <Button
        mode="contained"
        onPress={() => {
          navigation.navigate('ResetPassword')
        }}
      >
        비밀번호 찾기
      </Button>
      <Button
        mode="contained"
        onPress={() => {
          navigation.navigate('EditPassword')
        }}
      >
        비밀번호 변경
      </Button>
      <Button
        mode="contained"
        onPress={() => {
          navigation.navigate('ResidenceSetting')
        }}
      >
        거주지 설정
      </Button>
    </Background2>
  )
}
