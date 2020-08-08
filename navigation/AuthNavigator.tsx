import { createStackNavigator } from '@react-navigation/stack';
import { AuthStackParamList, LoginParamList } from '../types';
import * as React from 'react';

import LoginScreen from '../screens/LoginScreen';

const AuthStack = createStackNavigator<AuthStackParamList>();

export default function AuthNavigator() {
  return (
    <AuthStack.Navigator
    initialRouteName="Login">
      <AuthStack.Screen
        name="Login"
        component={LoginNavigator}
        options={{ headerTitle: 'Login' }}
      />
    </AuthStack.Navigator>
  );
}

const LoginStack = createStackNavigator<LoginParamList>();

function LoginNavigator() {
  return (
    <LoginStack.Navigator>
      <LoginStack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{ headerTitle: 'Login' }}
      />
    </LoginStack.Navigator>
  );
}