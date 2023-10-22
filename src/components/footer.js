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

import { useDispatch, useSelector } from 'react-redux'

import styles from './componentStyle/footerStyle'
import { useNavigation } from '@react-navigation/native'
import { toggleImageClick } from '../slices/All/footerSlice'

const Footer = ({ children }) => {
  const [isClicked, setIsClicked] = useState(false)
  const dispatch = useDispatch()
  let item = useSelector((state) => state.footer.FooterImages)

  const navigation = useNavigation()

  const handleFooterButton = (id) => {
    dispatch(toggleImageClick({ id: id }))
    if (id === 3) {
      navigation.navigate('community')
    }
    if (id === 4) {
      navigation.navigate('MyPage')
    }
  }
  //1개가 true가 되면 나머진false로
  return (
    <View style={styles.footer}>
      <View style={styles.footer_container}>
        <View style={styles.element}>
          <TouchableOpacity
            // style={styles.}
            disabled={item[0].clicked}
            onPress={() => handleFooterButton(1)}
          >
            {item[0].clicked ? (
              <Image
                style={styles.image}
                source={require(`../assets/Footer/home.png`)}
              ></Image>
            ) : (
              <Image
                style={styles.image}
                source={require(`../assets/Plogging/gray-home.png`)}
              ></Image>
            )}

            <Text
              style={[
                styles.footer_text,
                item[0].clicked ? styles.footer_text : styles.disabled,
              ]}
            >
              홈
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.element}>
          <TouchableOpacity
            disabled={item[1].clicked}
            onPress={() => handleFooterButton(2)}
          >
            {item[1].clicked ? (
              <Image
                style={styles.image}
                source={require(`../assets/Footer/shopping.png`)}
              ></Image>
            ) : (
              <Image
                style={styles.image}
                source={require(`../assets/Plogging/gray-shopping.png`)}
              ></Image>
            )}

            <Text
              style={[
                styles.footer_text2,
                item[1].clicked ? styles.footer_text2 : styles.disabled,
              ]}
            >
              스토어
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.element}>
          <TouchableOpacity
            disabled={item[2].clicked}
            onPress={() => handleFooterButton(3)}
          >
            {item[2].clicked ? (
              <Image
                style={styles.image}
                source={require(`../assets/Footer/communicate.png`)}
              ></Image>
            ) : (
              <Image
                style={styles.image}
                source={require(`../assets/Plogging/gray-communicate.png`)}
              ></Image>
            )}

            <Text
              style={[
                styles.footer_text2,
                item[2].clicked ? styles.footer_text2 : styles.disabled,
              ]}
            >
              게시판
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.element}>
          <TouchableOpacity
            disabled={item[3].clicked}
            onPress={() => handleFooterButton(4)}
          >
            {item[3].clicked ? (
              <Image
                style={styles.image}
                source={require(`../assets/Footer/user.png`)}
              ></Image>
            ) : (
              <Image
                style={styles.image}
                source={require(`../assets/Plogging/gray-user.png`)}
              ></Image>
            )}

            <Text
              style={[
                styles.footer_text2,
                item[3].clicked ? styles.footer_text2 : styles.disabled,
              ]}
            >
              내 정보
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default React.memo(Footer)
