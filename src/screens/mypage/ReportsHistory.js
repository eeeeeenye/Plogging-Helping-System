import React, { useState } from 'react'

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Button,
} from 'react-native'
import styles from './mypageStyle/ReportHistoryStyle'
import Header3 from '../../components/HeaderScroll3'
import HeaderScroll3 from '../../components/HeaderScroll3'

const data = [
  {
    id: 1,
    image: 'https://ifh.cc/g/kwZPTQ.png',
    title: '온양온천역 근처에서 플로깅',
    date: 30,
    report: '목적과 다른 모임',
    boolean: '아니오',
  },
  {
    id: 2,
    image: 'https://ifh.cc/g/YDWRg6.png',
    title: '선문대 대학로, 벚꽃길 플로깅',
    date: 5,
    report: '부적절한 언행',
    boolean: '예',
  },
]

const ReportHistory = () => {
  const [dataList, setDataList] = useState(data)

  const dateToDays = (day) => {
    if (day < 30) {
      //30일 이전 이라면
      return day + '일'
    } else if (day >= 30) {
      return '한 달'
    }
    //나중에 더추가
  }

  return (
    <View style={styles.container}>
      <HeaderScroll3 title={'신고내역'}>
        <View style={styles.content}>
          {dataList.map((el) => (
            <View style={styles.report} key={el.id}>
              <View>
                {el.image && (
                  <Image style={styles.image} source={{ uri: el.image }} />
                )}
              </View>
              <View>
                <Text>{el.title}</Text>
                <Text style={styles.text}>{dateToDays(el.date)} 전 신고글</Text>

                <View style={styles.reportContainer}>
                  <Text>신고사유</Text>
                  <Text style={styles.text}>{el.report} </Text>

                  <View style={styles.boolean}>
                    <Text style={styles.text2}>게시자 신고여부</Text>

                    <Text
                      style={[
                        el.boolean === '예'
                          ? styles.booleanText
                          : styles.booleanText2,
                      ]}
                    >
                      {el.boolean}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          ))}
        </View>
      </HeaderScroll3>
    </View>
  )
}

export default ReportHistory
