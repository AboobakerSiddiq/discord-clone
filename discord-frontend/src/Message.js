import { Avatar } from "@material-ui/core";
import React from "react";
import "./Message.css";

const Message = ({ timestamp, user, message }) => {
  // const Message = ({ message }) => {

  // console.log(message)

  return (
    <div className="message">
      <Avatar src={user.photo} />
      <div className="message__info">
        <h4 style={{ fontSize: "13px", fontWeight: "500", color: "gray" }}>
          {user.displayName}
          <span className="message__timestamp">{timestamp}</span>
        </h4>

        <p>{message}</p>
      </div>
    </div>
  );
};

export default Message;
