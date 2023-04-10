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

  return (
    <div className="table">
      {sortedBalances.map((entry) => (
        <div className="cell" key={entry[0]}>
          <p>{name[entry[0]]}</p>
          <hr />
          {editingUser === entry[0] ? (
            <div>
              <input
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
  );
};

export default Main;


