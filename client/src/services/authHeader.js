export default function authHeader() {
  const user = JSON.parse(localStorage.getItem('currentUser'));

  if (user) {
    return { Authorization: user };
  }
  return {};
}
