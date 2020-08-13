import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { ColorSchemeName } from 'react-native';

import { RootStackParamList } from '../types';
import BottomTabNavigator from './BottomTabNavigator';
import AuthNavigator from './AuthNavigator';
import LinkingConfiguration from './LinkingConfiguration';
import { User } from '@firebase/auth-types'
import { Icon } from 'react-native-elements';
import { logoutUser } from "../api/auth-api";

// If you are not familiar with React Navigation, we recommend going through the
// "Fundamentals" guide: https://reactnavigation.org/docs/getting-started
export default function Navigation(
  { colorScheme, authUser, setUser }: { colorScheme: ColorSchemeName, authUser : User | null, setUser : Function },
  ) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator authUser={authUser} setUser={setUser} />
    </NavigationContainer>
  );
}

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const Stack = createStackNavigator<RootStackParamList>();

function RootNavigator({authUser, setUser}: {authUser : User | null, setUser: Function}) {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      { authUser ? (
        <Stack.Screen name="Root" component={BottomTabNavigator}
          options={{ 
            headerShown: true,
            headerTitle:'',
            headerTransparent: true,
            headerRight: () => (
              <Icon
                name='sign-out'
                type='font-awesome'
                onPress={() => {setUser(null); logoutUser()}}
              >
              </Icon>
            ),
        }}
        />
        ) : (
        <Stack.Screen name="Auth" component={AuthNavigator} />
        
      )}
    </Stack.Navigator>
  )
}
