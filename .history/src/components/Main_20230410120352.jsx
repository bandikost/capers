import React from 'react'
import { useState, useEffect } from "react";

import firebase from "../firebase"; 


export const Main = () => {

  const [name, setname] = useState({});

  useEffect(() => {
      const nameRef = firebase.database().ref("name");
      nameRef.on("value", (snapshot) => {
        const data = snapshot.val();
        setname(data);
      });
    }, []);

    const [balance, setbalance] = useState({});

  useEffect(() => {
      const balanceRef = firebase.database().ref("balance");
      balanceRef.on("value", (snapshot) => {
        const data = snapshot.val();
        setbalance(data);
      });
    }, []);

  return (
    <div className='table'>
      <div className="cell">
       <p>{name.user1}</p>
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