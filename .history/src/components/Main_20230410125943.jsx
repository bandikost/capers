import React, { useState, useEffect } from "react";
import firebase from "../firebase";
import UserInput from "./UserInput";

const Main = () => {
  const [name, setName] = useState({});
  const [balance, setBalance] = useState({});

  useEffect(() => {
    const balanceRef = firebase.database().ref("balance");
    balanceRef.on("value", (snapshot) => {
      const data = snapshot.val();
      setBalance(data);
    });

    const nameRef = firebase.database().ref("name");
    nameRef.on("value", (snapshot) => {
      const data = snapshot.val();
      setName(data);
    });
  }, []);

  const handleUpdateUserData = (userId, updatedName, updatedBalance) => {
    firebase.database().ref("name").update({ [userId]: updatedName });
    firebase.database().ref("balance").update({ [userId]: updatedBalance });
  };

  const getHighestBalanceUser = () => {
    const users = Object.keys(balance);
    let highestBalance = -Infinity;
    let highestBalanceUser = "";
    users.forEach((user) => {
      if (balance[user] > highestBalance) {
        highestBalance = balance[user];
        highestBalanceUser = user;
      }
    });
    return highestBalanceUser;
  };

  return (
    <div className="table">
      <div className="cell">
        <p>{name.user1}</p>
        <hr />
        <p>{balance.user1}</p>
        <button onClick={() => {setIsEditing1(!isEditing1)}}>Edit</button>
        {isEditing1 ? (
          <UserInput
            user="user1"
            name={name.user1}
            balance={balance.user1}
            updateUserData={handleUpdateUserData}
          />
        ) : null}
      </div>
      <div className="cell">
        <p>{name.user2}</p>
        <hr />
        <p>{balance.user2}</p>
        <button onClick={() => {setIsEditing2(!isEditing2)}}>Edit</button>
        {isEditing2 ? (
          <UserInput
            user="user2"
            name={name.user2}
            balance={balance.user2}
            updateUserData={handleUpdateUserData}
          />
        ) : null}
      </div>
      <div className="cell">
        <p>{name.user3}</p>
        <hr />
        <p>{balance.user3}</p>
        <button onClick={() => {setIsEditing3(!isEditing3)}}>Edit</button>
        {isEditing3 ? (
          <UserInput
            user="user3"
            name={name.user3}
            balance={balance.user3}
            updateUserData={handleUpdateUserData}
          />
        ) : null}
      </div>
      <div className="cell">
        <p>{name.user4}</p>
        <hr />
        <p>{balance.user4}</p>
        <button onClick={() => {setIsEditing4(!isEditing4)}}>Edit</button>
        {isEditing4 ? (
          <UserInput
            user="user4"
            name={name.user4}
            balance={balance.user4}
            updateUserData={handleUpdateUserData}
          />
        ) : null}
      </div>
    </div>
  );
};

export default Main;


