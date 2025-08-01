export type ContactType = {
  username: string;
  profileImage: string;
  id: string;
  name: string;
  lastName: string;
  lastOnline: string;
  publicKey?: string;
};

export type NotificationType = {
  senderUsername: string;
  body: string;
  title: string;
  link: string;
  time: string;
  messageId: string;
};
export type AddContactResultsType = {
  success: boolean;
  message: string;
  contactFound: boolean;
  contactAddedToTheUser?: boolean;
  userAddedToContact?: boolean;
  contactId: string;
  contact?: ContactType;
};
