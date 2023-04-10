import React, { useState, useEffect } from "react";
import firebase from "../firebase";
import crown from "./images/pngegg.png"

export const Main = () => {
  const [name, setName] = useState({});
  const [balance, setbalance] = useState({});
  const [editingUser, setEditingUser] = useState(null);
  const [targetDate, setTargetDate] = useState(new Date("2023-04-16T21:00:00.000Z"));
  const [timeRemaining, setTimeRemaining] = useState({});
  const [previousValue, setPreviousValue] = useState(null);

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

  const handleEditClick = (user, value) => {
    setPreviousValue(value);
    setEditingUser(user);
  };

  const handleSaveClick = () => {
    setEditingUser(null);
    setPreviousValue(null);
  };

  const sortedBalances = Object.entries(balance).sort((a, b) => b[1] - a[1]);

  return (
    <div className="container">
      Марафон 2023 - Сезон 1
      <p>
        Успей залутать все, у тебя еще есть: 
        <span style={{ color: "wheat", textDecoration: "underline" }}>
          {timeRemaining.days}д {timeRemaining.hours}ч {timeRemaining.minutes}м{" "}
          {timeRemaining.seconds}с
        </span>
      </p>
      <img src={crown} alt="Crown" />
      <table>
        <thead>
          <tr>
            <th>Участник</th>
            <th>Баланс</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {sortedBalances.map(([user, balance]) => (
            <tr key={user}>
              <td>{name[user]}</td>
              <td>
                {editingUser === user ? (
                  <input
                    type="number"
                    value={balance}
                    onChange={(e) => setbalance({ ...balance, [user]: e.target.value })}
                    onBlur={() => handleSaveClick(user, balance)}
                  />
                ) : (
                  <span onDoubleClick={() => handleEditClick(user)}>{balance}</span>
                )}
              </td>
              <td>{diff[user] ? diff[user] : ""}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
  
};

export default Main;


