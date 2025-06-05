export const navLinks = {
  main: [
    { name: "home", icon: "material-symbols-light:home-rounded" },
    { name: "about", icon: "material-symbols-light:info" },
    { name: "contact", icon: "material-symbols-light:contacts-rounded" },
    { name: "profile", icon: "material-symbols-light:account-circle" },
  ],
  separator1: "Documentation",
  docs: [
    { name: "components", icon: "material-symbols:docs-outline-sharp" },
    { name: "tutorials", icon: "material-symbols:docs-outline-sharp" },
  ],
};

export const profileInputPlaceholders = {
  name: "Name",
  lastName: "Last Name",
  job: "Job",
  address: "about you",
  email: "input your email",
  phoneNumber: "phone number",
  profileStrength: "0",
};

export const bigNames = {
  appName: "Makise",
  mainLogPath: "/logos/m-logo.png",
};

export const ProfileRoutes = ["personal", "contact", "education", "skills", "family", "work"];
export const personalInformations = [
  { subtitle: "Name", placeholder: "Your Name", variableName: "fullname" },
  { subtitle: "Birthday", placeholder: "Your Birthday", variableName: "birthdayDate" },
  { subtitle: "Age", placeholder: "Your Age", variableName: "age" },
  { subtitle: "Blood Group", placeholder: "Your Blood Group", variableName: "bloodGroup" },
  { subtitle: "Marital Status", placeholder: "Your Marital Status", variableName: "mariageStatus" },
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

export const componentsLinks = [{ to: "/custom" }];
