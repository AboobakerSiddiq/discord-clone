import React from "react";
import "./Chat.css";
import ChatHeader from "./ChatHeader";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import CradGiftcardIcon from "@material-ui/icons/CardGiftcard";
import GifIcon from "@material-ui/icons/Gif";
import EmojiEmoticonsIcon from "@material-ui/icons/EmojiEmotions";
import Message from "./Message";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useEffect, useRef } from "react";
import axios from "./axios";
import Pusher from "pusher-js";

const pusher = new Pusher("d2929c2ae735191a3e08", {
  cluster: "ap2",
})
const Chat = () => {
  const user = useSelector((state)=>state.discord.user);
  const channelId = useSelector((state)=>state.channel.channelId);
  const channelName = useSelector((state)=>state.channel.channelName);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  ;
  const getConversation = (channelId) => {
    if (channelId) {
      axios.get(`/get/conversation?id=${channelId}`).then((res) => {
        setMessages(res.data);
      });
    }
  };
  useEffect(() => {
    getConversation(channelId);

    const channel=pusher.subscribe('conversation');
    channel.bind('newMessage',function(data){
      getConversation(channelId)
    })
  }, [channelId]);
  const timestamp = Date.now();
  const time = new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(timestamp);
  const sendMessage = (e) => {
    e.preventDefault();

    axios.post(`/new/message?id=${channelId}`, {
      message: input,
      timestamp: time,
      user: user,
    });
    setInput("");
  };
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    return messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(scrollToBottom, [input]);

  return (
    <div className="chat">
      <ChatHeader channelName={channelName} />

      <div className="chat__messages">
        {messages.map((message) =>
          message.conversation.map((convo) => (
            <Message
              timestamp={convo.timestamp}
              user={convo.user}
              message={convo.message}
            />
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="chat__input">
        <AddCircleIcon fontSize="large" />
        <form>
          <input
            type="text"
            disabled={!channelId}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message"
          />
          <button
            className="chat__inputButton"
            onClick={sendMessage}
            disabled={!channelId}
            type="submit"
          >
            Send Message
          </button>
        </form>

        <div className="chat__inputIcon">
          <CradGiftcardIcon fontSize="large" />
          <GifIcon fontSize="large" />
          <EmojiEmoticonsIcon fontSize="large" />
        </div>
      </div>
    </div>
  );
};

export default Chat;
