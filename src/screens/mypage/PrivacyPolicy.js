import React, { useState } from 'react'

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Button,
} from 'react-native'
import Headerback2 from '../../components/Headerback2'
import styles from './mypageStyle/PrivacyPolicyStyle'

const PrivacyPolicy = () => {
  return (
    <View style={styles.container}>
      <Headerback2 title={'개인정보 처리방침'}></Headerback2>
      <View style={styles.content}>
        <View>
          <Text style={styles.text}>Plog 개인정보처리방침</Text>
        </View>
        <ScrollView style={styles.scroll}>
          <Text style={styles.textBox}>
            dsafsfsdfdsafsfsdfdsafsfsdf dsafsfsdfdsafsfsdfdsafsfsdfdsafsfs
            dfdsafsfsdfdsafsfsdfdsafsfsdfdsafsfs
            dfdsafsfsdfdsafsfsdfdsafsfsdfdsafsfsdfdsaf
            sfsdfdsafsfsdfdsafsfsdfdsafsfsdfdsafsfsdfdsafsfsdfdsafsfsdfdsafsfsdfdsafsfsdfdsafsfsdfdsafsfsdfdsafsfsdfdsafsfsdfdsafsfsdfdsafsfsdfdsafsfsdfdsafsfsdfdsafsfsdfdsafsfsdfdsafsfsdfdsafsfsdf
          </Text>
        </ScrollView>
      </View>
    </View>
  )
}

export default PrivacyPolicy
