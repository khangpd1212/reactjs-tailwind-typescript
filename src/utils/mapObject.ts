export function mapObject(obj: any) {
  Object.keys(obj).forEach(
    (key: number | string) => (obj[key].id = key)
  );
  return obj
};
