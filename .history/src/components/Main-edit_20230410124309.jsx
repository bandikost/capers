import React, { useState, useEffect } from "react";
import firebase from "../firebase";
import UserEditForm from "./UserEditForm";

export const MainEdit = () => {
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

  const updateUserData = (userId, updatedName, updatedBalance) => {
    firebase.database().ref("name/" + userId).set(updatedName);
    firebase.database().ref("balance/" + userId).set(updatedBalance);
  };

  return (
    <div>
      <div className="cell">
        <p>{name.user1}</p>
        <hr />
        <UserEditForm
          userId="user1"
          name={name.user1}
          balance={balance.user1}
          updateUserData={updateUserData}
        />
        <p>
          {balance.user1}
          <span style={{ marginLeft: "5px" }}>₽</span>
        </p>
      </div>

      <UserEditForm
        userId="user2"
        name={name.user2}
        balance={balance.user2}
        updateUserData={updateUserData}
      />
      <UserEditForm
        userId="user3"
        name={name.user3}
        balance={balance.user3}
        updateUserData={updateUserData}
      />
      <UserEditForm
        userId="user4"
        name={name.user4}
        balance={balance.user4}
        updateUserData={updateUserData}
      />
    </div>
  );
};

export default MainEdit;
