import React, { useState, useEffect } from "react";
import firebase from "../firebase";


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
        
        <p>{balance.user1}<span style={{marginLeft: "5px"}}>₽</span></p>
      </div>
      <div className="cell">
        <p>{name.user2}</p>
        <hr />
        <p>{balance.user2}<span style={{marginLeft: "5px"}}>₽</span></p>
      </div>
      <div className="cell">
        <p>{name.user3}</p>
        <hr />
        <p>{balance.user3}<span style={{marginLeft: "5px"}}>₽</span></p>
      </div>
      <div className="cell">
        <p>{name.user4}</p>
        <hr />
        <p>{balance.user4}<span style={{marginLeft: "5px"}}>₽</span></p>
       
        </div>
        </div>
        
  )
}
  export default Main;


