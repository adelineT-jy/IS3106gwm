// import { SystemSecurityUpdate } from "@mui/icons-material";

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
    },

    getUserExperiences(uId) {
        return fetch(`${SERVER_PREFIX}/users/${uId}/exp`);
    },

    editUserExperiences(uId, data) {
        return fetch(`${SERVER_PREFIX}/users/${uId}/exp`,{
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            method: "PUT",
            body: JSON.stringify(data),
        });
    },

    deleteUserExperience(uId, expId) {
        return fetch(`${SERVER_PREFIX}/users/${uId}/exp/${expId}`, {
            method: "DELETE",
        });
    },

    addUserExperience(uId, gId, data) {
        return fetch(`${SERVER_PREFIX}/users/${uId}/games/${gId}/exp`, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            method: "POST",
            crossDomain: true,
            body: JSON.stringify(data),
        });
    },
    
    deleteCard(uId, cId) {
        console.log("delete card" + cId);
        return fetch(`${SERVER_PREFIX}/users/${uId}/cards/${cId}`, {
            method: "DELETE",
        });
    },

    addCard(uId, data) {
        return fetch(`${SERVER_PREFIX}/users/${uId}/cards/`, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify(data),
            crossDomain: true,
        });
    },

    addFollowing(uId, followId) {
        return fetch(`${SERVER_PREFIX}/users/${uId}/following/${followId}`, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            method: "POST",
            crossDomain: true,
        });
    },

    unfollow(uId, followId) {
        return fetch(`${SERVER_PREFIX}/users/${uId}/following/${followId}`, {
            method: "DELETE",
            crossDomain: true,
        });
    },

    topupWallet(uId, amount) {
        return fetch(`${SERVER_PREFIX}/users/${uId}/wallet/${amount}`, {
            method: "POST",
            crossDomain: true,
        });
    },


    //GAMES
    getAllGames() {
        return fetch(`${SERVER_PREFIX}/admin/game`);
    }
    // const addCard = () => {
    //   const card = {
    //     cardNum: cardNumber,
    //     name: name,
    //     cvv: cvv,
    //     expDate: expiryDate,
    //   };
    //   const requestOptions = {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify(card),
    //     crossDomain: true,
    //   };
    //   fetch(`http://localhost:8080/Gwm-war/webresources/users/${uId}/cards`, {
    //     requestOptions,
    //   })
    //     .then((response) => response.json())
    //     .then((tempUser) => {
    //       setUser(tempUser);
    //     });
    // };
  
    // const deleteCard = () => {
    //   const requestOptions = {
    //     method: "DELETE",
    //     crossDomain: true,
    //   };
    //   fetch(
    //     `http://localhost:8080/Gwm-war/webresources/users/${uId}/cards/${cId}`,
    //     {
    //       requestOptions,
    //     }
    //   )
    //     .then((response) => response.json())
    //     .then((tempUser) => {
    //       setUser(tempUser);
    //     });
    // };
  
    
    // const getParties = () => {
    //   fetch(`http://localhost:8080/Gwm-war/webresources/users/${uId}/party`)
    //     .then((response) => response.json())
    //     .then((tempParties) => setParties(tempParties));
    // };
  
}

export default Api;