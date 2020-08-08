import { StackScreenProps } from '@react-navigation/stack';
import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, TextInput } from 'react-native';
import { Input, Button } from 'react-native-elements';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import { AuthStackParamList } from '../types';
import Logo from '../components/Logo';
import { loginUser } from "../api/auth-api";

export default function LoginScreen({
  navigation,
}: StackScreenProps<AuthStackParamList, 'Login'>) {
  const colorScheme = useColorScheme();
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
        // navigation.replace('Root');
    }
  
    setLoading(false);
  }

  return (
    <View style={styles.container}>
      <Logo />
      
      <View style={{width:'100%'}}>
        <View style={{alignItems: 'flex-start', marginLeft:20, marginBottom:20}}>
          <Text style={{fontSize: 30, fontWeight: 'bold'}}>Login</Text>
        </View>
        <Input 
          placeholder="Email"
          value={email.value} 
          onChangeText={text => setEmail({value: text, error: ""})}
          autoCapitalize="none"
          textContentType="emailAddress"
          keyboardType="email-address"
          leftIcon={{ type:'font-awesome', name: 'envelope-o', size: 20}}
          inputContainerStyle= {styles.inputContainer}
          containerStyle= {styles.outerInputContainer}
        />
        <Input 
          placeholder="Password" 
          value={password.value} 
          autoCapitalize="none" 
          secureTextEntry
          inputContainerStyle= {styles.inputContainer}
          containerStyle= {styles.outerInputContainer}
          leftIcon={{ type:'font-awesome', name: 'key', size: 20}}
          onChangeText={text => setPassword({value: text, error: ""})}

        />
      </View>
      <Button 
        title='Login' 
        type='solid' 
        onPress={_handleLogin} 
        buttonStyle={[styles.loginButton, {backgroundColor: Colors[colorScheme].tint}]}
      />
      <View style={{flexDirection: "row"}}>
        <Text>Don't have an account? </Text>
        <TouchableOpacity
          onPress={()=> navigation.navigate('Signup')}
        >
          <Text style={{color: Colors[colorScheme].tint}}>Sign up</Text>
          </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: 20,
  },
  inputContainer: {
    borderBottomWidth: 0,
    borderRadius: 25,
    paddingLeft: 20,
    backgroundColor: '#fff'
  },
  outerInputContainer: {
    shadowOffset:{ width: 0,  height: 10, },
    shadowColor: 'black',
    shadowOpacity: .5,
    shadowRadius: 10,
    elevation: 1,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
  },
  loginButton: {
    borderRadius: 20,
    width:'100%'
  }
});
