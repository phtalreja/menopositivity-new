export type RootStackParamList = {
  Root: undefined;
  NotFound: undefined;
  AuthLoading: undefined;
  Auth: undefined;
};

export type AuthStackParamList = {
  Login: undefined;
  Signup: undefined;
}

export type BottomTabParamList = {
  Home: undefined;
  Entries: undefined;
  Calendar: undefined;
  Options: undefined;
};

export type TabOneParamList = {
  HomeScreen: undefined;
};

export type TabTwoParamList = {
  EntriesScreen: undefined;
};

export type TabThreeParamList = {
  CalendarScreen: undefined;
};

export type TabFourParamList = {
  OptionsScreen: undefined;
};

export type LoginParamList = {
  LoginScreen: undefined;
};

export type AuthDetails = {
  email: string,
  password: string
}

export type User = {
  email: string,
}
