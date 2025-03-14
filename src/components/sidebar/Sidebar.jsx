import React, { useContext, useState } from 'react'
import {assets} from "../../assets/assets";
import { Context } from '../context/context';
import "./sidebar.css";
function Sidebar() {

const [extended,setextended]= useState(false);
const {onSent,prevPrompt,setrecentPrompt,newChat}=useContext(Context)

const loadPrompt= async(prompt)=>{
 setrecentPrompt(prompt)
 await onSent(prompt)
}

  return (
    <div className='sidebar'>
      <div className='top'>
        <img onClick={()=>setextended(prev=>!prev)} className='menu' src={assets.menu_icon} />
        <div onClick={()=> newChat()} className='newchat'>
          <img src={assets.plus_icon}  />
          {extended ? <p>New Chat</p>: null}
        </div>
        {extended ?
        <div className="recent">
          <p className="recent-title"> Recent Title</p>
          {prevPrompt.map((item,index)=>{
            return(
            <div onClick={()=>loadPrompt(item)} className='recent-entry'>
            <img src={assets.message_icon}  />
            <p>{item.slice(0,18)}</p>
          </div>
            )
          })}
        </div>:null }
      </div>
      <div className="bottom">
        <div className="bottom_icon recent-entry">
          <img src={assets.question_icon}  />
          {extended ? <p>Help</p>: null}
          
        </div>
        <div className="bottom_icon recent-entry">
          <img src={assets.history_icon} />
          {extended ? <p>Activity</p>: null}
        </div>
        <div className="bottom_icon recent-entry">
          <img src={assets.setting_icon}  />
          {extended ? <p>Setting</p>: null}
        </div>
      </div>
    </div>
  )
}

export default Sidebar