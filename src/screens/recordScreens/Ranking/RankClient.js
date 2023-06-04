import axios from 'axios'
import Constans from 'expo-constants'

export async function getClients(){
    const ip = Constans.manifest.extra.Local_ip

    try{
        const response = await axios.post(`http://${ip}:3000/plogging/ranking`)
        const clients = response.data
        
        return clients;
    }catch(error){
        console.error('클라이언트를 가져오는 중 오류 발생:',error)
        return [];
    }
}

export async function getProduct(id){
    try{
        const response = await axios.get('API_KEY');
        return response.data
    }catch(error){
        console.error(`ID가 ${id}인 클라이언트를 가져오는 중 오류 발생`,error)
    }
}