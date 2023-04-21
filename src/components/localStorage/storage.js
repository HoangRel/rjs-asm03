// add
export const saveToStorage = (key, value) =>
  localStorage.setItem(key, JSON.stringify(value));

// get
export const getFormStorage = (key) =>
  JSON.parse(localStorage.getItem(key)) || [];

// remove
export const removeFormStorage = (key) => localStorage.removeItem(key);
