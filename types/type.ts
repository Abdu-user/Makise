export type UserProfileType = {
  name?: string;
  email: string;
  lastName?: string;
  isVerified?: boolean;
  phoneNumber?: string;
  job?: string;
  address?: string;
  profileStrength?: number;
  profileImage?: string;
  wideProfileImage?: string;
  previousProfileImageUrls?: string[];
  wideImageLocationSettingsJSON?: string;
  personalInformation?: string;
  IDProof?: string;
};

export type ImgLocation = "top" | "center" | "bottom" | "left" | "left-top" | "left-bottom" | "right" | "right-top" | "right-bottom";
export type WideImageLocationSettingsType = {
  wideImage: ImgLocation;
};

export type PersonalInfoType = {
  fullname: string;
  birthdayDate: string;
  age: string;
  bloodGroup: string;
  marriageStatus: string;
  gender: string;
  languages: string;
  region: string;
  nationality: string;
};
export type IDProofType = {
  atomics: string;
  pin: string;
  passport: string;
  drivingLicense: string;
};
