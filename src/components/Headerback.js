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

import styles from './componentStyle/headerBackScrollStyle'
import Icon from 'react-native-vector-icons/FontAwesome'

const HeaderBack = ({ children, title }) => {
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
            // style={styles.settingButton}
            onPress={() => alert('Pressed!')}
            activeOpacity={0.6}
            underlayColor={'white'}
          >
            <Icon
              name={'gear'}
              size={25}
              color="black"
              style={styles.settingButton}
            />
          </TouchableHighlight>
        </View>
      </View>

      {/* <ScrollView>{children}</ScrollView> */}
    </View>
  )
}

export default HeaderBack
