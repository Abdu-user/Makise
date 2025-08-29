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

// Now store translation keys for subtitles and placeholders
export const personalInformations = [
  { subtitleKey: "personalInfo.fullnameSubtitle", placeholderKey: "personalInfo.fullnamePlaceholder", variableName: "fullname" },
  { subtitleKey: "personalInfo.birthdaySubtitle", placeholderKey: "personalInfo.birthdayPlaceholder", variableName: "birthdayDate" },
  { subtitleKey: "personalInfo.ageSubtitle", placeholderKey: "personalInfo.agePlaceholder", variableName: "age" },
  { subtitleKey: "personalInfo.bloodGroupSubtitle", placeholderKey: "personalInfo.bloodGroupPlaceholder", variableName: "bloodGroup" },
  {
    subtitleKey: "personalInfo.maritalStatusSubtitle",
    placeholderKey: "personalInfo.maritalStatusPlaceholder",
    variableName: "marriageStatus",
  },
  { subtitleKey: "personalInfo.genderSubtitle", placeholderKey: "personalInfo.genderPlaceholder", variableName: "gender" },
  { subtitleKey: "personalInfo.languagesSubtitle", placeholderKey: "personalInfo.languagesPlaceholder", variableName: "languages" },
  { subtitleKey: "personalInfo.regionSubtitle", placeholderKey: "personalInfo.regionPlaceholder", variableName: "region" },
  { subtitleKey: "personalInfo.nationalitySubtitle", placeholderKey: "personalInfo.nationalityPlaceholder", variableName: "nationality" },
];

export const IDProofs = [
  { subtitleKey: "idProof.atomicsSubtitle", placeholderKey: "idProof.atomicsPlaceholder", variableName: "atomics" },
  { subtitleKey: "idProof.pinSubtitle", placeholderKey: "idProof.pinPlaceholder", variableName: "pin" },
  { subtitleKey: "idProof.passportSubtitle", placeholderKey: "idProof.passportPlaceholder", variableName: "passport" },
  { subtitleKey: "idProof.drivingLicenseSubtitle", placeholderKey: "idProof.drivingLicensePlaceholder", variableName: "drivingLicense" },
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
export const pcMobile = [
  { text: "pc" as "pc", name: "material-symbols:computer" },
  { text: "mobile" as "mobile", name: "material-symbols:smartphone" },
];
