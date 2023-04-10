import React from 'react'
import { useState, useEffect } from "react";
import firebase from "../../firebase";
import "../modules/Sale.css"
import HeaderEdit from './Header-edit';
import "firebase/storage";

import 'firebase/compat/storage';



export const UserFor1 = () => {
  const [user1, setuser1] = useState(null);
  const [newValues, setNewValues] = useState({});

  useEffect(() => {
    const user1Ref = firebase.database().ref("user1");
    user1Ref.on("value", (snapshot) => {
      const data = snapshot.val();
      setuser1(data);
    });
  }, []);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const user1Ref = firebase.database().ref("user1");
    const updates = {};
    Object.keys(newValues).forEach((key) => {
      if (newValues[key] !== "") {
        updates[key] = newValues[key];
      }
    });
    user1Ref.update(updates);
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
    <div style={{ backgroundColor: "#c4d3f6"}}>
    <HeaderEdit />
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
          {[1].map((i) => (
            <div key={i}>
              <label style={{ margin: "0px 50px" }}>
                Вид недвижимости:
                <input
  className="input-edit"
  style={{ margin: "20px 10px" }}
  type="text"
  value={newValues["cart" + i] || user1?.["cart" + i] || ""}
  onChange={(e) =>
    setNewValues({
      ...newValues,
      ["cart" + i]: e.target.value,
    })
  }
/>




              </label>
              <label>
                Адрес:  
                <input
  className="input-edit"
  style={{ margin: "20px 10px" }}
  type="text"
  value={newValues["address" + i] || user1?.["address" + i] || ""}
  onChange={(e) =>
    setNewValues({
      ...newValues,
      ["address" + i]: e.target.value,
    })
  }
/>

              </label>
              <label>
                  Площадь:                  
                <input className='input-edit'
                  style={{ margin: "20px 10px" }}
                  type="text"
                  value={newValues["square" + i] || user1?.["square" + i] || ""}
                  onChange={(e) =>
                    setNewValues({
                      ...newValues,
                      ["square" + i]: e.target.value,
                    })
                  }
                />
              </label>
              <label htmlFor="file">
                <div className="image-container">
                  <input  type="file" onChange={handleImageUpload} />
                  <p>Текущее изображение для объекта карточки:</p> {user1 && user1.imageUrl && (
                    <img src={user1.imageUrl} alt="property" />
                  )}
                  
                </div>
              </label> 
            </div>  
          ))}
            <button type='submit' style={{margin: "50px 60px", cursor: "pointer", padding: "10px"}}>Сохранить</button>
            </form>
            </div>
            </div>
            </div>
            </>
  )
}
export default UserFor1;