export type UserProfileType = {
  name?: string;
  email: string;
  lastName?: string;
  isVerifyed?: boolean;
  phoneNumber?: string;
  job?: string;
  address?: string;
  profileStrength?: number;
  profileImage?: string;
  wideProfileImage?: string;
  previousProfileImageUrls?: string[];
  wideImageLocationSettingsJSON?: string;
};

export type ImgLocation = "top" | "center" | "bottom" | "left" | "left-top" | "left-bottom" | "right" | "right-top" | "right-bottom";
export type WideImageLocationSettingsType = {
  wideImage: ImgLocation;
};
