import React, { useContext, useState } from "react";
import "./sidebar.css";
import { assets } from "../../assets/assets";
import { Context } from "../../context/context";

function Sidebar() {
  const [collapse, setcollapse] = useState(false);
  const pro = useContext(Context);

  const loadPrompt = async (prompt) => {
    pro.setrecentPrompt(prompt);
    await pro.onSent(prompt);
  };

  return (
    <>
      <div className="sidebar">
        <div className="top">
          <img
            src={assets.menu_icon}
            alt="menu"
            className="menu"
            onClick={() => setcollapse(!collapse)}
          />
          <div
            className="new-chat"
            onClick={() => {
              pro.setLoading(false);
              pro.setShowResult(false);
            }}
          >
            <img src={assets.plus_icon} alt="add" />
            {collapse && <p>New Chat</p>}
          </div>
          {collapse ? (
            <div className="recent">
              <p className="recent-title">Recent</p>
              {pro.prevprompts.map((item, index) => {
                return (
                  <>
                    <div
                      onClick={() => {
                        loadPrompt(item);
                      }}
                      className="recent-entry"
                    >
                      <img src={assets.message_icon} alt="msg" />
                      <p key={index}>{item.slice(0, 18)}...</p>
                    </div>
                  </>
                );
              })}
            </div>
          ) : null}
        </div>
        <div className="bottom">
          <div className="bottom-item recent-entry">
            <img src={assets.question_icon} alt="q" />
            {collapse && <p>Help</p>}
          </div>
          <div className="bottom-item recent-entry">
            <img src={assets.history_icon} alt="q" />
            {collapse && <p>Activities</p>}
          </div>
          <div className="bottom-item recent-entry">
            <img src={assets.setting_icon} alt="q" />
            {collapse && <p>Settings</p>}
          </div>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
