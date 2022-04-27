export function constantToMap<
  T extends Record<string, any>,
  K extends string = 'key'
>(sourceMap: T, key = 'key') {
  const obj = Object.keys(sourceMap).reduce((obj, name) => {
    const objKey = sourceMap[name][key];
    obj[objKey] = sourceMap[name];
    return obj;
  }, {} as { [P in T[keyof T][K]]: T[keyof T] });
  return Object.freeze(obj);
}

export function constantToList<T>(sourceMap) {
  return Object.freeze(Object.values<T[keyof T]>(sourceMap));
}

export function constantToKeyMap<
  T extends Record<string, any>,
  K extends string = 'key'
>(sourceMap: T, key = 'key') {
  const keyMap = Object.keys(sourceMap).reduce((map, name) => {
    map[name as keyof T] = sourceMap[name][key];
    return map;
  }, {} as { [P in keyof T]: T[P][K] });

  return Object.freeze(keyMap);
}