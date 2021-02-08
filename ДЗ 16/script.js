const USER_URL = 'https://api.github.com/users/';
const userInfoTemplate = document.querySelector('#userInfoTemplate');
const userContainer = document.querySelector('#userContainer');

class NotFoundError extends Error {}
class ServerError extends Error {}

document
    .querySelector('#searchForm')
    .addEventListener('submit', onSearchFormSubmit);

function onSearchFormSubmit(e) {
    e.preventDefault();
    const username = e.target.elements.searchInput.value;
    if (isUsernameValid(username)) {
        showUserInfo(username);
    } else {
        alert('Username is invalid');
    }
}

function isUsernameValid(username) {
    return !!username && username.length > 3;
}

function showUserInfo(username) {
    fetchUserData(username)
    .then(renderUserData)
    .catch(() => {});
}

function fetchUserData(username) {
    return fetch(USER_URL + username)
        .then((resp) => {
            if (resp.ok) {
                return resp.json();
            }

            if (resp.status > 500) {
                throw new ServerError('Server Error');
            }

            if (resp.status == 404) {
                throw new NotFoundError('User not found');
            }
        })
       .catch((err) => {
            if (err instanceof NotFoundError) {
                userContainer.innerHTML = err;
            } else if (err instanceof ServerError) {
                alert(err);
            }
            return Promise.reject();
        });
}

function renderUserData(user) {
    userContainer.innerHTML = userInfoTemplate
        .replace('{{name}}', user.name)
        .replace('{{login}}', user.login)
        .replace('{{html_url}}', user.html_url)
        .replace('{{avatar_url}}', user.avatar_url)
        .replace('{{public_repos}}', user.public_repos)
        .replace('{{followers}}', user.followers)
        .replace('{{registration}}', formDate(user.created_at));
}

function formatDate(created_at){
    const d = new Date(created_at);

    return `${d.getDate()}-${d.getMonth()}-${d.getFullerYear()}`;
}