import React, { useState, useEffect } from "react";
import firebase from "../firebase";

export const Main = () => {
  const [name, setName] = useState({});
  const [balance, setbalance] = useState({});
  const [editingUser, setEditingUser] = useState(null);
  const [targetDate, setTargetDate] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState({});
  const [timer, setTimer] = useState(null);

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
    const newTargetDate = new Date();
    newTargetDate.setDate(newTargetDate.getDate() + 6);
    newTargetDate.setHours(newTargetDate.getHours() + 8);
    newTargetDate.setMinutes(newTargetDate.getMinutes() + 15);
    setTargetDate(newTargetDate);
  }, []);

  useEffect(() => {
    if (targetDate) {
      const persistedTimer = JSON.parse(localStorage.getItem("timer"));
      if (persistedTimer) {
        setTimer(persistedTimer);
      } else {
        const newTimer = setInterval(() => {
          setTimeRemaining(calculateTimeRemaining(targetDate));
        }, 1000);
        setTimer(newTimer);
        localStorage.setItem("timer", newTimer);
      }
    }
  }, [targetDate]);

  useEffect(() => {
    return () => {
      clearInterval(timer);
      localStorage.removeItem("timer");
    };
  }, [timer]);

  function calculateTimeRemaining(targetDate) {
    const difference = +targetDate - +new Date();
    const timeRemaining = {};

    if (difference > 0) {
      timeRemaining.days = Math.floor(difference / (1000 * 60 * 60 * 24));
      timeRemaining.hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      timeRemaining.minutes = Math.floor((difference / 1000 / 60) % 60);
      timeRemaining.seconds = Math.floor((difference / 1000) % 60);
    } else {
      clearInterval(timer);
      timeRemaining.days = 0;
      timeRemaining.hours = 0;
      timeRemaining.minutes = 0;
      timeRemaining.seconds = 0;
    }

    return timeRemaining;
  }

  const handleEditClick = (user) => {
    setEditingUser(user);
  };

  const handleSaveClick = () => {
    setEditingUser(null);
  };

  const sortedBalances = Object.entries(balance).sort((a, b) => b[1] - a[1]);

  return (
    <div className="container">
      Марафон 2023 - Episode 1
      <p>
        {timeRemaining.days}д {timeRemaining.hours}ч {timeRemaining.minutes}м{" "}
        {timeRemaining.seconds}с
      </p>
    <div className="table">
      {sortedBalances.map((entry) => (
        <div className="cell" key={entry[0]}>
          <p >{name[entry[0]]}</p>
          <hr />
          {editingUser === entry[0] ? (
            <div>
              <input style={{width: "150px"}}
                type="text"
                value={balance[entry[0]]}
                onChange={(e) =>
                  firebase.database().ref(`balance/${entry[0]}`).set(e.target.value)
                }
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


