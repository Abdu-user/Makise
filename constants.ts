import type { ImgLocation, UserProfileType } from "./types/type";

export const SCREENS = {
  md: 768,
};

export const navLinks = {
  main: [
    { name: "home", icon: "material-symbols-light:home-rounded" },
    { name: "about", icon: "material-symbols-light:info" },
    { name: "contacts", icon: "material-symbols-light:contacts-rounded" },
    { name: "profile", icon: "material-symbols-light:account-circle" },
  ],
  separator1: "Documentation",
  docs: [
    { name: "components", icon: "material-symbols:docs-outline-sharp" },
    { name: "tutorials", icon: "material-symbols:docs-outline-sharp" },
  ],
};

export const profileInputPlaceholders: UserProfileType = {
  name: "Name",
  lastName: "Last Name",
  username: "Username",
  address: "about you",
  email: "input your email",
  phoneNumber: "phone number",
  profileStrength: 0,
};

export const bigNames = {
  appName: "Makise",
  mainLogPath: "/logos/m-logo.png",
};

export const ProfileRoutes = ["personal", "contact", "education", "skills", "account", "work"];
export const personalInformations = [
  { subtitle: "Name", placeholder: "Your Name", variableName: "fullname" },
  { subtitle: "Birthday", placeholder: "Your Birthday", variableName: "birthdayDate" },
  { subtitle: "Age", placeholder: "Your Age", variableName: "age" },
  { subtitle: "Blood Group", placeholder: "Your Blood Group", variableName: "bloodGroup" },
  { subtitle: "Marital Status", placeholder: "Your Marital Status", variableName: "marriageStatus" },
  { subtitle: "Gender", placeholder: "Your Gender", variableName: "gender" },
  { subtitle: "Languages", placeholder: "Languages You Speak", variableName: "languages" },
  { subtitle: "Region", placeholder: "Your Region", variableName: "region" },
  { subtitle: "Nationality", placeholder: "Your Nationality", variableName: "nationality" },
];

export const IDProofs = [
  { subtitle: "Atomics", placeholder: "Your Atomics ID", variableName: "atomics" },
  { subtitle: "PIN", placeholder: "Your Personal Identification Number", variableName: "pin" },
  { subtitle: "Passport", placeholder: "Your Passport Number", variableName: "passport" },
  { subtitle: "Driving License", placeholder: "Your Driving License Number", variableName: "drivingLicense" },
];
export const componentsLinks = [
  { to: "/custom-button", name: "Button" },
  { to: "/custom-input", name: "Input" },
  { to: "/custom-label", name: "Label" },
  // { to: "/custom-heads", name: "Heads" },
  // { to: "/custom-container", name: "Container" },
  // { to: "/custom-nuxt-link", name: "NuxtLink" },
  // { to: "/custom-paragraph", name: "Paragraph" },
  // { to: "/custom-password-input", name: "PasswordInput" },
  // { to: "/custom-transition", name: "Transition" },
];

export const positionOptions: ImgLocation[] = ["top", "center", "bottom"];

export const homeHashLinks = ["Home", "Messaging", "Skills"];
export const smallUsersInfo = ["3500+", "30M+", "100+"];

export const footerLinks = [
  {
    name: "fl.usefulLinks",
    links: ["fl.content", "fl.howItWorks", "fl.create", "fl.explore", "fl.termsAndServices"],
  },
  {
    name: "fl.community",
    links: ["fl.helpCenter", "fl.partners", "fl.suggestions", "fl.blog", "fl.newsletters"],
  },
  {
    name: "fl.partner",
    links: ["fl.ourPartner", "fl.becomeAPartner"],
  },
];
