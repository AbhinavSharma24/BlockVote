import React from "react";

const AdminOnly = (props) => {
  return (
    <div className="container-item attention" style={{ borderColor: "#1a1a1a" }}>
      <center>
        <div style={{ margin: "17px" }}>
          <h1>{props.page}</h1>
        </div>
        <p>Admin access only.</p>
      </center>
    </div>
  );
};

export default AdminOnly;
