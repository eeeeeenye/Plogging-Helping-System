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

import styles from './componentStyle/headerBackScrollStyle3'
import Icon from 'react-native-vector-icons/FontAwesome'

const HeaderBackScroll3 = ({ children, title, image }) => {
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
          <TouchableHighlight
            style={styles.setting_button}
            onPress={() => alert('Pressed!')}
            activeOpacity={0.6}
            underlayColor={'white'}
          >
            <Image
              style={styles.setting}
              source={require(`../assets/share.png`)}
            ></Image>
          </TouchableHighlight>
        </View>
      </View>

      <ScrollView>{children}</ScrollView>
    </View>
  )
}

export default HeaderBackScroll3
