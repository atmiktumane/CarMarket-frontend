// Save Data in Local Storage
const setLocalStorageItem = (key: string, value: any) => {
  localStorage.setItem(key, JSON.stringify(value));
};

// Get Data
const getLocalStorageItem = (key: string) => {
  return JSON.parse(localStorage.getItem(key) as string);
};

// Remove single data
const removeLocalStorageItem = (key: string) => {
  localStorage.removeItem(key);
};

// Clear all items
const clearAllLocalStorageItems = () => {
  localStorage.clear();
};

export {
  setLocalStorageItem,
  getLocalStorageItem,
  removeLocalStorageItem,
  clearAllLocalStorageItems,
};
