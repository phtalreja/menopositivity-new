import { StackScreenProps } from '@react-navigation/stack';
import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Input, Button } from 'react-native-elements';
import Logo from '../components/Logo';
import { signUpUser } from "../api/auth-api";

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import { RootStackParamList, AuthStackParamList } from '../types';

export default function SignupScreen({
  navigation,
}: StackScreenProps<AuthStackParamList, 'Signup'>) {
  const colorScheme = useColorScheme();
  const [email, setEmail] = React.useState({ value: "", error: "" });
  const [password, setPassword] = React.useState({ value: "", error: "" });
  const [name, setName] = React.useState("")
  const [loading, setLoading] = React.useState(false);

  const _handleSignup = async() =>{
    console.log("SignUp")
  }
  return (
    <View style={styles.container}>
      <Logo />
      <View style={{alignItems: 'flex-start'}}>
        <Text>Sign up</Text>
      </View>
      <View style={{width:'100%'}}>
        <Input
          placeholder="name"
          value={name}
          onChangeText={text => setName(text)}
          inputContainerStyle= {styles.inputContainer}
          containerStyle= {styles.outerInputContainer}
        />
        <Input 
          placeholder="Email"
          value={email.value} 
          onChangeText={text => setEmail({value: text, error: ""})}
          autoCapitalize="none"
          textContentType="emailAddress"
          keyboardType="email-address"
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
          onChangeText={text => setPassword({value: text, error: ""})}

        />
      </View>
      <Button 
        title='Sign Up' 
        type='solid' 
        onPress={_handleSignup} 
        buttonStyle={[styles.loginButton, {backgroundColor: Colors[colorScheme].tint}]}
      />
      <View style={{flexDirection: "row"}}>
        <Text>Already have an account? </Text>
        <TouchableOpacity
          onPress={()=> navigation.navigate('Login')}
        >
          <Text style={{color: Colors[colorScheme].tint}}>Login</Text>
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
