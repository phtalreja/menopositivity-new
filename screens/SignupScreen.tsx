import { StackScreenProps } from '@react-navigation/stack';
import * as React from 'react';
import { StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard} from 'react-native';
import { Input, Button } from 'react-native-elements';
import { Text, View } from '../components/Themed';
import { nameValidator, emailValidator, passwordValidator } from "../utils/utils";
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
  const [name, setName] = React.useState({ value: "", error: "" })
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  const _handleSignup = async() =>{
    if (loading)
      return;

    const nameError = nameValidator(name.value);
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);

    if (emailError || passwordError || nameError) {
      setName({ ...name, error: nameError });
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      return;
    }
  
    setLoading(true);

    const response = await signUpUser({
      name: name.error,
      email: email.value,
      password: password.value
    });
    if (response.error) {
      setError(response.error);
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
          {/* <Logo /> */}
          <View>
            <Text style={{fontSize: 30, fontWeight: 'bold'}}>Sign up</Text>
          </View>
          <View style={{width:'100%', }}>
            <Input
              placeholder="name"
              returnKeyType="next"
              value={name.value}
              errorMessage={name.error}
              onChangeText={text => setName({value: text, error: ""})}
              inputContainerStyle= {styles.inputContainer}
              containerStyle= {styles.outerInputContainer}
              leftIcon={{ type:'font-awesome', name: 'user-o', size: 20}}
              leftIconContainerStyle={{marginRight: 10}}
              errorStyle={{paddingVertical:5}}
            />
            <Input 
              placeholder="Email"
              returnKeyType="next"
              value={email.value}
              errorMessage={email.error}
              onChangeText={text => setEmail({value: text, error: ""})}
              autoCapitalize="none"
              autoCompleteType="email"
              textContentType="emailAddress"
              keyboardType="email-address"
              inputContainerStyle= {styles.inputContainer}
              containerStyle= {styles.outerInputContainer}
              leftIcon={{ type:'font-awesome', name: 'envelope-o', size: 20}}
              leftIconContainerStyle={{marginRight: 10}}
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
              onChangeText={text => setPassword({value: text, error: ""})}
              leftIcon={{ type:'font-awesome', name: 'key', size: 20}}
              leftIconContainerStyle={{marginRight: 10}}
              errorStyle={{paddingVertical:5}}
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
