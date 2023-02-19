export default function authHeader() {
  const user = JSON.parse(localStorage.getItem('currentUser'));

    if (user) {
      //console.log(user)
      return {
          Authorization: user
      };
  }
  return {};
}
