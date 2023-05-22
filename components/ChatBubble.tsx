"use client";
import React from "react";
import { useRef, useEffect } from "react";

type Props = {
  message: string;
  sender: "AI" | "guest";
};

const ChatBubble = (props: Props) => {
  const messageRef = useRef<HTMLParagraphElement>(null);
  const { message, sender } = props;
  console.log(message);
  useEffect(() => {
    if (messageRef.current) {
      messageRef.current.innerHTML = message;
    }
  }, []);
  return (
    <div
      className={`flex flex-col w-full p-3 drop-shadow-lg ${
        sender === "AI" ? "items-end" : "items-start"
      }`}
    >
      <p className={`text-black ${sender === "AI" ? "pr-2" : ""}`}>{sender}</p>
      <p
        ref={messageRef}
        className={`${
          sender === "AI" ? "text-left" : "text-left"
        } text-white border-solid max-w-sm rounded bg-cyan-700 p-2 text-left`}
      ></p>
    </div>
  );
};

export default ChatBubble;
