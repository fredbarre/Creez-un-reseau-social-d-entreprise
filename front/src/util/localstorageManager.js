export function setStorage(account, user, token) {
  localStorage.setItem("account", account);
  localStorage.setItem("user", user);
  localStorage.setItem("token", token);
}

export function getStorageAccount() {
  return localStorage.getItem("account");
}
export function getStorageUser() {
  return localStorage.getItem("user");
}
export function getStorageToken() {
  return localStorage.getItem("token");
}

export function clearStorage() {
  return localStorage.clear();
}
