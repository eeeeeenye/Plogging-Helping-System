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
import Header3 from '../../components/Header3'

const ReportHistory = () => {
  return (
    <View style={styles.container}>
      <Header3 title={'신고내역'}></Header3>
    </View>
  )
}

export default ReportHistory
