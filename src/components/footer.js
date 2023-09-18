import React, { useState } from 'react'

import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TouchableHighlight,
  SafeAreaView,
  Image,
} from 'react-native'

import styles from './componentStyle/footerStyle'

const Footer = ({ children }) => {
  return (
    <View style={styles.footer}>
      <View style={styles.footer_container}>
        <View style={styles.element}>
          <Image
            style={styles.image}
            source={require(`../assets/home.png`)}
          ></Image>
          <Text style={styles.footer_text}>홈</Text>
        </View>
        <View style={styles.element}>
          <Image
            style={styles.image}
            source={require(`../assets/shopping-store_3562674.png`)}
          ></Image>
          <Text style={styles.footer_text2}>스토어</Text>
        </View>
        <View style={styles.element}>
          <Image
            style={styles.image}
            source={require(`../assets/communities.png`)}
          ></Image>
          <Text style={styles.footer_text2}>게시판</Text>
        </View>
        <View style={styles.element}>
          <Image
            style={styles.image}
            source={require(`../assets/user.png`)}
          ></Image>
          <Text style={styles.footer_text2}>내 정보</Text>
        </View>
      </View>
    </View>
  )
}

export default Footer
