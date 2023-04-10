import React, { useState, useEffect } from "react";
import firebase from "../firebase";


export const Main = () => {
  const [name, setName] = useState({});
  const [balance, setbalance] = useState({});
  const [editingUser, setEditingUser] = useState(null);

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

  const sortedBalances = Object.entries(balance).sort((a, b) => b[1] - a[1]);

  const handleEditClick = (user) => {
    setEditingUser(user);
  }

  const handleSaveClick = () => {
    setEditingUser(null);
  }

  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + 6);
  targetDate.setHours(targetDate.getHours() + 8);
  targetDate.setMinutes(targetDate.getMinutes() + 15);
  const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining(targetDate));

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
      clearInterval();
      timeRemaining.days = 0;
      timeRemaining.hours = 0;
      timeRemaining.minutes = 0;
      timeRemaining.seconds = 0;
    }

    return timeRemaining;
  }

  return (
<div className="container">
<p>
        {timeRemaining.days}d {timeRemaining.hours}h {timeRemaining.minutes}m {timeRemaining.seconds}s
      </p>
    <div className="table">
      {sortedBalances.map((entry) => (
        <div className="cell" key={entry[0]}>
          <p>{name[entry[0]]}</p>
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
              <button onClick={() => handleEditClick(entry[0])} className="button">ред.</button>
            </div>
          )}
        </div>
      ))}
    </div>
    </div>
  );
};

export default Main;


