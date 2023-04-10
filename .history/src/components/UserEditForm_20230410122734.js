import React, { useState } from "react";
import firebase from "../firebase";

const UserEditForm = ({ userId, name, balance }) => {
  const [newName, setNewName] = useState(name);
  const [newBalance, setNewBalance] = useState(balance);

  const handleSubmit = (event) => {
    event.preventDefault();
    const balanceRef = firebase.database().ref("balance");
    balanceRef.update({ [userId]: newBalance });
    const nameRef = firebase.database().ref("name");
    nameRef.update({ [userId]: newName });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor={`name_${userId}`}>Name:</label>
      <input
        type="text"
        id={`name_${userId}`}
        value={newName}
        onChange={(e) => setNewName(e.target.value)}
      />
      <label htmlFor={`balance_${userId}`}>Balance:</label>
      <input
        type="number"
        id={`balance_${userId}`}
        value={newBalance}
        onChange={(e) => setNewBalance(Number(e.target.value))}
      />
      <button type="submit">Save</button>
    </form>
  );
};

export default UserEditForm;
