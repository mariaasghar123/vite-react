import { createContext, useState } from "react";
import run from "../config/gemini";
export const Context = createContext();

const ContextProvider=(props)=>{
//create usestate
  const [input,setInput]=useState("");
  const [recentPrompt,setrecentPrompt]=useState("");
  const [prevPrompt,setprevPrompt]=useState([]);
  const [showResults,setshowResults]=useState(false);
  const [loading, setloading]= useState(false);
  const [results,setresults]=useState("");

  //delayPara
  const delayPara=(index,nextWord)=>{
    setTimeout(function(){
     setresults(prev=>prev+nextWord);
    },75*index)
  }
  //newchat logic
  const newChat=()=>{
    setloading(false);
    setshowResults(false);
  }
  //create onsent
  const onSent=async (prompt)=>{
   
    setresults("");
    setloading(true);
    setshowResults(true);
    let response;
    if(prompt!== undefined){
      response=await run(prompt)
      setrecentPrompt(prompt)
    }
    else{
      
      setprevPrompt(prev=>[...prev,input])
      setrecentPrompt(input)
      response=await run(input)
    }
     let responseArray= response.split("**");
     let newResponse;
     for(let i=0; i<responseArray.length; i++){
     if(i===0 || i%2 !==1){
      newResponse+=responseArray[i];
     } else{
        newResponse+="<b>"+responseArray[i] + "</b>";
     } }
     let newResponse2= newResponse.split("*").join("</br>")
     let newResponseArray= newResponse2.split(" ");
     for(let i=0; i<newResponseArray.length; i++){
      const nextWord= newResponseArray[i];
      delayPara(i,nextWord +" ")
     }
    

    //  setresults(response);
    setloading(false);
    setInput("");
  }
 
  const contextValue={
    input,
    setInput,
    recentPrompt,
    setrecentPrompt,
    prevPrompt,
    setprevPrompt,
    showResults,
    setshowResults,
    loading,
    setloading,
    results,
    setresults,
    onSent,
    newChat
  }

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider;