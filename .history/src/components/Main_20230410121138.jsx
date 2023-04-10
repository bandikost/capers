import React, { useState, useEffect } from "react";
import firebase from "../firebase";

export const Main = () => {
  const [name, setName] = useState({});
  const [balance, setBalance] = useState({});

  useEffect(() => {
    const nameRef = firebase.database().ref("name");
    nameRef.on("value", (snapshot) => {
      setName(snapshot.val());
    });

    const balanceRef = firebase.database().ref("balance");
    balanceRef.on("value", (snapshot) => {
      setBalance(snapshot.val());
    });
  }, []);

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
      <div className={`cell ${getHighestBalanceUser() === "user1" ? "highest-balance" : ""}`}>
        <p>{name.user1}</p>
        <hr />
        <p>{balance.user1}</p>
      </div>
      <div className={`cell ${getHighestBalanceUser() === "user2" ? "highest-balance" : ""}`}>
        <p>{name.user2}</p>
        <hr />
        <p>{balance.user2}</p>
      </div>
      <div className={`cell ${getHighestBalanceUser() === "user3" ? "highest-balance" : ""}`}>
        <p>{name.user3}</p>
        <hr />
        <p>{balance.user3}</p>
      </div>
      <div className={`cell ${getHighestBalanceUser() === "user4" ? "highest-balance" : ""}`}>
        <p>{name.user4}</p>
        <hr />
        <p>{balance.user4}</p>
      </div>
    </div>
  );
};

export default Main;
