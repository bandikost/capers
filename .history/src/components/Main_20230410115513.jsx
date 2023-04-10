import React, { useState, useEffect } from "react";
import firebase from "../firebase";

export const Main = () => {
  const [name, setName] = useState("");
  const [balance, setBalance] = useState(0);
  const [lastBalance, setLastBalance] = useState(0);

  useEffect(() => {
    const nameRef = firebase.database().ref("name/user1");
    nameRef.on("value", (snapshot) => {
      setName(snapshot.val());
    });
  }, []);

  useEffect(() => {
    const balanceRef = firebase.database().ref("balance/user1");
    balanceRef.on("value", (snapshot) => {
      const currentBalance = Number(snapshot.val());
      const lastBalanceRef = firebase.database().ref("balance/lastBalance");
      lastBalanceRef.once("value", (snapshot) => {
        const lastBalance = Number(snapshot.val());
        setLastBalance(lastBalance);
        setBalance(currentBalance);
      });
    });
  }, []);

  const handleChange = (event) => {
    const newValue = Number(event.target.value);
    const balanceRef = firebase.database().ref("balance/user1");
    balanceRef.transaction((currentBalance) => {
      const lastBalanceRef = firebase.database().ref("balance/lastBalance");
      lastBalanceRef.once("value", (snapshot) => {
        const lastBalance = snapshot.val();
        const diff = newValue - (currentBalance || 0);
        lastBalanceRef.set(diff);
        return newValue;
      });
    });
  };

  return (
    <div className="table">
      <div className="cell">
        <p>{name}</p>
        <hr />
        <p>{balance}</p>
        <hr />
        <p>
          {lastBalance > 0 ? "+" : ""}
          {lastBalance}
        </p>
      </div>
      <div className="cell">
        <input type="number" onChange={handleChange} />
      </div>
      <div className="cell">1</div>
      <div className="cell">1</div>
    </div>
  );
};

export default Main;

