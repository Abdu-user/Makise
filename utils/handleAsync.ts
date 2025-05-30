// utils/handleAsync.ts
export async function handleAsync<T>(promise: Promise<T>): Promise<[T | null, any]> {
  try {
    const data = await promise;
    return [data, null];
  } catch (error) {
    console.error(error);
    return [null, error];
  }
}
