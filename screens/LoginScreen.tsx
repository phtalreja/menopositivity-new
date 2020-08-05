import { StackScreenProps } from '@react-navigation/stack';
import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Button, TextInput } from 'react-native';

import { RootStackParamList } from '../types';
import Logo from '../components/Logo';
import { loginUser } from "../api/auth-api";

export default function LoginScreen({
  navigation,
}: StackScreenProps<RootStackParamList, 'AuthLoading'>) {
  const [email, setEmail] = React.useState({ value: "", error: "" });
  const [password, setPassword] = React.useState({ value: "", error: "" });
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  const _handleLogin = async() => {
    if (loading) 
        return;

    setLoading(true);

    const response = await loginUser({
      email: email.value,
      password: password.value
    });
    if (response.error) {
        setError(response.error);
        console.log(response.error)
    }
    else {
        navigation.replace('Root');
    }
  
    setLoading(false);
  }

  return (
    <View style={styles.container}>
      <Logo />

      <TextInput 
        placeholder="Email"
        value={email.value} 
        onChangeText={text => setEmail({value: text, error: ""})}
        autoCapitalize="none"
        textContentType="emailAddress"
        keyboardType="email-address"
      >
      </TextInput>
      <TextInput 
        placeholder="Password" 
        value={password.value} 
        autoCapitalize="none" 
        secureTextEntry
        onChangeText={text => setPassword({value: text, error: ""})}></TextInput>
      <Button title='Login' onPress={_handleLogin} color='#007AFF'></Button>
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
