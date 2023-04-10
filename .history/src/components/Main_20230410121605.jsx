import React, { useState, useEffect } from "react";
import firebase from "../firebase";

export const Main = () => {
  const [name, setName] = useState({});
  const [balance, setbalance] = useState({});
  const [balance2, setbalance2] = useState({});
  const [balance3, setbalance3] = useState({});
  const [balance4, setbalance4] = useState({});

  useEffect(() => {
    const balanceRef = firebase.database().ref("balance");
    balanceRef.on("value", (snapshot) => {
      const data = snapshot.val();
      setbalance(data);
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
    <div className='table'>
  <div className="cell">
    <p>{name.user1}</p>
    <hr />
    <p>{balance.user1}</p>
  </div>
  <div className="cell">
    <p>{name.user2}</p>
    <hr />
    <p>{balance.user2}</p>
  </div>
  <div className="cell">
    <p>{name.user3}</p>
    <hr />
    <p>{balance.user3}</p>
  </div>
  <div className="cell">
    <p>{name.user4}</p>
    <hr />
    <p>{balance.user4}</p>
  </div>
</div>

  );
};

export default Main;
