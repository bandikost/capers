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
  }, []);

  const sortedBalances = Object.entries(balance).sort((a, b) => b[1] - a[1]);
  
  return (
    <div className="table">
      {sortedBalances.map((entry) => (
        <div className="cell" key={entry[0]}>
          <p>{name[entry[0]]}</p>
          <hr />
          <p>{entry[1]}</p>
        </div>
      ))}
    </div>
  );
};

export default Main;

