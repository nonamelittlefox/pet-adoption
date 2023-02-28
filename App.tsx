import { Provider } from 'react-redux';
import { useDispatch } from 'react-redux';
import { StatusBar } from 'expo-status-bar';
import { persistor, store } from 'src/store';
import { View, StyleSheet } from 'react-native';
import { enableScreens } from 'react-native-screens';
import { StackName, Options } from './src/const/Stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';

import React, { useEffect, useState } from 'react';
import Toast, { BaseToast } from 'react-native-toast-message';

import 'react-native-gesture-handler';

import Loading from 'src/components/Loading';
import useSelector from 'src/utils/useSelector';
import HomeScreen from 'src/screens/HomeScreen';
import LoginScreen from 'src/screens/LoginScreen/index';
import HelpScreen from 'src/components/Help/index';
import SendScreen from 'src/components/Help/send';
import QuestionScreen from 'src/components/Help/question';
import QuestionDetailScreen from 'src/components/Help/detail';
import ResetPasswordScreen from 'src/components/ResetPassword/index';
import AuthorizationOTPScreen from 'src/components/ResetPassword/authorization';
import NewPasswordScreen from 'src/components/ResetPassword/reset';
import NotificationScreen from 'src/components/ResetPassword/notification';
import UserInformationScreen from 'src/screens/UserInfo/index';

const Stack = createNativeStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      {
        <>
          <Stack.Screen
            options={Options.LoginScreen}
            name={StackName.LoginScreen}
            component={LoginScreen}
          />
          <Stack.Screen
            options={Options.HomeScreen}
            name={StackName.HomeScreen}
            component={HomeScreen}
          />
          <Stack.Screen
            options={Options.HelpScreen}
            name={StackName.HelpScreen}
            component={HelpScreen}
          />
          <Stack.Screen
            options={Options.SendScreen}
            name={StackName.SendScreen}
            component={SendScreen}
          />
          <Stack.Screen
            options={Options.QuestionScreen}
            name={StackName.QuestionScreen}
            component={QuestionScreen}
          />
          <Stack.Screen
            options={Options.QuestionDetailScreen}
            name={StackName.QuestionDetailScreen}
            component={QuestionDetailScreen}
          />
          <Stack.Screen
            options={Options.ResetPasswordScreen}
            name={StackName.ResetPasswordScreen}
            component={ResetPasswordScreen}
          />
          <Stack.Screen
            options={Options.AuthorizationOTPScreen}
            name={StackName.AuthorizationOTPScreen}
            component={AuthorizationOTPScreen}
          />
          <Stack.Screen
            options={Options.NewPasswordScreen}
            name={StackName.NewPasswordScreen}
            component={NewPasswordScreen}
          />
          <Stack.Screen
            options={Options.NotificationScreen}
            name={StackName.NotificationScreen}
            component={NotificationScreen}
          />
          <Stack.Screen
            options={Options.UserInformationScreen}
            name={StackName.UserInformationScreen}
            component={UserInformationScreen}
          />
        </>
      }
    </Stack.Navigator>
  );
}

const toastConfig = {
  success: props => (
    <BaseToast
      {...props}
      style={styles.successToast}
      text1Style={{ color: '#444444', fontWeight: 'bold', fontSize: 18 }}
      text2Style={{ fontSize: 14 }}
      text2NumberOfLines={2}
      duration={2000}
    />
  ),

  warning: props => (
    <BaseToast
      {...props}
      style={styles.warningToast}
      text1Style={{ color: '#444444', fontWeight: 'bold', fontSize: 18 }}
      text2Style={{ fontSize: 14 }}
      text2NumberOfLines={2}
      duration={2000}
    />
  ),

  error: props => (
    <BaseToast
      {...props}
      style={styles.errorToast}
      text1Style={{ color: '#444444', fontWeight: 'bold', fontSize: 18 }}
      text2Style={{ fontSize: 14 }}
      text2NumberOfLines={2}
      duration={2000}
    />
  ),
};

enableScreens();

const App = () => {
  const dispatch = useDispatch();

  const navigationRef = useNavigationContainerRef();

  const stateLoading = useSelector(state => state.misc.isLoading);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaProvider>
        <NavigationContainer ref={navigationRef}>
          <StatusBar style="auto" />
          <MyStack />
          <Toast config={toastConfig} />
        </NavigationContainer>
        {isLoading ? <Loading /> : <></>}
      </SafeAreaProvider>
    </View>
  );
};

export default function Index() {
  return (
    <Provider store={store}>
      <PersistGate loading={<View />} persistor={persistor}>
        <SafeAreaProvider>
          <App />
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  warningToast: {
    height: 80,
    width: '90%',
    elevation: 24,
    borderRadius: 5,
    shadowRadius: 16.0,
    borderLeftWidth: 8,
    shadowOpacity: 0.58,
    shadowColor: '#000000',
    borderLeftColor: '#FCD900',
    backgroundColor: '#FFFFFF',

    shadowOffset: {
      width: 0,
      height: 12,
    },
  },

  successToast: {
    height: 80,
    width: '90%',
    elevation: 24,
    borderRadius: 5,
    shadowRadius: 16.0,
    borderLeftWidth: 8,
    shadowOpacity: 0.58,
    shadowColor: '#000000',
    borderLeftColor: '#81B214',
    backgroundColor: '#FFFFFF',

    shadowOffset: {
      width: 0,
      height: 12,
    },
  },

  errorToast: {
    height: 80,
    width: '90%',
    elevation: 24,
    borderRadius: 5,
    shadowRadius: 16.0,
    borderLeftWidth: 8,
    shadowOpacity: 0.58,
    shadowColor: '#000000',
    borderLeftColor: '#BE0000',
    backgroundColor: '#FFFFFF',

    shadowOffset: {
      width: 0,
      height: 12,
    },
  },
});
