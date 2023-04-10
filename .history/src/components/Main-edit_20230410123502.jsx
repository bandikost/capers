import React, { useState, useEffect } from "react";
import firebase from "../firebase";
import UserEditForm from "./UserEditForm";

export const MainEdit = () => {
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
    <div>
        <UserEditForm userId="user1" name={name.user1} balance={balance.user1} />
        <UserEditForm userId="user2" name={name.user2} balance={balance.user2} />
        <UserEditForm userId="user3" name={name.user3} balance={balance.user3} />
        <UserEditForm userId="user4" name={name.user4} balance={balance.user4} />
    </div>
  )
}

export default MainEdit;