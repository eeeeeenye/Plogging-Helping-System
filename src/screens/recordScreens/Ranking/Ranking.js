// 사용자 랭킹 표시
import React, {useEffect, useState} from 'react'
import {View, Text, FlatList, Image} from 'react-native'
import { getClients } from './RankClient';

const RankingScreen = () =>{
    const [clients, setClients] = useState([]);

    useEffect(()=>{
        fetchClients();
    },[])

    const fetchClients = async () =>{
        const fetchedClients = await getClients();
        setClients(fetchedClients);
    }

    const renderClientItem = ({clients}) => (
        <View style={{flexDirection: 'row', alignItems: 'center',marginVertical:10}}>
            <Image source={clients.image} style={{width: 50, height: 50, marginRight: 10 }}/>
            <View>
                <Text>{clients.name}</Text>
                <Text>{clients.walking}</Text>
                <Text>{clients.distance}</Text>
                <Text>{clients.trashcnt}</Text>
            </View>
        </View>
    )

    return(
        <View style={{flex:1,padding:20}}>
            <FlatList
                data={clients}
                renderItem={renderClientItem}
                keyExtractor={(item)=>item.id.toString()}
            />
        </View>
    );
}

export default RankingScreen;