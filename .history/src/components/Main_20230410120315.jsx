import React, { useState, useEffect } from 'react';
import firebase from '../firebase';

const Main = () => {
  const [name, setName] = useState({});
  const [balance, setBalance] = useState({});
  const [lastBalance, setLastBalance] = useState(0);
  const [newBalance, setNewBalance] = useState('');

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
      setLastBalance(data.user1);
    });
  }, []);

  const handleBalanceChange = (e) => {
    const value = e.target.value;
    const diff = value - balance.user1;
    const newLastBalance = value;

    firebase.database().ref('balance').update({
      user1: value,
      lastBalance: lastBalance + diff
    });

    setBalance({
      ...balance,
      user1: value
    });
    setLastBalance(newLastBalance);
  };

  const handleBalanceUpdate = () => {
    const balanceRef = firebase.database().ref('balance');
    balanceRef.update({
      user1: parseInt(newBalance),
      lastBalance: balance.user1,
    });
    setNewBalance('');
  };

  return (
    <div className="table">
      <div className="cell">
        <p>{name.user1}</p>
        <hr />
        <p>{balance.user1}</p>
        <hr />
        <p>
          {lastBalance !== 0 &&
            (lastBalance > balance.user1 ? '-' : '+') +
              Math.abs(lastBalance - balance.user1)}
        </p>
      </div>
      <div className="cell">
        <input
          type="number"
          value={newBalance}
          onChange={(e) => setNewBalance(e.target.value)}
          style={{ width: '100%' }}
        />
        <button onClick={handleBalanceUpdate}>Update Balance</button>
      </div>
    </div>
  );
};

export default Main;



