// In-memory store mapping a user id (real or guest) to their active match context.
const contextStore = new Map();

export function saveContextForUser(userId, context) {
  contextStore.set(userId, context);
}

export function getContextForUser(userId) {
  return contextStore.get(userId);
}

export function clearContextForUser(userId) {
  contextStore.delete(userId);
}
