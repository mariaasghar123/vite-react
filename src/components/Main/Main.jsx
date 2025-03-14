import React, { useContext } from 'react'
import "./main.css";
import { assets } from '../../assets/assets';
import { Context } from '../context/Context';
const Main = () => {
  const { input,
    setInput,
    recentPrompt,
   
    prevPrompt,
    
    showResults,
   
    loading,
   
    results,
    
    onSent}= useContext(Context);
  return (
    <div className='main'>
      <div className="nav">
        <p>Gemini</p>
        <img src={assets.user_icon} alt="" />
      </div>
      <div className="mian_container">
        {!showResults ? <>
          <div className="greet">
          <p><span>Hello, Dev</span></p>
          <p>How can I help you?</p>
        </div>
        <div className="cards">
          <div className="card">
            <p>Please suggest beautiful places for trip</p>
            <img src={assets.compass_icon} alt="" />
          </div>
          <div className="card">
            <p>Summarize this concept. urban planing</p>
            <img src={assets.bulb_icon} alt="" />
          </div>
          <div className="card">
            <p>Brainstorm team bonding ativites for our work</p>
            <img src={assets.message_icon} alt="" />
          </div>
          <div className="card">
            <p>Improve the readability of the following code</p>
            <img src={assets.code_icon} alt="" />
          </div>
        </div>
        </> : <div className="result">
          <div className="result-title">
            <img src={assets.user_icon} alt="" />
            <p>{recentPrompt}</p>
          </div>
          <div className="result-data">
            <img src={assets.gemini_icon} alt="" />
            {loading ? 
            <div className="loader">
              <hr />
              <hr />
              <hr />
            </div>
            : <p dangerouslySetInnerHTML={{__html:results}}></p>}
            
          </div>
        </div>
        }
        
        <div className="main-bottom">
          <div className="search-box">
            <input onChange={(e)=>setInput(e.target.value)} value={input} type="text" placeholder='Type  Prompt here' />
            <div>
              <img src={assets.gallery_icon} alt="" />
              <img src={assets.mic_icon} alt="" />
              {input ? <img onClick={()=>onSent()} src={assets.send_icon} alt="" />: null}
              
            </div>
          </div>
          <p className="bottom-info">
            Gemini is an AI-powered conversational tool designed to assist users with their daily tasks, find information, and engage with the world around them. To get started, type your question or command. For more advanced features, visit our website or contact our support team.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Main