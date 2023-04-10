import React from "react";
import { Link } from "react-router-dom";
import EditPage from "./EditPage";

const UserPage = ({ userId, name, balance }) => {
  return (
    <div>
      <h1>User Details</h1>
      <p>Name: {name}</p>
      <p>Balance: {balance}</p>
      <Link to={`/edit/${userId}`}>Edit User</Link>
    </div>
  );
};

export default UserPage;
