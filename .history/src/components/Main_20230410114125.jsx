import React, { useState, useEffect } from 'react';
import firebase from '../firebase';

const Main = () => {
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
      setLastBalance(data.lastBalance);
      setBalance(data);
    });
  }, []);

  const lastChange = lastBalance !== null ? balance.user1 - lastBalance : '';

  useEffect(() => {
    if (lastBalance !== null && balance.user1 !== lastBalance) {
      firebase.database().ref('balance').update({
        user1: balance.user1,
        lastBalance: lastBalance,
      });
      setLastBalance(balance.user1);
    }
  }, [balance]);

  useEffect(() => {
    if (lastBalance !== null && balance.user1 !== lastBalance) {
      firebase.database().ref('balance').update({
        user1: balance.user1,
        lastBalance: lastBalance || balance.user1,
      });
      setLastBalance(balance.user1);
    }
  }, [balance, lastBalance]);
  

  return (
    <div className='table'>
      <div className='cell'>
        <p>{name.user1}</p>
        <hr />
        <p>{balance.user1}</p>
        <hr />
        <p>{lastChange}</p>
      </div>
      <div className='cell'>1</div>
      <div className='cell'>1</div>
      <div className='cell'>1</div>
    </div>
  );
};

export default Main;
