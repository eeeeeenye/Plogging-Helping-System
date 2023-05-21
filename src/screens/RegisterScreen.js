import React, { useState,useEffect } from 'react'
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
import { passwordConfirmer } from '../helpers/passwordConfirm'
import image from '../assets/logo.png'
import axios from 'axios'
import Constants from 'expo-constants';
import clientManager from '../helpers/localStorage'


// phone 설정, id 자동 설정 해야함, phone validation 코드작성

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState({ value: '', error: '' })
  const [email, setEmail] = useState({ value: '', error: '' })
  const [password, setPassword] = useState({ value: '', error: '' })
  const [passwordConfirm, setPasswordCF] = useState({ value: '', error: '' })
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(false);
  const [phone, setPhone] = useState({ value: '', error: '' })
  const ip = Constants.manifest.extra.Local_ip;
  const [check,clientCheck] = useState(false)

  //console.log(ip)
  const [client, setClient] = useState({
    Client_name : '',
    Client_pwd : '',
    Client_email : '',
    Client_phone : ''
  })

  const [clientDB, getClient] = useState({
    Client_name: '',
    Client_email:'',
    dupCheck: false
  })

  useEffect(() => {
    setClient(prevClient => ({
      ...prevClient,
      Client_name: name.value,
      Client_pwd: password.value,
      Client_email: email.value,
      Client_phone: phone.value
    }));
  }, [name.value, password.value, email.value, phone.value]);

  useEffect(() => {
    if(check === true){                   // dup, valid check
      console.log(clientDB.Client_name === client.Client_name)
      if(clientDB.Client_name === client.Client_name){
        setName({ ...name, error: "already exist!!" })
        return
      }else if(clientDB.Client_email === client.Client_email){
        setEmail({ ...email, error: "already exist!!" })
      }else if(check === true && clientDB.dupCheck === true){
        addClient()

        navigation.reset({
        index: 0,
        routes: [{ name: 'Location' }],
      })
      }
    }
    console.log(clientDB.Client_name === client.Client_name,'useeffect')
  }, [clientDB]);

  const addClient = async()=>{             // 사용자 DB 구축
    await axios.post(`http://${ip}:3000/create`,client)
    .then(res => {
      console.log(res.data);
    })
    .catch(error => console.log(error));

    await axios.post(`http://${ip}:3000/api/login`,clientDB)
    .then((response) => {
        // MySQL 서버에서 받은 데이터를 클라이언트에 저장
        const ClientData = response.data;
        clientManager.storeData('user',ClientData)
    })
    
  };

  const pullClient =  async() =>{            // 사용자 DB 조회
    await axios.post(`http://${ip}:3000/plogging/client`,{Client_email:client.Client_email,Client_name:client.Client_name})
    .then(res => {
      console.log(res.data,"kkkkkkkkkkkkk")
      if(res.data.length !== 0){
        if(res.data[0].EMAIL === email.value){
          getClient((prevState)=>{
            return{
              ...prevState,
              Client_email: res.data[0].EMAIL
            }
          })
        }

         if(res.data[0].CNAME === name.value){
              getClient((prevState)=>{
                return{
                  ...prevState,
                  Client_name: res.data[0].CNAME
                }
              }) 
        }}else{
          getClient((prevState)=>{
            return{
              ...prevState,
              dupCheck: true
            }
          })
        }
    }
      )
    .catch((error)=>{
      console.log(error);
    })
  }

  const onSignUpPressed = () => {
    const nameError = nameValidator(name.value)
    const emailError = emailValidator(email.value)
    const passwordError = passwordValidator(password.value)
    const passwordCFError = passwordConfirmer(passwordConfirm.value,password.value)

    pullClient()
    
    if (emailError || passwordError || nameError || passwordCFError) {              // TextInput이 비어있거나 정해진 글자수를 초과했을 때 오류
      setName({ ...name, error: nameError })
      setEmail({ ...email, error: emailError })
      setPassword({ ...password, error: passwordError })
      setPasswordCF({...passwordConfirm,error: passwordCFError})
      return
    }else{
      clientCheck(true)
      return
    }
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
        value={passwordConfirm.value}
        onChangeText={(text) => setPasswordCF({ value: text, error: '' })}
        error={!!passwordConfirm.error}
        errorText={passwordConfirm.error}
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
        value={phone.value}
        onChangeText={(text) => setPhone({ value: text, error: '' })}
        error={!!phone.error}
        errorText={phone.error}
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
