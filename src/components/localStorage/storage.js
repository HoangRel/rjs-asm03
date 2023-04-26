// save
export const saveToStorage = (key, value) =>
  localStorage.setItem(key, JSON.stringify(value));

// get
export const getFromStorage = (key, data) =>
  JSON.parse(localStorage.getItem(key)) || data;

// remove
export const removeFormStorage = (key) => localStorage.removeItem(key);
