import { Ionicons } from '@expo/vector-icons';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import * as React from 'react';
import firebase from 'firebase';
import { User } from '@firebase/auth-types';

export default function useCachedResources() {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);
  const [user, setUser] = React.useState<User | null>(null);

  // Load any resources or data that we need prior to rendering the app
  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHideAsync();
        // Load firebase User
        await new Promise((resolve)=>{
          firebase.auth().onAuthStateChanged(user => {
            if (user) {
              // get User data if logged in
              console.log('user is logged in')
              setUser(user);
            }
            resolve() 
          });
        })

        // Load fonts
        await Font.loadAsync({
          ...Ionicons.font,
          'space-mono': require('../assets/fonts/SpaceMono-Regular.ttf'),
        });
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hideAsync();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  return {
    isLoadingComplete: isLoadingComplete,
    user: user,
    setUser: setUser
  };
}
