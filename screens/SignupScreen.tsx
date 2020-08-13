import { StackScreenProps } from '@react-navigation/stack';
import * as React from 'react';
import { StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard} from 'react-native';
import { Input, Button } from 'react-native-elements';
import { Text, View } from '../components/Themed';
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
    const response = await signUpUser({
      name: name,
      email: email.value,
      password: password.value
    });
    if (response.error) {
        console.log(response.error)
    }
  }
  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      keyboardVerticalOffset={0}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.innerContainer}>
          {/* <Logo /> */}
          <View style={{alignItems: 'flex-start'}}>
            <Text style={{fontSize: 30, fontWeight: 'bold'}}>Sign up</Text>
          </View>
          <View style={{width:'100%', }}>
            <Input
              placeholder="name"
              value={name}
              onChangeText={text => setName(text)}
              inputContainerStyle= {styles.inputContainer}
              containerStyle= {styles.outerInputContainer}
              leftIcon={{ type:'font-awesome', name: 'user-o', size: 20}}
              leftIconContainerStyle={{marginRight: 10}}
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
              leftIcon={{ type:'font-awesome', name: 'envelope-o', size: 20}}
              leftIconContainerStyle={{marginRight: 10}}
            />
            <Input 
              placeholder="Password" 
              value={password.value} 
              autoCapitalize="none" 
              secureTextEntry
              inputContainerStyle= {styles.inputContainer}
              containerStyle= {styles.outerInputContainer}
              onChangeText={text => setPassword({value: text, error: ""})}
              leftIcon={{ type:'font-awesome', name: 'key', size: 20}}
              leftIconContainerStyle={{marginRight: 10}}
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
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 20
  },
  innerContainer: {
    padding: 20,
    width:'100%', 
    alignItems: 'center', 
    height: '100%', 
    justifyContent: 'space-around', 
    
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
