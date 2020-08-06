import * as Linking from 'expo-linking';

export default {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      Root: {
        screens: {
          TabOne: {
            screens: {
              HomeScreen: 'home',
            },
          },
          TabTwo: {
            screens: {
              EntriesScreen: 'entries',
            },
          },
          TabThree: {
            screens: {
              CalendarScreen: 'calendar',
            },
          },
          TabFour: {
            screens: {
              OptionsScreen: 'options',
            },
          },
        },
      },
      NotFound: '*',
    },
  },
};
