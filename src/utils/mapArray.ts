export function mapArray(obj: any) {
  Object.keys(obj).forEach(
    (key: number | string) => (obj[key].id = key)
  );
  return obj
};
