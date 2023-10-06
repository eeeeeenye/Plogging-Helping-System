import React, { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TouchableHighlight,
  BackHandler,
} from 'react-native'
import styles from './mypageStyle/MyPageStyle.js'

import axios from 'axios'

// import { useNavigation } from '@react-navigation/native'
import Profile_photo from '../../components/Profile'
import { useDispatch, useSelector } from 'react-redux'
import Icon from 'react-native-vector-icons/FontAwesome'

import Footer from '../../components/footer.js'

import HeaderBackScroll from '../../components/HeaderbackScroll'
import { toggleImageClick } from '../../slices/All/footerSlice'
import StatusManager, { getUser } from '../../helpers/localStorage.js'
const MyPage = ({ navigation }) => {
  // const navigation = useNavigation()

  const dispatch = useDispatch()
  const username = useSelector((state) => state.auth.user?.clientName)
  const email = useSelector((state) => state.auth.user?.email)
  const phone = useSelector((state) => state.auth.user?.phone)
  const [note, setNote] = useState('잘부탁드립니다~~')
  const handleProfile = () => {
    navigation.navigate('Profile')
  }

  const handlePointInquiry = () => {
    navigation.navigate('point')
  }

  const handleRecordHistory = () => {
    navigation.navigate('recordHistory')
  }
  const handlePostHistory = () => {
    navigation.navigate('postHistory')
  }

  const handleServicePolicy = () => {
    // 서비스 정책
    navigation.navigate('Privacy')
  }

  const handleTermsAndConditions = () => {
    // 서비스 정책
    navigation.navigate('TermsAndConditions')
  }

  const handleIssueReport = () => {
    navigation.navigate('IssueReport')
  }
  const handlePostReport = () => {
    navigation.navigate('PostReport')
  }
  const handleReportHistory = () => {
    navigation.navigate('ReportHistory')
  }

  // toggleImageClick
  useEffect(() => {
    // const backAction = () => {
    //   dispatch(toggleImageClick({ id: 4, clicked: true }))
    //   // 여기에 뒤로 가기 버튼을 눌렀을 때 실행할 코드 작성
    //   // return true // 기본 뒤로 가기 동작을 막음
    // }

    // const backHandler = BackHandler.addEventListener(
    //   'hardwareBackPress',
    //   backAction
    // )

    dispatch(toggleImageClick({ id: 4, clicked: true }))

    // return () => backHandler.remove() // 컴포넌트가 언마운트될 때 이벤트 리스너 제거
  }, [navigation])

  return (
    // <Footer>
    <View style={styles.container}>
      <HeaderBackScroll title={'마이페이지'}>
        <View style={styles.content}>
          <View style={styles.profileContainer}>
            <Profile_photo />
            <View style={styles.profileInfo}>
              <Text style={styles.ProfileText}>{username}</Text>

              <TouchableOpacity
                style={styles.profileButton}
                onPress={handleProfile}
              >
                <Text style={styles.buttonText}>프로필 수정</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.centerContainer}>
            <View style={styles.centerContainer_title}>
              <Text style={styles.centerContainer_title_text}>신고</Text>
            </View>

            <View style={styles.centerContainer_label}>
              <TouchableOpacity onPress={handleReportHistory}>
                <Text style={styles.text}>회원신고 내역</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleIssueReport}>
                <Text style={styles.text}>불편신고 내역</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handlePostReport}>
                <Text style={styles.text}>게시글 신고</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.centerContainer}>
            <View s style={styles.centerContainer_title}>
              <Text style={styles.centerContainer_title_text}>포인트 조회</Text>
            </View>
            <View style={styles.centerContainer_label}>
              <TouchableOpacity onPress={handlePointInquiry}>
                <Text style={styles.text}>포인트 사용 내역</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.centerContainer}>
            <View style={styles.centerContainer_title}>
              <Text style={styles.centerContainer_title_text}>
                기록물 내역 확인
              </Text>
            </View>
            <View style={styles.centerContainer_label}>
              <TouchableOpacity onPress={handlePostHistory}>
                <Text style={styles.text}>작성글 확인</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleRecordHistory}>
                <Text style={styles.text}>플로깅 데이터 확인</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.centerContainer}>
            <View style={styles.centerContainer_title}>
              <Text style={styles.centerContainer_title_text}>
                공지사항/이벤트
              </Text>
            </View>
            <View style={styles.centerContainer_label}>
              <Text style={styles.text}>공지사항</Text>
              <Text style={styles.text}>이벤트</Text>
            </View>
          </View>

          <View style={styles.centerContainer2}>
            <View style={styles.centerContainer_title}>
              <Text style={styles.centerContainer_title_text}>서비스 정책</Text>
            </View>
            <View style={styles.centerContainer_label2}>
              <TouchableOpacity onPress={handleServicePolicy}>
                <Text style={styles.text}>개인정보 취급정책</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleTermsAndConditions}>
                <Text style={styles.text}>이용약관</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </HeaderBackScroll>
      <Footer></Footer>
    </View>
  )
}

export default MyPage
