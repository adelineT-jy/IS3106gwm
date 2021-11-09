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
    },

    updateUserProfile(uId, data) {
        return fetch(`${SERVER_PREFIX}/users/${uId}`, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            method: "PUT",
            body: JSON.stringify(data),
        });
    }
    
}

export default Api;