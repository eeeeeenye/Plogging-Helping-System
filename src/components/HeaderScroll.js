import React, { useState, useRef } from 'react'
import {
  View,
  Text,
  ScrollView,
  TouchableHighlight,
  SafeAreaView,
  FlatList,
} from 'react-native'
import styles from './componentStyle/headerScrollStyle.js'
import Icon from 'react-native-vector-icons/FontAwesome'
import Footer from './footer.js'

const HeaderScroll = ({ children, title }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.header_center}>
          <Text style={styles.header_center_text}>{title}</Text>
        </View>
        <View style={styles.header_right}>
          <TouchableHighlight
            style={styles.settingButton}
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

          {/* style={styles.profileHeader_text_right}> */}
        </View>
      </View>

      <ScrollView>{children}</ScrollView>
    </View>
  )
}

export default HeaderScroll
