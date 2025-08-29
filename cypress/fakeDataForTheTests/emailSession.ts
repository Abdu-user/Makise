export default {
  userId: "unique-user-id",
  email: "please replace this email",
  name: "Test User",
  $id: "session-id",
  $createdAt: new Date().toISOString(),
  provider: "email",
  expire: Math.floor(Date.now() / 1000) + 3600,
};
