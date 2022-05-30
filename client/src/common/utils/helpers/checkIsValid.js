export const isEmail = (value) => /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+\.[a-z]{2,6}$/i.test(value);
export const isPassword = (value) => /(?=.*[0-9])(?=.*[a-z])[0-9a-z]{8,}/ig.test(value);
export const isEmpty = (value) => value.trim() !== '';
export const notCheck = (value) => true;
export const isNumber = (value) => Number.isInteger(parseInt(value));

export const check = (type, value) => {
  const checks = {
    isEmail,
    isPassword,
    isEmpty,
    isNumber,
    notCheck
  };

  return checks[type](value);
};

