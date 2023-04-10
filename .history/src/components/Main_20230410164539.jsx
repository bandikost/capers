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
       Успей залутать все, у тебя еще есть: <span style={{color: "wheat", textDecoration: "underline"}}>
       {timeRemaining.days}д {timeRemaining.hours}ч {timeRemaining.minutes}м{" "}
        {timeRemaining.seconds}с
        </span>
      </p>
      <img src={crown}  style={{display: "flex", width:"100px", margin: "0 auto 0", padding: "0"}} />     
    <div className="table">
      {sortedBalances.map((entry, index) => (
        <div className="cell" key={entry[0]} data-number={index + 1}>
          <p >{name[entry[0]]}</p>
          <hr />
          {editingUser === entry[0] ? (
            <div>



             <input style={{width: "150px"}}
              type="text"
              value={balance[entry[0]]}
              onChange={(e) => {
              const oldValue = balance[entry[0]];
              const newValue = e.target.value;
              firebase.database().ref(balance/${entry[0]}).set(newValue);
              setbalance({...balance, [entry[0]]: newValue});
              const diff = newValue - oldValue;
              const sign = diff >= 0 ? "+" : "-";
              const absDiff = Math.abs(diff);
              const message = ${sign}${absDiff};
              const balanceChange = document.getElementById(balanceChange-${entry[0]});
              balanceChange.innerText = message;
              balanceChange.style.display = "flex";
              }}
              />
              <button onClick={handleSaveClick}>сохранить</button>



            </div>
          ) : (
            <div>
              <p>{entry[1]}<span style={{marginLeft: "5px"}}>₽</span></p>
              <button onClick={() => handleEditClick(entry[0])} className="button" style={{cursor: "pointer"}}>ред.</button>
            </div>
          )}
        </div>
      ))}
    </div>
    </div>
  );
};

export default Main;


