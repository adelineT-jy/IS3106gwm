const SERVER_PREFIX = "http://localhost:8080/Gwm-war/webresources";

const Api = {
    getUser(uId) {
        return fetch(`${SERVER_PREFIX}/users/${uId}`);
    },
    getUserFollowers(uId) {
        return fetch(`${SERVER_PREFIX}/users/${uId}/followers`);
    },
    getUserFollowings(uId) {
        return fetch(`${SERVER_PREFIX}/users/${uId}/following`);
    }
    
}

export default Api;