import React from 'react'
import { useState, useEffect } from "react";
import firebase from "../firebase";





export const UserFor4 = () => {
  const [user4, setuser4] = useState(null);
  const [newValues, setNewValues] = useState({});
  const [balance, setbalance] = useState(null);

  useEffect(() => {
    const user4Ref = firebase.database().ref("user4");
    user4Ref.on("value", (snapshot) => {
      const data = snapshot.val();
      setuser4(data);
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

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const storageRef = firebase.storage().ref();

    const imageRef = storageRef.child(`images/${file.name}`);
    imageRef.put(file).then(() => {
      console.log("Изображение успешно загружено!");
      imageRef.getDownloadURL().then((url) => {
        setNewValues({
          ...newValues,
          imageUrl: url,
        });
      });
    });
  };
  

  return (
    <>
    <div style={{ backgroundColor: "#c4d3f6" }}>
      <span
        style={{
          marginLeft: "100px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "25px",
          position: "relative",
          top: "20px",
        }}
      >
      </span>
      <div className="container-edit">
        <form
          style={{
            marginTop: "50px",
            borderRadius: " 14px",
            backgroundColor: "white",
            padding: "50px 0px",
          }}
          onSubmit={handleFormSubmit}
        >
          {[4].map((i) => (
            <div key={i}>
              <label style={{ margin: "0px 50px" }}>
                Вид недвижимости:
                <input
  className="input-edit"
  style={{ margin: "20px 10px" }}
  type="text"
  value={newValues["user4" + i] || balance?.["user4" + i] || ""}
  onChange={(e) =>
    setNewValues({
      ...newValues,
      ["user4" + i]: e.target.value,
    })
  }
/>

              </label>
            </div>  
          ))}
            <button type='submit' style={{margin: "50px 60px", cursor: "pointer", padding: "10px"}}>Сохранить</button>
            </form>
            </div>
            </div>
        
            </>
  )
}
export default UserFor4;