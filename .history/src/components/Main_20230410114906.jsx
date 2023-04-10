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

  const handleBalanceChange = (event) => {
    const newBalance = parseInt(event.target.value);
    const balanceRef = firebase.database().ref('balance/user1');
    balanceRef.set(newBalance);
    const change = newBalance - lastBalance;
    const lastBalanceRef = firebase.database().ref('balance/lastBalance');
    lastBalanceRef.set(lastBalance !== null ? lastBalance : newBalance);
    setLastBalance(newBalance);
  };

  return (
    <div className='table'>
      <div className='cell'>
        <p>{name.user1}</p>
        <hr />
        <p>
          {balance.user1 !== undefined ? balance.user1 : 'loading...'}
        </p>
        <hr />
        <p>{lastBalance !== null ? lastBalance : 'loading...'}</p>
        <hr />
        <p>{lastBalance !== null ? lastBalance - balance.user1 : 'loading...'}</p>
        <hr />
       
      </div>
      <div className='cell'>1</div>
      <div className='cell'>1</div>
      <div className='cell'>1</div>
    </div>
  );
};

export default Main;
