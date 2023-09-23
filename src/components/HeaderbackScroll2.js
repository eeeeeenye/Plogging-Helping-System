import React, { useState, useRef } from 'react'
import {
  View,
  Text,
  ScrollView,
  TouchableHighlight,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'

import styles from './componentStyle/headerbackScrollStyle2'
import Icon from 'react-native-vector-icons/FontAwesome'

const HeaderbackScroll2 = ({ children, title }) => {
  const navigation = useNavigation()

  const backButton = () => {
    navigation.goBack()
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.header_left}>
          <TouchableOpacity onPress={backButton}>
            <Image
              style={styles.image}
              source={require(`../assets/left-arrow.png`)}
            ></Image>
          </TouchableOpacity>
        </View>

        <View style={styles.header_center}>
          <Text style={styles.header_center_text}>{title}</Text>
        </View>

        <View style={styles.header_right}>
          <Image
            style={styles.image2}
            source={require('../assets/logo.png')}
          ></Image>
        </View>
      </View>

      <ScrollView>{children}</ScrollView>
    </View>
  )
}

export default HeaderbackScroll2
