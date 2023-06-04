import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import axios from 'axios';

const API_KEY = '10.20.32.42';
const API_URL = 'http://api.data.go.kr/openapi/tn_pubr_public_toilet_api';

const PublicDataScreen = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(API_URL, {
          params: {
            apiKey: API_KEY,
            // Add other parameters if needed
          },
        });
        setData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  if (!data) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View>
      {/* Render the retrieved data */}
      <Text>{JSON.stringify(data)}</Text>
    </View>
  );
};

export default PublicDataScreen;
