import React, { useEffect } from 'react';
import { View, Image } from 'react-native';

const SplashScreen = () => {
  useEffect(() => {
    const hideSplashScreen = async () => {
      try {
        await SplashScreen.preventAutoHideAsync();
        // 스플래시 화면을 여기서 설정하고, 로딩이 완료되면 hideAsync()를 호출하여 스플래시 화면을 숨깁니다.
        // 예를 들어, 로고 이미지를 표시할 수 있습니다.
        // 아래는 예시 코드입니다. 필요에 따라 수정할 수 있습니다.
        await new Promise((resolve) => setTimeout(resolve, 3000)); // 3초 동안 스플래시 화면을 표시합니다.
        await SplashScreen.hideAsync();
      } catch (error) {
        console.warn(error);
      }
    };

    hideSplashScreen();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Image source={require('./path/to/your/logo.png')} />
    </View>
  );
};

export default SplashScreen;
