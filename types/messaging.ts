export type ContactType = {
  username: string;
  profileImage: string;
  id: string;
  name: string;
  lastName: string;
  lastOnline: string;
};

export type NotificationType = {
  senderUsername: string;
  body: string;
  title: string;
  link: string;
  time: string;
  messageId: string;
};
