export function setStorage(account, user, role, token) {
  localStorage.setItem("account", account);
  localStorage.setItem("user", user);
  localStorage.setItem("role", role);
  localStorage.setItem("token", token);
}

export function setAvatarLink(link) {
  localStorage.setItem("link", link);
}
export function getStorageAvatarLink() {
  return localStorage.getItem("link");
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

export function getStorageRole() {
  return localStorage.getItem("role");
}

export function clearStorage() {
  return localStorage.clear();
}
