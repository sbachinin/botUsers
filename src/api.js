const root = "http://localhost:3000";
const firstPageUrl = "/users?_page=1&_limit=5";

export default {
  getPage(url) {
    return fetch(root + (url || firstPageUrl)).then(handleErrors);
  },
  getUser(id) {
    return fetch(root + "/users/" + id).then(handleErrors);
  },
  updateUserName(user) {
    fetch(root + "/users/" + user.id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name: user.name, avatarUrl: user.avatarUrl })
    }).catch(err => console.log(err));
  }
};

function handleErrors(resp) {
  if (!resp.ok) {
    throw Error(resp.statusText);
  }
  return resp.json();
}
