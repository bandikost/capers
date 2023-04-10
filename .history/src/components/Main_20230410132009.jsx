import React, { useState, useEffect } from "react";
import firebase from "../firebase";
import EditForm from "./EditForm";

const Main = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const nameRef = firebase.database().ref("name");
      const balanceRef = firebase.database().ref("balance");

      const nameSnapshot = await nameRef.once("value");
      const nameData = nameSnapshot.val();

      const balanceSnapshot = await balanceRef.once("value");
      const balanceData = balanceSnapshot.val();

      const mergedData = Object.entries(nameData).map(([key, value]) => ({
        id: key,
        name: value,
        balance: balanceData[key],
      }));

      setData(mergedData);
    };

    fetchData();
  }, []);

  return (
    <div>
      {data.map((item) => (
        <div key={item.id}>
          <p>{item.name}</p>
          <p>{item.balance}</p>
          <EditForm
            userId={item.id}
            name={item.name}
            balance={item.balance}
          />
        </div>
      ))}
    </div>
  );
};

export default Main;

