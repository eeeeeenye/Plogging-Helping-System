import axios from 'axios'
import Constans from 'expo-constants'
import StatusManager from '../../../helpers/localStorage'


export async function getClients(){
    const ip = Constans.manifest.extra.Local_ip
    const currentDate = new Date();         // 오늘날짜 가져오기
    
    try{
        const rankingUpdateDate = await StatusManager.getData('rankingUpdateDate')          // 업데이트 날짜를 가져오기
        const shouldUpdateData = shouldUpdateRankingData(currentDate, rankingUpdateDate);   // 업데이트를 해야하는지에 대한 여부를 알려줌

        if(shouldUpdateData){                                                               // 업데이트를 해야하는지 아닌지에 따라 다른 처리
            const response = await axios.post(`http://${ip}:3000/plogging/ranking`)         
            const clients = response.data;
            StatusManager.storeData('ranking',clients);
            StatusManager.storeData('rankingUpdateDate',currentDate);

            return clients;
        }else{
            const cachedRanking = await StatusManager.getData('ranking');
            return cachedRanking || [];
        }
    
    }catch(error){
        console.error('클라이언트를 가져오는 중 오류 발생:',error)
        return [];
    }
}

function shouldUpdateRankingData(currentDate, lastUpdateDate){
    if(!lastUpdateDate){
        return true;
    }
    const milesecondsPerDay = 24*60*60*1000;
    const daysSinceLastUpdate = Math.floor((currentDate - lastUpdateDate)/milesecondsPerDay)

    return daysSinceLastUpdate >= 7;
}
