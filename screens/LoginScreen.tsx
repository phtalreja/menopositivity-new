import { StackScreenProps } from '@react-navigation/stack';
import * as React from 'react';
import { StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { Text, View } from '../components/Themed';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import { AuthStackParamList } from '../types';
import Logo from '../components/Logo';
import { loginUser } from "../api/auth-api";
import { emailValidator, passwordValidator } from "../utils/utils";

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
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);
    if (emailError || passwordError) {
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      return;
    }
    
    setLoading(true);
    
    console.log("tries login")
    const response = await loginUser({
      email: email.value,
      password: password.value
    });
    if (response.error) {
        setError(response.error);
        console.log(response.error)
    }

    setLoading(false);
  }

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      keyboardVerticalOffset={0}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

        <View style={styles.innerContainer}>
          <Logo />
          
          <View style={{width:'100%'}}>
            <View style={{alignItems: 'flex-start', marginLeft:20, marginBottom:20}}>
              <Text style={{fontSize: 30, fontWeight: 'bold'}}>Login</Text>
            </View>
            <Input 
              placeholder="Email"
              returnKeyType="next"
              value={email.value} 
              onChangeText={text => setEmail({value: text, error: ""})}
              errorMessage={email.error}
              autoCapitalize="none"
              autoCompleteType="email"
              textContentType="emailAddress"
              keyboardType="email-address"
              leftIcon={{ type:'font-awesome', name: 'envelope-o', size: 20}}
              leftIconContainerStyle={{marginRight: 10}}
              inputContainerStyle= {styles.inputContainer}
              containerStyle= {styles.outerInputContainer}
              errorStyle={{paddingVertical:5}}
            />
            <Input 
              placeholder="Password" 
              returnKeyType="done"
              value={password.value} 
              errorMessage={password.error}
              autoCapitalize="none" 
              secureTextEntry
              inputContainerStyle= {styles.inputContainer}
              containerStyle= {styles.outerInputContainer}
              leftIcon={{ type:'font-awesome', name: 'key', size: 20}}
              leftIconContainerStyle={{marginRight: 10}}
              onChangeText={text => setPassword({value: text, error: ""})}
              errorStyle={{paddingVertical:5}}
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
    width:'100%', 
    padding: 20,
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
