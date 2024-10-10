import React, { useContext, useState } from "react";
import "./Main.css";
import { assets } from "../../assets/assets";
import { Context } from "../../context/context";
function Main() {
  //const {onSent,recentPrompt,showresult,loading,resultData,setInput,input} = useState(Context);
  const pro = useContext(Context);
  const rd = pro.resultData;
  return (
    <>
      <div className="main">
        <div className="nav">
          <p>Gemini</p>
          <img src={assets.user_icon} alt="user" />
        </div>

        <div className="main-container">
          {!pro.showresult ? (
            <>
              <div className="greet">
                <p>
                  <span>Hello sir,</span>
                </p>
                <p>How can I help you today?</p>
              </div>
              <div className="cards">
                <div className="card">
                  <p>Suggest me a beautiful place for my trip.</p>
                  <img src={assets.compass_icon} alt="com" />
                </div>
                <div className="card">
                  <p>Teach me angular as a teacher.</p>
                  <img src={assets.bulb_icon} alt="com" />
                </div>
                <div className="card">
                  <p>Take my interview because I have an interview tommorow</p>
                  <img src={assets.message_icon} alt="com" />
                </div>
                <div className="card">
                  <p>Read these codes and explain it to me.</p>
                  <img src={assets.code_icon} alt="com" />
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="result">
                <div className="result-title">
                  <img src={assets.user_icon} alt="" />
                  <p>{pro.recentPrompt}</p>
                </div>
                <div className="result-data">
                  <img src={assets.gemini_icon} alt="" />
                  {pro.loading ? (
                    <div className="loader">
                      <hr />
                      <hr />
                      <hr />
                    </div>
                  ) : (
                    <p dangerouslySetInnerHTML={{ __html: rd }}></p>
                  )}
                </div>
              </div>
            </>
          )}
          <div className="main-bottom">
            <div className="search-box">
              <input
                type="text"
                placeholder="Enter a promt here"
                onChange={(e) => {
                  pro.setInput(e.target.value);
                }}
                value={pro.input}
              />
              <div>
                <img src={assets.gallery_icon} alt="" />
                <img src={assets.mic_icon} alt="" />
                {pro.input ? (<img
                  onClick={() => {
                    pro.onSent();
                  }}
                  src={assets.send_icon}
                  alt=""
                />): null}
              </div>
            </div>
            <p className="bottom-info">
              Gemini may display inaccurate info, including about people, so
              double-check its responses. Your privicy and gemini app.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Main;
