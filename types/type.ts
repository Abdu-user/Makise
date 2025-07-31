export type UserProfileType = {
  name?: string;
  email: string;
  lastName?: string;
  isVerified?: boolean;
  phoneNumber?: string;
  username?: string;
  address?: string;
  profileStrength?: number;
  profileImage?: string;
  wideProfileImage?: string;
  previousProfileImageUrls?: string[];
  wideImageLocationSettingsJSON?: string;
  personalInformation?: string;
  IDProof?: string;
  FCMToken?: string[];
  contacts?: string[];
  lastOnline?: string;
  publicKey?: string;
  encryptedPrivateKey?: string;
  accountSalt?: string;
  iv?: string;
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

export type MessageType = {
  $id: string;
  chatId: string;
  senderId: string;
  receiverId: string;
  text: string;
  timestamp: string;
  status: "sent" | "sending" | "read" | "failed";
  replyTo?: string | null;
  media?: {
    type: "image" | "audio" | "video";
    url: string;
    thumbnailUrl?: string;
  } | null;
};
export type FCMTypes = "readMessageUpdate" | "pushNotification";
// {
//   "id": "msg_8723",
//   "chatId": "user123_user456",
//   "senderId": "user123",
//   "receiverId": "user456",
//   "text": "Hey! How are you?",
//   "timestamp": "2025-07-02T09:10:00Z",
//   "status": "delivered",  // or "sent", "read"
//   "replyTo": null,        // or the id of the message it's replying to
//   "media": null           // or object with image/audio/video
//}
// {//This is what Telegram shows on the chat list screen.
//   "chatId": "user123_user456",
//   "participants": ["user123", "user456"],
//   "lastMessage": {
//     "text": "Hey! How are you?",
//     "senderId": "user123",
//     "timestamp": "2025-07-02T09:10:00Z"
//   },
//   "unreadCount": 2,
//   "isMuted": false,
//   "pinned": false,
//   "chatType": "private"  // or "group", "channel"
// }
