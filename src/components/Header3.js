import React, { useState, useRef } from 'react'
import {
  View,
  Text,
  ScrollView,
  TouchableHighlight,
  SafeAreaView,
  FlatList,
  Image,
} from 'react-native'
import styles from './componentStyle/HeaderStyle3.js'
import Icon from 'react-native-vector-icons/FontAwesome'
import Footer from './footer.js'

const Header3 = ({ children, title }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.title}>{title}</Text>
          <Image
            style={styles.image}
            source={require('../assets/logo.png')}
          ></Image>
        </View>
        <View style={styles.headerRight}>
          <TouchableHighlight
            style={styles.settingButton}
            activeOpacity={0.6}
            underlayColor={'white'}
          >
            <Image
              style={styles.image2}
              source={require('../assets/menu 1.png')}
            ></Image>
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.settingButton}
            onPress={() => alert('Pressed!')}
            activeOpacity={0.6}
            underlayColor={'white'}
          >
            <Image
              style={styles.image2}
              source={require('../assets/bell 1.png')}
            ></Image>
          </TouchableHighlight>

          <TouchableHighlight
            style={styles.settingButton}
            onPress={() => alert('Pressed!')}
            activeOpacity={0.6}
            underlayColor={'white'}
          >
            <Image
              style={styles.image2}
              source={require('../assets/search-interface-symbol 1.png')}
            ></Image>
          </TouchableHighlight>

          {/* style={styles.profileHeader_text_right}> */}
        </View>
      </View>
    </View>
  )
}

export default Header3
