import React from "react";

function UserHome(props) {
  return (
    <div>
      <div className="container-main">
        <div className="container-list-2 center-items container-item title general">
          <h1>{props.el.electionTitle}</h1>
          <br />
          <h3><center>{props.el.organizationTitle}</center></h3>
          <table style={{ marginTop: "10px" }}>
            <tr>
              <th>admin</th>
              <td>
                {props.el.adminName} ({props.el.adminTitle})
              </td>
            </tr>
            <tr></tr>
            <tr>
              <th>contact</th>
              <td style={{ textTransform: "none" }}>{props.el.adminEmail}</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  );
}

export default UserHome;
