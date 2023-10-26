import React, { useEffect, useState } from 'react'

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  BackHandler,
  Image,
} from 'react-native'

// import moment from 'moment'

import { useDispatch, useSelector } from 'react-redux'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import styles from './communityStyles/communityStyle'
import HeaderScroll3 from '../../components/HeaderScroll3'
import Footer from '../../components/footer'
import axios from 'axios'
import { toggleImageClick } from '../../slices/All/footerSlice'

import { saveCommunity } from '../../slices/All/communityslice'
import { menuToggle } from '../../slices/All/toggle'
const Community = () => {
  const dispatch = useDispatch()

  const community = useSelector((state) => state.community)
  let item = useSelector((state) => state.footer.FooterImages)

  const [dataList, setDataList] = useState([])
  const [minutes, setMinutes] = useState([])

  const navigation = useNavigation()

  const getCommunityBoard = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URI}/community/info`
      )

      dispatch(saveCommunity(response.data))
      setDataList(response.data)
    } catch (error) {
      console.log('Error fetching community:', error)
    }
  }

  const getDate = (date) => {
    //분을 가져와서 1시간으로 나눌꺼고 24시간 기준으로 시로 24시간이 넘어가면 일
    //24시간마다 2일 3일
    //일 초과되면 달 달도 마찬가지로 1달마다 추가
    //달이 초과되면 년
    const hour = 60

    const day = hour * 24
    //30일을 한달로
    const month = day * 30

    const year = month * 12

    if (date < hour) {
      return date + '분' + ' '
    } else if (date < day) {
      return Math.floor(date / hour) + '시' + ' '
    } else if (date < month) {
      return Math.floor(date / day) + '일' + ' '
    } else if (date < year) {
      return Math.floor(date / month) + '달' + ' '
    } else if (date >= year) {
      return Math.floor(date / year) + '년' + ' '
    }
  }

  useEffect(() => {
    getCommunityBoard()
  }, [])
  //뒤로가기해도 변화를줘야된다.

  useFocusEffect(
    React.useCallback(() => {
      // 화면에 진입할 때 실행할 코드

      dispatch(menuToggle(false))
      // return () => {
      //   console.log('안떨어졋어')

      return () => {
        // 화면을 떠날 때 실행할 코드
      }
    }, [])
  )

  const handleCreateCommunity = () => {
    navigation.navigate('createCommunity')
  }

  const handleCommunity = (id) => {
    navigation.navigate('communityInfo', { id })
  }
  return (
    <View style={styles.container}>
      <HeaderScroll3 title={'탕정면'}>
        <View style={styles.contents}>
          {dataList.map((el) => (
            <TouchableOpacity
              onPress={() => handleCommunity(el.community_id)}
              style={styles.board}
              key={el.community_id}
            >
              <View>
                {el.image && (
                  <Image style={styles.image} source={{ uri: el.image }} />
                )}
              </View>
              <View>
                <Text>{el.title}</Text>
                <Text style={styles.text}>
                  {el.location} {getDate(el.minute)}전{' '}
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
          source={require('../../assets/plus.png')}
        ></Image>
      </TouchableOpacity>
      <Footer></Footer>
    </View>
  )
}

export default Community
