import { StackScreenProps } from '@react-navigation/stack';
import * as React from 'react';
import { StyleSheet, ActivityIndicator, TouchableOpacity, View, Button, TextInput } from 'react-native';

import { RootStackParamList } from '../types';
import Colors from '../constants/Colors';
import firebase from 'firebase';
import { loginUser } from "../api/auth-api";

export default function LoadingScreen({
    navigation,
  }: StackScreenProps<RootStackParamList, 'AuthLoading'>) {

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        // User is logged in
        navigation.replace('Root');
      } else {
        // User is not logged in
        navigation.navigate('Auth');
      }
    });
  
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={Colors.light.tint} />
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
    }
  });