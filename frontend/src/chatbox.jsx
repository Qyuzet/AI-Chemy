import React, { useState, useRef, useEffect } from "react";
// import { backend } from 'declarations/backend';
import botImg from "/bot.svg";
import userImg from "/user.svg";
import "/index.css";

const RetractableChatbox = () => {
  const [chat, setChat] = useState([
    {
      role: { system: null },
      content: "I'm AI-Chemy assistant welcome to AI-Chemy",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const chatBoxRef = useRef(null);

  const formatDate = (date) => {
    const h = "0" + date.getHours();
    const m = "0" + date.getMinutes();
    return `${h.slice(-2)}:${m.slice(-2)}`;
  };

  const askAgent = async (messages) => {
    try {
      const response = await backend.chat(messages);
      setChat((prevChat) => {
        const newChat = [...prevChat];
        newChat.pop();
        newChat.push({ role: { system: null }, content: response });
        return newChat;
      });
    } catch (e) {
      console.log(e);
      const eStr = String(e);
      const match = eStr.match(/(SysTransient|CanisterReject), \+"([^\"]+)/);
      if (match) {
        alert(match[2]);
      }
      setChat((prevChat) => {
        const newChat = [...prevChat];
        newChat.pop();
        return newChat;
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const userMessage = {
      role: { user: null },
      content: inputValue,
    };
    const thinkingMessage = {
      role: { system: null },
      content: "Thinking ...",
    };
    setChat((prevChat) => [...prevChat, userMessage, thinkingMessage]);
    setInputValue("");
    setIsLoading(true);
    const messagesToSend = chat.slice(1).concat(userMessage);
    askAgent(messagesToSend);
  };

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [chat]);

  return (
    <div className="h-auto w-80 bg-black shadow-lg flex flex-col">
      <div className="h-full overflow-y-auto p-4 flex-1">
        <div
          className="flex-1 overflow-y-auto rounded-t-lg bg-black p-4"
          ref={chatBoxRef}
        >
          {chat.map((message, index) => {
            const isUser = "user" in message.role;
            const img = isUser ? userImg : botImg;
            const name = isUser ? "User" : "AI-Chemy";
            const text = message.content;

            return (
              <div
                key={index}
                className={`flex ${
                  isUser ? "justify-end" : "justify-start"
                } mb-4`}
              >
                {!isUser && (
                  <div
                    className="mr-2 h-10 w-10 rounded-full"
                    style={{
                      backgroundImage: `url(${img})`,
                      backgroundSize: "cover",
                    }}
                  ></div>
                )}
                <div
                  className={`max-w-[70%] rounded-lg p-3 ${
                    isUser ? "bg-white text-black" : "bg-white shadow"
                  }`}
                >
                  <div
                    className={`mb-1 flex items-center justify-between text-sm ${
                      isUser ? "text-black" : "text-gray-500"
                    }`}
                  >
                    <div>{name}</div>
                    <div className="mx-2">{formatDate(new Date())}</div>
                  </div>
                  <div>{text}</div>
                </div>
                {isUser && (
                  <div
                    className="ml-2 h-10 w-10 rounded-full"
                    style={{
                      backgroundImage: `url(${img})`,
                      backgroundSize: "cover",
                    }}
                  ></div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      <form className="border-t border-black p-2" onSubmit={handleSubmit}>
        <div className="flex space-x-2">
          <input
            type="text"
            className="flex-1 rounded-full bg-white text-black border border-transparent transition-all duration-300 ease-out transform hover:scale-105 hover:bg-black hover:text-white hover:border-white px-4 py-2"
            placeholder="Ask anything ..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            disabled={isLoading}
          />
          <button
            type="submit"
            className={`p-2 rounded-full transition-all duration-300 flex items-center justify-center bg-white text-black border border-white hover:bg-black hover:text-white ${
              isLoading || !inputValue.trim()
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
            disabled={isLoading || !inputValue.trim()}
          >
            ➤
          </button>
        </div>
      </form>
    </div>
  );
};

export default RetractableChatbox;
