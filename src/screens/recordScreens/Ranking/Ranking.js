// 사용자 랭킹 표시
import React, { useEffect, useState } from 'react'
import { View, Text, FlatList, StyleSheet } from 'react-native'
import { getClients } from './RankClient'

const RankingScreen = () => {
  const [clients, setClients] = useState([])

  useEffect(() => {
    fetchClients()
  }, [])

  const fetchClients = async () => {
    //배열 형식
    const fetchedClients = await getClients()
    setClients(fetchedClients)
  }

  const renderClient = ({ item }) => (
    <View style={styles.itemContainer}>
      <View style={styles.rankContainer}>
        <Text style={styles.rankText}>{item.totalRank}</Text>
      </View>
      <View style={styles.clientInfoContainer}>
        <Text style={styles.clientName}>{item.clientName}</Text>
        <Text style={styles.address}>{item.address}</Text>
        <View style={styles.statsContainer}>
          <View style={styles.statContainer}>
            <Text style={styles.statValue}>{item.totalWalking}</Text>
            <Text style={styles.statLabel}>걸음</Text>
          </View>
          <View style={styles.statContainer}>
            <Text style={styles.statValue}>{item.totalDistance}</Text>
            <Text style={styles.statLabel}>km</Text>
          </View>
          <View style={styles.statContainer}>
            <Text style={styles.statValue}>{item.totalTrashCount}</Text>
            <Text style={styles.statLabel}>L</Text>
          </View>
        </View>
      </View>
    </View>
  )

  return (
    <View style={styles.flatListstyle}>
      <FlatList
        data={clients}
        renderItem={renderClient}
        keyExtractor={(item) => item.clientID.toString()}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  // 기존 스타일 코드

  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    padding: 15,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  rankContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#FFD700',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  rankText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  clientInfoContainer: {
    flex: 1,
  },
  clientName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333333',
  },
  statsContainer: {
    flexDirection: 'row',
  },
  statContainer: {
    marginRight: 20,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#555555',
  },
  statLabel: {
    fontSize: 14,
    color: '#999999',
  },
  address: {
    fontSize: 16,
    marginTop: 5,
    marginBottom: 5,
    fontWeight: 'bold',
    color: '#999999',
  },
})

export default RankingScreen
