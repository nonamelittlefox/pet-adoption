/**
 * Function clean Object if object has value  is [undefined, ''] -> delete key
 * @param {Object} obj
 * @returns
 */
export function cleanObject(obj) {
  if (!obj) {
    return {};
  }

  for (const propName in obj) {
    if (
      obj[propName] === undefined ||
      obj[propName] === '' ||
      obj[propName] === null
    ) {
      delete obj[propName];
    }
  }

  return obj;
}
