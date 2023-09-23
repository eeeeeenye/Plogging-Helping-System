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
import HeaderBack from '../../components/Headerback'
import Header2 from '../../components/Header2'
import styles from './mypageStyle/TermsAndConditionStyle'
import Headerback2 from '../../components/Headerback2'

const TermsAndConditions = () => {
  return (
    <View style={styles.container}>
      <Headerback2 title={'이용약관'}></Headerback2>
      <View style={styles.content}>
        <View>
          <Text style={styles.text}>Plog 이용약관</Text>
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

export default TermsAndConditions
