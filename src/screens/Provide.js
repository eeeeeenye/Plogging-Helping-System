// import React, { useEffect, useState } from 'react';
// import { View, StyleSheet } from 'react-native';
// import { WebView } from 'react-native-webview';
// import Constants from 'expo-constants';
// import RestroomSet from '../map/htmlCode/RestroomHTML';
// import MyComponent from '../map/Public_Service';
// import axios from 'axios';

// const OnlyMap = () => {
//   const [toiletData, setToiletData] = useState([]);
//   const ip = Constants.manifest.extra.Local_ip;

//   useEffect(() => {
//   fetchData();
//   }, []);

//   useEffect(()=>{
//     console.log(toiletData)
//   },[toiletData])

//   const fetchData = async () => {
//     try {
//       const response = await axios.get(`http://${ip}:3000/publicToilets`);
      
//       console.log(toiletData)

//       // 가져온 데이터 정제하기, 도로명, 지번, 위도, 경도 가져오기
//       const refinedData = response.data.map((item) => {
//         return {
//           rdnmadr: item.rdnmadr,
//           lnmadr: item.lnmadr,
//           latitude: item.latitude,
//           longitude: item.longitude,
//         };
//       });

//       setToiletData(refinedData);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <WebView source={RestroomSet} style={styles.map} />
//       {/* <MyComponent toiletData={toiletData} /> */}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'white',
//   },
//   map: {
//     flex: 1,
//   },
// });

// export default OnlyMap;
