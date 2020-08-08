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
  TabOne: undefined;
  TabTwo: undefined;
};

export type TabOneParamList = {
  TabOneScreen: undefined;
};

export type TabTwoParamList = {
  TabTwoScreen: undefined;
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
