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
  
    // const getUserFollowing = () => {
    //   fetch(`http://localhost:8080/Gwm-war/webresources/users/${uId}/following`)
    //     .then((response) => response.json())
    //     .then((follow) => setFollowing(follow));
    // };
    
    // const getParties = () => {
    //   fetch(`http://localhost:8080/Gwm-war/webresources/users/${uId}/party`)
    //     .then((response) => response.json())
    //     .then((tempParties) => setParties(tempParties));
    // };
  
}

export default Api;