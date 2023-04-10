import React, { useState, useEffect } from 'react';
import firebase from '../firebase';

export const Main = () => {
  const [name, setName] = useState({});
  const [balance, setBalance] = useState({});
  const [lastBalance, setLastBalance] = useState(null);

  useEffect(() => {
    const nameRef = firebase.database().ref('name');
    nameRef.on('value', (snapshot) => {
      const data = snapshot.val();
      setName(data);
    });

    const balanceRef = firebase.database().ref('balance');
    balanceRef.on('value', (snapshot) => {
      const data = snapshot.val();
      setBalance(data);
      if (data && data.user1 !== undefined) {
        setLastBalance(data.user1);
      }
    });
  }, []);

  const handleChange = (event) => {
    const newValue = Number(event.target.value);
    const balanceRef = firebase.database().ref("balance/user1");
    balanceRef.transaction((currentBalance) => {
      const lastBalanceRef = firebase.database().ref("lastBalance");
      lastBalanceRef.once("value", (snapshot) => {
        const lastBalance = snapshot.val();
        const diff = newValue - (currentBalance || 0);
        lastBalanceRef.set(diff);
        return newValue;
      });
    });
  };
  

  return (
    <div className='table'>
      <div className='cell'>
        <p>{name.user1}</p>
        <hr />
        <p>{balance.user1}</p>
<hr />
<p>{balance.lastBalance >= 0 ? '+' : '-'}{Math.abs(balance.lastBalance)}</p>

        <hr />
       
      </div>
      <div className='cell'>1</div>
      <div className='cell'>1</div>
      <div className='cell'>1</div>
    </div>
  );
};

export default Main;
