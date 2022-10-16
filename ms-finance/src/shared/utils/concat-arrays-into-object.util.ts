const concatArraysIntoObject = (
  array1: unknown[],
  array2: unknown[],
): { [key: string]: any } => {
  const resultObj: { [key: string]: any } = {};
  array1.forEach((el, index) => (resultObj[`${el}`] = array2[index]));
  return resultObj;
};

export { concatArraysIntoObject };
