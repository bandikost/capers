import React, { useState } from "react";
import firebase from "../firebase";

const EditForm = ({ userId, name, balance }) => {
  const [inputName, setInputName] = useState(name);
  const [inputBalance, setInputBalance] = useState(balance);

  const handleNameChange = (e) => {
    setInputName(e.target.value);
  };

  const handleBalanceChange = (e) => {
    setInputBalance(e.target.value);
  };

  const handleSave = () => {
    const balanceRef = firebase.database().ref("balance");
    balanceRef.update({
      [userId]: inputBalance
    });

    const nameRef = firebase.database().ref("name");
    nameRef.update({
      [userId]: inputName
    });
  };

  return (
    <div>
      <button onClick={() => {}}>Edit</button>
      <div>
        <input type="text" value={inputName} onChange={handleNameChange} />
      </div>
      <div>
        <input type="number" value={inputBalance} onChange={handleBalanceChange} />
      </div>
      <button onClick={handleSave}>Save</button>
    </div>
  );
};

export default EditForm;
