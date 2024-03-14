// ChatArea.js

import React, { useState, useRef, useEffect } from "react";
import "./styles.css";
import Axios from "axios";
import { Input, Button, Spin } from "antd";
import SentIcon from "../Assets/sent.jsx";
import axios from "axios";
import ReportModal from "./modals/reports.jsx";
import { InfoCircleOutlined } from '@ant-design/icons';

const ChatArea = (props) => {
  const [messages, setMessages] = useState([
    {
      text: "Hi, How can I help you today?",
      isUser: false,
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(true);
  const [showModal, setShowModal] = useState(false)
  const [reportData, setReportData] = useState({})
  const chatContainerRef = useRef(null);
  const chatArrayRef = useRef([]);

  useEffect(() => {
    // Scroll to the bottom when messages change
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }

    localStorage.setItem("messages", JSON.stringify(messages));
  }, [messages]);

  const handleSendMessage = async () => {
    setLoading(true);
    setInputValue("");
    if (inputValue.trim() !== "") {
      const userMessage = { text: inputValue, isUser: true };
      setMessages([...messages, userMessage]);
      messages.push(userMessage);
      const body = {
        human_say: inputValue,
        conversation_history: chatArrayRef.current,
      };

      const response = await Axios.post("http://127.0.0.1:4000/api/query", body);
      const backendReply = { text: response?.data?.data, isUser: false };
      setMessages([...messages, backendReply]);
      let chat = {
        'human': inputValue,
        'ai': response?.data?.data
      }
      chatArrayRef.current = [...chatArrayRef.current, chat];
      setLoading(false);
      //simulateTypingEffect(backendReply);
    }
  };

  const gotoReports = async() => {
    // window.location.href = "/reports";
    let body = {
      "conversation_history":chatArrayRef.current
    }
    const response = await axios.post('http://127.0.0.1:4000/api/insights', body)
    if (response) {
      setReportData(response?.data?.data)
      setShowModal(true)
    }
  };

  // const simulateTypingEffect = (message) => {
  //   setMessages((prevMessages) => [...prevMessages, message]);

  //   if (!message?.isUser) {
  //     const originalText = message?.text;
  //     let index = 0;

  //     const typingInterval = setInterval(() => {
  //       setMessages((prevMessages) => {
  //         const updatedMessages = [...prevMessages];
  //         updatedMessages[prevMessages?.length - 1].text =
  //           originalText.substring(0, index + 1);
  //         return updatedMessages;
  //       });

  //       index += 1;

  //       if (index === originalText?.length) {
  //         clearInterval(typingInterval);
  //       }
  //     }, 30); // Adjust the interval as needed
  //   }
  // };

  return (
    <div className="chat-wrapper">
      <div className="header">
        <h2>Isuzu Chat</h2>
        <div className="header-button">
        <button onClick={gotoReports} className="menu-button">
          <InfoCircleOutlined/>
        </button>
        {show && <button
          onClick={() => setShow((prev) => !prev)}
          className="minimize-button"
        >
          &#8212;
        </button>}
        {!show && <button onClick={() => setShow((prev) => !prev)} className="maximize-button">
          □
        </button>}
        <button onClick={() => props.onClose()} className="close-button">
          ✖
          </button>
          </div>
      </div>
      {show && (
        <div className={`chat-container ${!show ? 'minimized' : ''}`} ref={chatContainerRef}>
          {messages.map((message, index) => (
            <div
              key={index}
              className={`message-bubble ${
                message.isUser ? "user" : "backend"
              }`}
            >
              <span className="timestamp">
                {formatTimestamp(message.timestamp)}
              </span>

              <span>{message.text}</span>
            </div>
          ))}
        </div>
      )}
      {show && (
        <div className="input-container">
          <div className="input-wrapper">
            <Input
              type="text"
              className="input-field"
              disabled={loading}
              placeholder={loading ? "Typing..." : "Type a message..."}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              style={{
                backgroundColor: loading ? "rgba(255, 255, 255, 0.8)" : "#fff",
              }}
              suffix={
                !loading ? (
                  <Button
                    shape="circle"
                    className="send-button"
                    disabled={loading ? true : false}
                    onClick={handleSendMessage}
                    icon={<SentIcon/>}
                  ></Button>
                ) : (
                  <Spin />
                )
              }
            />
            {/* <button className="send-button" onClick={handleSendMessage}>
            Send
          </button> */}
          </div>
        </div>
      )}
      {showModal && <ReportModal onClose={() => setShowModal(false)} data={reportData} />}
    </div>
  );
};

const formatTimestamp = (timestamp) => {
  const options = { hour: "numeric", minute: "numeric" };
  return new Intl.DateTimeFormat("en-US", options).format(timestamp);
};

export default ChatArea;
