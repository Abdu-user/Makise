export function makeChatId(userId: string, contactId: string) {
  return [userId, contactId].sort().join("_");
}
