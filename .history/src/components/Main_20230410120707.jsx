import React from 'react'
import { useState, useEffect } from "react";

import firebase from "../firebase"; 


export const Main = () => {

  const [name, setname] = useState({});
  const [name2, setname2] = useState({});
  const [name3, setname3] = useState({});
  const [name4, setname4] = useState({});

  useEffect(() => {
      const nameRef = firebase.database().ref("name");
      nameRef.on("value", (snapshot) => {
        const data = snapshot.val();
        setname(data);
      });
    }, []);

    useEffect(() => {
      const nameRef = firebase.database().ref("name");
      nameRef.on("value", (snapshot) => {
        const data = snapshot.val();
        setname2(data);
      });
    }, []);
    useEffect(() => {
      const nameRef = firebase.database().ref("name");
      nameRef.on("value", (snapshot) => {
        const data = snapshot.val();
        setname3(data);
      });
    }, []);
    useEffect(() => {
      const nameRef = firebase.database().ref("name");
      nameRef.on("value", (snapshot) => {
        const data = snapshot.val();
        setname4(data);
      });
    }, []);

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
    useEffect(() => {
      const balanceRef = firebase.database().ref("balance");
      balanceRef.on("value", (snapshot) => {
        const data = snapshot.val();
        setbalance2(data);
      });
    }, []);
    useEffect(() => {
      const balanceRef = firebase.database().ref("balance");
      balanceRef.on("value", (snapshot) => {
        const data = snapshot.val();
        setbalance3(data);
      });
    }, []);
    useEffect(() => {
      const balanceRef = firebase.database().ref("balance");
      balanceRef.on("value", (snapshot) => {
        const data = snapshot.val();
        setbalance4(data);
      });
    }, []);



  return (
    <div className='table'>
      <div className="cell">
       <p>{name.user1}</p>
       <hr />
       <p>{balance.user1}</p>
      </div>
      <div className="cell">
       <p>{name.user1}</p>
       <hr />
       <p>{balance.user1}</p>
      </div>
      <div className="cell">
       <p>{name.user1}</p>
       <hr />
       <p>{balance.user1}</p>
      </div>
      <div className="cell">
       <p>{name.user1}</p>
       <hr />
       <p>{balance.user1}</p>
      </div>
    </div>
  )
}

export default Main;