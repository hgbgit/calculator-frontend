const constants = {
  calculatorApi: {
    baseUrl: `${process.env.NEXT_PUBLIC_CALCULATOR_API}/api`,
    signIn: function () {
      return `${this.baseUrl}/auth/signin`;
    },
    signUp: function () {
      return `${this.baseUrl}/auth/signup`;
    },
    calculation: function () {
      return `${this.baseUrl}/calculation`;
    },
    records: function () {
      return `${this.baseUrl}/records`;
    },
  },
  routes: {
    HOME: "/",
    SIGN_IN: "/sign-in",
    SIGN_UP: "/sign-up",
    SIGN_OUT: "/sign-out",
    OPERATION: "/operation",
    USER_RECORDS: "/user-records",
    publicRoutes: function () {
      return [this.SIGN_IN, this.SIGN_UP];
    },
  },
};

export { constants };
