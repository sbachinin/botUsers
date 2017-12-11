import React from "react";
import { Link } from "react-router-dom";

export default function UserList(props) {
  return (
    <div>
      {props.users.map(u => (
        <Link to={"/" + u.id} className="userItem" key={u.id}>
          <img src={u.avatarUrl} alt="" />
          {u.name}
        </Link>
      ))}
      {["previous", "next"].map(i => {
        return (
          <a
            key={i}
            className={`pageSwitch ${props[i + "PageUrl"] ? "active" : null}`}
            onClick={props.switchPage.bind(null, i)}
          >
            {i}
          </a>
        );
      })}
    </div>
  );
}

UserList.defaultProps = {
  users: []
};
