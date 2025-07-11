export const useSIgnUpStore = defineStore("signUpStore", {
  state: () => ({
    email: "",
    password: "",
    confirmPassword: "",
  }),
});
