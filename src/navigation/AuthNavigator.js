import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import {
  AccountType,
  FindAccount,
  ForgetPassword,
  Login,
  OTP,
  Register,
  Welcome,
  SelectCountry,
  SelectState
} from '../screens/Authentication';

const Stack = createNativeStackNavigator();

const AuthNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="login"
        screenOptions={{ headerShown: false, animation: 'flip' }}>
        <Stack.Screen name="login" component={Login} />
        <Stack.Screen name="register" component={Register} />
        <Stack.Screen name="otp" component={OTP} />
        <Stack.Screen name="selectCountry" component={SelectCountry} />
        <Stack.Screen name="selectState" component={SelectState} />
        <Stack.Screen name="forget" component={ForgetPassword} />
        <Stack.Screen name="accountType" component={AccountType} />
        <Stack.Screen name="findAccount" component={FindAccount} />
        <Stack.Screen name="welcome" component={Welcome} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AuthNavigator;
