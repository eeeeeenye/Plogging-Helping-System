import React, { useState, useEffect } from 'react'

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

import styles from './communityStyles/CommunityInfoStyle'
import HeaderScroll3 from '../../components/HeaderScroll3'
import Footer from '../../components/footer'
import HeaderBackScroll3 from '../../components/HeaderbackScroll3'
import axios from 'axios'

const CommunityInfo = ({ navigation, route }) => {
  const [dataList, setDataList] = useState([])

  const receivedData = route.params.id
  const community = useSelector((state) => state.community)
  console.log(receivedData)
  const communityBoard = community.filter(
    (el) => el.community_id === receivedData
  )
  console.log(communityBoard)

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

  const getTime = (time) => {
    const date = new Date(time)

    // 월, 일, 시간, 분을 추출
    const year = date.getFullYear()
    const month = date.getMonth() + 1 // 월은 0부터 시작하므로 +1
    const day = date.getDate()
    const hours = date.getHours()
    const minutes = date.getMinutes()

    // 원하는 형식으로 날짜와 시간을 문자열로 만들기
    const formattedDate = `${year}년 ${month}월 ${day}일 ${hours}:${minutes}`

    return formattedDate
  }

  const handleCreateCommunity = () => {
    navigation.navigate('createCommunity')
  }

  const handleCommunity = () => {
    navigation.navigate('communityInfo')
  }
  return (
    <View style={styles.container}>
      <HeaderBackScroll3 title={'소셜 액티비티'}>
        <View style={styles.content}>
          <View style={styles.image_box}>
            <Image
              style={styles.image}
              source={{ uri: communityBoard[0].image }}
            ></Image>
          </View>

          <View style={styles.center}>
            <View style={styles.title_box}>
              <Text style={styles.title_text}>{communityBoard[0].title}</Text>
              <Text style={styles.date_text}>
                {getDate(communityBoard[0].minute)} 전
              </Text>
            </View>
            <View>
              <View style={styles.small_box}>
                <Image
                  style={styles.small_image}
                  source={require('../../assets/map.png')}
                ></Image>
                <Text>{communityBoard[0].city}</Text>
              </View>
              <View>
                <Text style={styles.under_text}>{'(지도보기)'}</Text>
              </View>
              <View style={styles.small_box}>
                <Image
                  style={styles.small_image}
                  source={require('../../assets/weekly-calendar.png')}
                ></Image>
                <Text>{getTime(communityBoard[0].date)}</Text>
              </View>
              <View style={styles.s}>
                <Text style={styles.under_text}>
                  {'(시간조정 가능, 카톡문의!)'}
                </Text>
              </View>
              <View style={styles.small_box}>
                <Image
                  style={styles.small_image}
                  source={require('../../assets/users.png')}
                ></Image>
                <Text>{communityBoard[0].people} 명</Text>
              </View>
            </View>
            <View style={styles.introduce}>
              <Text>모임 한줄소개 : </Text>
              <Text style={styles.introduce_text}>
                처음 하시는 분들도 환영 플ㅁㄴㅇㅁㄴㅇㅁㄴㅇ로깉 끝나고 여러
                군데 둘러봐요~~asdasdasdaㅁㄴㅇㅁ우멍ㅁ나어마ㅣ어미ㅏㄴㅇ
              </Text>
            </View>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              <View style={styles.human}>
                <Image source={require('../../assets/Ellipse6.png')}></Image>
                <Text>Sally</Text>
                <Text>모임장</Text>
              </View>
              <View style={styles.human}>
                <Image source={require('../../assets/Ellipse6.png')}></Image>
                <Text>Sally</Text>
              </View>
              <View style={styles.human}>
                <Image source={require('../../assets/Ellipse6.png')}></Image>
                <Text>미정</Text>
              </View>
              <View style={styles.human}>
                <Image source={require('../..assets/Ellipse6.png')}></Image>
                <Text>미정</Text>
              </View>
              <View style={styles.human}>
                <Image source={require('../../assets/Ellipse6.png')}></Image>
                <Text>미정</Text>
              </View>
              <View style={styles.human}>
                <Image source={require('../../assets/Ellipse6.png')}></Image>
                <Text>미정</Text>
              </View>
              <View style={styles.human}>
                <Image source={require('../../assets/Ellipse6.png')}></Image>
                <Text>미정</Text>
              </View>
              <View style={styles.human}>
                <Image source={require('../../assets/Ellipse6.png')}></Image>
                <Text>미정</Text>
              </View>
              <View style={styles.human}>
                <Image source={require('../../assets/Ellipse6.png')}></Image>
                <Text>미정</Text>
              </View>
              <View style={styles.human}>
                <Image source={require('../../assets/Ellipse6.png')}></Image>
                <Text>미정</Text>
              </View>
            </ScrollView>
          </View>
          <View style={styles.line}></View>
          <View style={styles.bottom}>
            <View style={styles.button_box}>
              <TouchableOpacity style={styles.button}>
                <Image
                  style={styles.image2}
                  source={require('../../assets/like.png')}
                ></Image>
                <Text>좋아요</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button}>
                <Image
                  style={styles.image2}
                  source={require('../../assets/chat.png')}
                ></Image>
                <Text>댓글</Text>
              </TouchableOpacity>
            </View>
            <View></View>
            <View style={styles.button_box2}>
              <TouchableOpacity style={styles.kakao_button}>
                <Text style={styles.kakao}>카카오톡 문의</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.register_button}>
                <Text style={styles.register}>참석 및 클럽가입</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </HeaderBackScroll3>
    </View>
  )
}

export default CommunityInfo
