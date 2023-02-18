import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setLoading } from 'src/actions/miscActions';
import { useIsFocused } from '@react-navigation/native';
import { 
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';

import TouchID from 'react-native-touch-id';

function PreLoginBiometricAuthScreen({ navigation }: { navigation: any }) {
  const dispatch = useDispatch();

  const isFocused = useIsFocused();
  
  const optionalConfigObject = {
    title: '認証が必要です',
    imageColor: '#e00606',
    imageErrorColor: '#ff0000',
    sensorDescription: 'タッチセンサー',
    sensorErrorDescription: '失敗した',
    cancelText: 'キャンセル',
    fallbackLabel: 'パスワード入力',
    unifiedErrors: false,
    passcodeFallback: true,
  };

  const fallBack = () => {
    console.log('fallBack');
  };

  const handleBiometricAuthentication = async () => {
    try {
      const response = await TouchID.authenticate('給与明細にアクセスするには認証が必要です', optionalConfigObject);

      if (response) {
        console.log('[Response]', response);

          dispatch(setLoading(true));

          await setTimeout(() => {
            dispatch(setLoading(false));

            navigation.navigate('PayCheck');
          }, 2000);
      }
    } catch (error) {
      console.log('[Error]', error);
    }
  };

  useEffect(() => {
    if (isFocused) {
      handleBiometricAuthentication();
    }
  }, [isFocused]);
  
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text>読み込み中</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
});

export default PreLoginBiometricAuthScreen;