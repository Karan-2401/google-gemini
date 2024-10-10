import { createContext, useState } from "react";
export const Context = createContext();
import run from "../config/gemini";
const ContextProvider = (props) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setrecentPrompt] = useState("");
  const [prevprompts, setprevprompts] = useState([]);
  const [showresult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");

  const delayPara = (index, nextWord) => {
    setTimeout(() => {
      setResultData((prev) => prev + nextWord);
    }, 75 * index);
  };

  const onSent = async (prompts) => {
    setResultData("");
    setLoading(true);
    setShowResult(true);
    let response;
    if (prompts !== undefined) {
      response = await run(prompts);
      setrecentPrompt(prompts);
    } else {
      setrecentPrompt(input);
      setprevprompts([...prevprompts, input]);
      response = await run(input);
    }

    let responseArray = response.split("**");
    let newArray = "";
    for (let i = 0; i < responseArray.length; i++) {
      if (i === 0 || i % 2 !== 1) {
        newArray += responseArray[i];
      } else {
        newArray += "<b>" + responseArray[i] + "</b>";
      }
    }
    let newResponse = newArray.split("*").join("</br>");
    let newResponsearray = newResponse.split(" ");
    for (let i = 0; i < newResponsearray.length; i++) {
      const nextWord = newResponsearray[i];
      delayPara(i, nextWord + " ");
    }
    setLoading(false);
    setInput("");
  };

  const contextValue = {
    input,
    setInput,
    recentPrompt,
    setrecentPrompt,
    prevprompts,
    setprevprompts,
    showresult,
    setShowResult,
    loading,
    setLoading,
    resultData,
    setResultData,
    onSent,
  };

  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};

export default ContextProvider;
