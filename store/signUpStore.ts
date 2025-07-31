export const useSIgnUpStore = defineStore("signUpStore", {
  state: () => ({
    email: "",
    password: "",
    confirmPassword: "",
  }),
  actions: {
    resetSignUpState() {
      this.email = "";
      this.password = "";
      this.confirmPassword = "";
    },
  },
});
