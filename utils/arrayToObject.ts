export function arrayToObject<T extends string | number | symbol, V = string>(keys: T[], defaultValue: V = "" as V): Record<T, V> {
  return keys.reduce(
    (obj, key) => {
      obj[key] = defaultValue;
      return obj;
    },
    {} as Record<T, V>
  );
}
