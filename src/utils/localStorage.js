const LocalStorage = () => {};

const setLocalStorage = (user) => {
  window.localStorage.setItem("user", JSON.stringify(user));
};
const getLocalStorage = () => {
  const result = localStorage.getItem("user");
  let user = result ? JSON.parse(result) : "";
  return user;
};
const removeLocalStorage = () => {
  localStorage.removeItem("user");
};

export { setLocalStorage, getLocalStorage, removeLocalStorage };
