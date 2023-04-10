import React, { useState, useEffect } from "react";
import firebase from "../firebase";

export const UserFor4 = () => {
  const [newValues, setNewValues] = useState({});
  const [balance, setbalance] = useState(null);

  useEffect(() => {
    const user4Ref = firebase.database().ref("user4");
    user4Ref.on("value", (snapshot) => {
      const data = snapshot.val();
      setbalance(data);
    });
  }, []);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const user4Ref = firebase.database().ref("user4");
    const updates = {};
    Object.keys(newValues).forEach((key) => {
      if (newValues[key] !== "") {
        updates[key] = newValues[key];
      }
    });
    user4Ref.update(updates);
  };

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        {[1, 2, 3, 4].map((i) => (
          <div key={i}>
            <label>
              Price {i}:
              <input
                type="text"
                value={newValues[`user4${i}`] || balance?.[`user4${i}`] || ""}
                onChange={(e) =>
                  setNewValues({
                    ...newValues,
                    [`user4${i}`]: e.target.value,
                  })
                }
              />
            </label>
          </div>
        ))}
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default UserFor4;
