import React, { useState } from "react";
import ChatArea from "../../Components/ChatArea.jsx"; // Adjust the import path as needed
import "./styles.css";

const Dashboard = () => {
  const [isChatVisible, setIsChatVisible] = useState(false);

  const toggleChat = () => {
    setIsChatVisible(!isChatVisible);
  };

  return (
    <div className="app-background">
      <div className="app-container">
        {!isChatVisible && (
          <button className="chat-toggle-button" onClick={toggleChat}>
            <span role="img" aria-label="Chat Icon">
              💬
            </span>
          </button>
        )}
        {isChatVisible && <ChatArea onClose={() => setIsChatVisible(false)} />}
      </div>
    </div>
  );
};

export default Dashboard;
