import { AtomEffect } from 'recoil';

export const localStorageEffect = <T>(key: string): AtomEffect<T> => ({
  setSelf,
  onSet,
}) => {
  const savedValue = localStorage.getItem(key);
  if (savedValue != null) {
    setSelf(JSON.parse(savedValue));
  }

  onSet((newValue) => {
    if (Object.keys(newValue).length === 0) {
      localStorage.removeItem(key);
    } else {
      localStorage.setItem(key, JSON.stringify(newValue));
    }
  });
};
