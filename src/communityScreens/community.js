import React, { useState } from 'react'

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import styles from './communityStyles/communityStyle'
import HeaderScroll3 from '../components/HeaderScroll3'
import Footer from '../components/footer'

const Community = () => {
  const [dataList, setDataList] = useState(data)

  const navigation = useNavigation()
  const dateToDays = (day) => {
    if (day < 30) {
      //30일 이전 이라면
      return day + '일'
    } else if (day >= 30) {
      return '한 달'
    }
    //나중에 더추가
  }

  const handleCreateCommunity = () => {
    navigation.navigate('createCommunity')
  }

  const handleCommunity = () => {
    navigation.navigate('communityInfo')
  }
  return (
    <View style={styles.container}>
      <HeaderScroll3 title={'탕정면'}>
        <View style={styles.contents}>
          {dataList.map((el) => (
            <TouchableOpacity
              onPress={handleCommunity}
              style={styles.board}
              key={el.id}
            >
              <View>
                {el.image && (
                  <Image style={styles.image} source={{ uri: el.image }} />
                )}
              </View>
              <View>
                <Text>{el.title}</Text>
                <Text style={styles.text}>
                  {el.location} {dateToDays(el.date)}전{' '}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </HeaderScroll3>
      <TouchableOpacity
        onPress={handleCreateCommunity}
        style={styles.createButton}
      >
        <Image
          style={styles.plus}
          source={require('../assets/plus.png')}
        ></Image>
      </TouchableOpacity>
      <Footer></Footer>
    </View>
  )
}

export default Community
