import React from "react";
import EditForm from "./EditForm";

const EditPage = ({ userId, name, balance }) => {
  return (
    <div>
      <h1>Edit User Details</h1>
      <EditForm userId={userId} name={name} balance={balance} />
    </div>
  );
};

export default EditPage;
