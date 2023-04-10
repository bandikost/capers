import React, { useState, useEffect } from "react";
import firebase from "../firebase";
import UserInput from "./UserInput";

export const Main = () => {
  const [name, setName] = useState({});
  const [balance, setbalance] = useState({});

  useEffect(() => {
    const balanceRef = firebase.database().ref("balance");
    balanceRef.on("value", (snapshot) => {
      const data = snapshot.val();
      setbalance(data);
    });

    const nameRef = firebase.database().ref("name");
    nameRef.on("value", (snapshot) => {
      const data = snapshot.val();
      setName(data);
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
      <div className="cell">
        <p>{name.user1}</p>
        <hr />
        <UserInput userId="user1" name={name.user1} balance={balance.user1} />
      </div>
      <div className="cell">
        <p>{name.user2}</p>
        <hr />
        <UserInput userId="user2" name={name.user2} balance={balance.user2} />
      </div>
      <div className="cell">
        <p>{name.user3}</p>
        <hr />
      </div>
      <div className="cell">
        <p>{name.user4}</p>
        <hr /> 
        </div>
        </div>
        
  )
}
  export default Main;


