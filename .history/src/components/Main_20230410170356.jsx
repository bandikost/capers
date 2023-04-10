import React, { useState, useEffect } from "react";
import firebase from "../firebase";
import crown from "./images/pngegg.png"

const Main = () => {
  const [name, setName] = useState({});
  const [balance, setbalance] = useState({});
  const [editingUser, setEditingUser] = useState(null);
  const [targetDate, setTargetDate] = useState(new Date("2023-04-16T21:00:00.000Z"));
  const [timeRemaining, setTimeRemaining] = useState({});
  const [prevBalance, setPrevBalance] = useState({});

  useEffect(() => {
    const balanceRef = firebase.database().ref("balance");
    balanceRef.on("value", (snapshot) => {
      const data = snapshot.val();
      setbalance(data);
    });
  }, []);

  useEffect(() => {
    const nameRef = firebase.database().ref("name");
    nameRef.on("value", (snapshot) => {
      const data = snapshot.val();
      setName(data);
    });
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining(targetDate));
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  function calculateTimeRemaining(targetDate) {
    const difference = +targetDate - +new Date();
    const timeRemaining = {};

    if (difference > 0) {
      timeRemaining.days = Math.floor(difference / (1000 * 60 * 60 * 24));
      timeRemaining.hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      timeRemaining.minutes = Math.floor((difference / 1000 / 60) % 60);
      timeRemaining.seconds = Math.floor((difference / 1000) % 60);
    } else {
      timeRemaining.days = 0;
      timeRemaining.hours = 0;
      timeRemaining.minutes = 0;
      timeRemaining.seconds = 0;
    }

    return timeRemaining;
  }

  const handleEditClick = (user) => {
    setEditingUser(user);
    setPrevBalance(balance[user]); // store previous balance value
  };

  const handleSaveClick = (user, newBalance) => {
    setEditingUser(null);
    const diff = newBalance - prevBalance;
    setPrevBalance({}); // reset previous balance value
    const updatedBalance = { ...balance };
    updatedBalance[user] = { value: newBalance, diff: diff };
    setbalance(updatedBalance);
    firebase.database().ref(`balance/${user}`).set(newBalance);
  };
  

  const sortedBalances = Object.entries(balance).sort((a, b) => b[1] - a[1]);
  return (
    <div className="container">
      Марафон 2023 - Сезон 1
      <p>
       Успей залутать все, у тебя еще есть: <span style={{color: "wheat", textDecoration: "underline"}}>
       {timeRemaining.days}д {timeRemaining.hours}ч {timeRemaining.minutes}м{" "}
        {timeRemaining.seconds}с
        </span>
      </p>
      <img src={crown} alt="logo" className="logo" />
      <table>
        <thead>
          <tr>
            <th>Участник</th>
            <th>Баланс</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {sortedBalances.map(([user, balance]) => (
            <tr key={user}>
              <td>{name[user]}</td>
              {editingUser === user ? (
                <td>
                  <input
                    type="number"
                    value={balance}
                    onChange={(e) => setbalance({ ...balance, [user]: +e.target.value })}
                  />
                </td>
              ) : (
                <td>{balance} рублей</td>
              )}
              <td>
                {editingUser === user ? (
                  <button onClick={() => handleSaveClick(user, balance)}>Сохранить</button>
                ) : (
                  <button onClick={() => handleEditClick(user)}>Изменить</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
  
};

export default Main;


