import React, { useState, useRef, useEffect } from 'react'
import {
  View,
  Text,
  ScrollView,
  TouchableHighlight,
  SafeAreaView,
  FlatList,
  Image,
} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import styles from './componentStyle/HeaderScrollStyle3.js'
import Icon from 'react-native-vector-icons/FontAwesome'
import Footer from './footer.js'
import { useNavigation } from '@react-navigation/native'
import { menuToggle } from '../slices/All/toggle'
//헤더에서 메뉴를 클릭햇을때 왓다갓다 하도록 만드는경우 화면을 이동하면서 리렌더링
//리렌더링 문제 해결 리렌더링이 너무많이된다.
const HeaderScroll3 = ({ children, title }) => {
  console.log('몇번 실행하는지 체크', '리렌더링')

  const dispatch = useDispatch()
  let item = useSelector((state) => state.toggle)
  console.log(item)
  const navigation = useNavigation()

  const handleMenu = () => {
    if (item === false) {
      navigation.navigate('menu')

      dispatch(menuToggle(true))
      console.log(item, '1')

      return
    } else {
      navigation.push('community')

      dispatch(menuToggle(false))

      console.log(item, '2')
      return
    }
  }

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
            onPress={() => alert('Pressed!')}
            activeOpacity={0.6}
            underlayColor={'white'}
          >
            <Image
              style={styles.image2}
              source={require('../assets/search-interface-symbol2.jpg')}
            ></Image>
          </TouchableHighlight>

          <TouchableHighlight
            onPress={handleMenu}
            style={styles.settingButton}
            activeOpacity={0.6}
            underlayColor={'white'}
          >
            {item ? (
              <Image
                style={styles.image2}
                source={require('../assets/menu-black.png')}
              ></Image>
            ) : (
              <Image
                style={styles.image2}
                source={require('../assets/menu1.jpg')}
              ></Image>
            )}
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.settingButton}
            onPress={() => alert('Pressed!')}
            activeOpacity={0.6}
            underlayColor={'white'}
          >
            <Image
              style={styles.image2}
              source={require('../assets/bell1.jpg')}
            ></Image>
          </TouchableHighlight>

          {/* style={styles.profileHeader_text_right}> */}
        </View>
      </View>
      <ScrollView>{children}</ScrollView>
    </View>
  )
}

export default React.memo(HeaderScroll3)
