import React from 'react'
import { useState, useEffect } from "react";

import firebase from "../firebase"; 


export const Main = () => {

  const [name, setName] = useState({});
  const [balance, setBalance] = useState({});
  const [prevBalance, setPrevBalance] = useState(null);

  useEffect(() => {
    const nameRef = firebase.database().ref('name');
    nameRef.on('value', (snapshot) => {
      const data = snapshot.val();
      setName(data);
    });

    const balanceRef = firebase.database().ref('balance');
    balanceRef.on('value', (snapshot) => {
      const data = snapshot.val();
      setPrevBalance(balance.user1);
      setBalance(data);
    });
  }, []);

  useEffect(() => {
    if (prevBalance !== null && balance.user1 !== prevBalance) {
      const diff = balance.user1 - prevBalance;
      firebase.database().ref('balance').update({
        user1: balance.user1,
        change: diff,
      });
    }
  }, [balance]);
  return (
    <div className='table'>
      <div className="cell">
       <p>{name.user1}</p>
       <hr />
       <p>{balance.user1}</p>
       <hr />
       <p>{balance.user1}</p>
      </div>
      <div className="cell">1</div>
      <div className="cell">1</div>
      <div className="cell">1</div>
    </div>
  )
}

export default Main;