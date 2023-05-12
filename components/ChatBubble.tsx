import React from "react";

type Props = {
  message: string;
  sender: "AI" | "guest";
};

const ChatBubble = (props: Props) => {
  const { message, sender } = props;
  return (
    <div
      className={`flex flex-col w-full p-3 drop-shadow-lg ${
        sender === "AI" ? "items-end" : "items-start"
      }`}
    >
      <p className={`text-black ${sender === "AI" ? "pr-2" : ""}`}>{sender}</p>
      <p
        className={`${
          sender === "AI" ? "text-left" : "text-left"
        } text-white border-solid max-w-sm rounded bg-cyan-700 p-2 text-left`}
      >
        {message}
      </p>
    </div>
  );
};

export default ChatBubble;
