export function setStorage(user, token) {
  localStorage.setItem("user", user);
  localStorage.setItem("token", token);
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
