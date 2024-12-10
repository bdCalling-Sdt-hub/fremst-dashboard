export const setToLocalStorage = (key: any, value: any) => {
    if (!key && typeof window === "undefined") {
      return;
    }
    return localStorage.setItem(key, value);
  };
  
  export const getFromLocalStorage = (key: any) => {
    if (!key && typeof window === "undefined") {
      return;
    }
    return localStorage.getItem(key);
  };