import React, { useState } from "react";


const UserEditForm = ({ userId, name, balance, updateUserData }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [inputName, setInputName] = useState(name);
  const [inputBalance, setInputBalance] = useState(balance);

  const handleNameChange = (e) => {
    setInputName(e.target.value);
  };

  const handleBalanceChange = (e) => {
    setInputBalance(e.target.value);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
    updateUserData(userId, inputName, inputBalance);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  if (isEditing) {
    return (
      <UserInput
        user={userId}
        name={inputName}
        balance={inputBalance}
        onChange={(updatedUserId, updatedName, updatedBalance) => {
          setInputName(updatedName);
          setInputBalance(updatedBalance);
        }}
        onSave={handleSaveClick}
      />
    );
  }

  return (
    <div className="cell">
      <p>{name}</p>
      <hr />
      <p>{balance}</p>
      <button onClick={handleEditClick}>Edit</button>
    </div>
  );
};

export default UserEditForm;
