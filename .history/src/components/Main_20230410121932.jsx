import React, { useState, useEffect } from "react";
import firebase from "../firebase";

export const Main = () => {
  const [name, setName] = useState({});
  const [balance, setBalance] = useState({});
  const [highestBalanceUser, setHighestBalanceUser] = useState("");

  useEffect(() => {
    const balanceRef = firebase.database().ref("balance");
    balanceRef.on("value", (snapshot) => {
      const data = snapshot.val();
      setBalance(data);
    });
  }, []);

  useEffect(() => {
    const users = Object.keys(balance);
    let highestBalance = -Infinity;
    let highestBalanceUser = "";
    users.forEach((user) => {
      if (balance[user] > highestBalance) {
        highestBalance = balance[user];
        highestBalanceUser = user;
      }
    });
    setHighestBalanceUser(highestBalanceUser);
  }, [balance]);

  return (
    <div className="table">
      <div className={`cell ${highestBalanceUser === "user1" ? "highest" : ""}`}>
        <p>{name.user1}</p>
        <hr />
        <p>{balance.user1}</p>
      </div>
      <div className={`cell ${highestBalanceUser === "user2" ? "highest" : ""}`}>
        <p>{name.user2}</p>
        <hr />
        <p>{balance.user2}</p>
      </div>
      <div className={`cell ${highestBalanceUser === "user3" ? "highest" : ""}`}>
        <p>{name.user3}</p>
        <hr />
        <p>{balance.user3}</p>
      </div>
      <div className={`cell ${highestBalanceUser === "user4" ? "highest" : ""}`}>
        <p>{name.user4}</p>
        <hr />
        <p>{balance.user4}</p>
      </div>
    </div>
  );
};

export default Main;
