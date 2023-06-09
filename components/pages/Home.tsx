"use client";
import { useState, useEffect, useRef } from "react";
import { TModel, TOutput, TLoading } from "@/types";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import ChatBubble from "@/components/ChatBubble";
import { roboto } from "@/styles/fonts";
import { getCodeAsString } from "@/utils";

type Props = {
  contextData: any[];
};

export default function Home(props: Props) {
  console.log(props.contextData);
  const ref = useRef<HTMLDivElement>(null);
  const getCurrentModel =
    typeof window !== "undefined" &&
    window.localStorage.getItem("openai-current-model");
  const getCurrentConveration =
    typeof window !== "undefined" &&
    window.localStorage.getItem("openai-current-conversation");
  const [message, setMessage] = useState<string>("");
  const [currentModel, setCurrentModel] = useState<string>(
    getCurrentModel || "gpt-3.5-turbo"
  );
  const [models, setModels] = useState<TModel[]>([]);
  const [loading, setLoading] = useState<TLoading>({
    models: true,
    answers: false,
  });
  const [error, setError] = useState<TLoading>({
    models: false,
    answers: false,
  });

  const [output, setOutput] = useState<TOutput[]>([]);

  const clearChat = () => {
    setOutput([]);
    localStorage.setItem("openai-current-conversation", "");
  };

  const handleOutput = (message: TOutput) => {
    setOutput((prev) => [...prev, message]);
  };

  const handleLoading = (type: TLoading) => {
    setLoading((prev) => ({
      ...prev,
      ...type,
    }));
  };
  const handleError = (type: TLoading) => {
    setError((prev) => ({
      ...prev,
      ...type,
    }));
  };

  const handleMessage = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  const handleModelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentModel(e.target.value);
    localStorage.setItem("openai-current-model", e.target.value);
    handleError({ answers: false });
  };

  const findCachedModel = () => {
    if (!getCurrentModel) {
      return;
    }
    setCurrentModel(getCurrentModel);
  };

  const findCachedMessages = () => {
    if (!getCurrentConveration) {
      return;
    }
    setOutput(JSON.parse(getCurrentConveration));
  };

  // get OpenAI models
  useEffect(() => {
    const fetchModels = async () => {
      handleLoading({ models: true });
      const res = await fetch("/api/models");
      if (res.status === 200) {
        const data = await res.json();
        setModels(data.data);
        handleLoading({ models: false });
      }
    };
    fetchModels();
    findCachedModel();
    findCachedMessages();
  }, []);

  //
  const fetchData = async (
    model: string,
    message: string,
    contextData: any[]
  ) => {
    handleError({ answers: false });
    handleOutput({ sender: "guest", message: message });
    setMessage("");
    handleLoading({ answers: true });
    const req = await fetch(`/api/generateAnswer`, {
      method: "POST",
      body: JSON.stringify({
        model: model,
        message: message,
        contextData: [
          ...contextData,
          {
            dataType: "Prev messages",
            prevMessages: output,
          },
        ],
      }),
    });
    if (req.status === 200) {
      const answer = await req.json();
      handleLoading({ answers: false });
      handleOutput({ sender: "AI", message: answer });
    } else {
      handleError({ answers: true });
      handleLoading({ answers: false });
    }
  };
  // TODO use this function to generate documentation for code snippets
  getCodeAsString(fetchData);

  // Scroll to bottom of chat when new messages arrvies
  useEffect(() => {
    if (ref.current?.scrollTop != undefined) {
      ref.current.scrollTo({
        top: ref.current.scrollHeight,
        left: 0,
        behavior: "smooth",
      });
    }
    localStorage.setItem("openai-current-conversation", JSON.stringify(output));
  }, [output]);

  return (
    <main
      className={`flex flex-col justify-between items-center p-10 h-screen max-w-5xl m-auto ${roboto.className}`}
    >
      <div className="flex justify-between items-start w-full">
        <a
          href="https://platform.openai.com/docs/introduction"
          target={"_blank"}
        >
          <img
            src="https://logowik.com/content/uploads/images/openai5002.jpg"
            alt=""
            className="w-40 rounded"
          />
        </a>
        {error.answers && (
          <div>
            <span className="font-bold">ERROR</span>
            <p className="p-3 bg-red-400">Could not fetch from OpenAi</p>
          </div>
        )}
        {loading.models ? (
          <LoadingSkeleton />
        ) : (
          <div>
            <h2 className="text-2xl font-bold">MODELS:</h2>
            <select className="text-black p-3" onChange={handleModelChange}>
              {models &&
                models.map((model: TModel) => {
                  return (
                    <option
                      value={model.id}
                      key={model.id}
                      selected={model.id === currentModel}
                    >
                      {model.id}
                    </option>
                  );
                })}
            </select>
            <div className="model-info text-white">
              {models.map((model: TModel) => {
                if (model.id === currentModel) {
                  return (
                    <div key={model.id}>
                      <h3 className="text-white">INFORMATION:</h3>
                      <ul>
                        <li>
                          <strong>Owned By</strong>: {model.owned_by}
                        </li>
                        <li className="flex">
                          <strong>Allow Fine Tuning</strong>:{" "}
                          {model.permission[0].allow_fine_tuning ? (
                            <p> &#9989;</p>
                          ) : (
                            <p> &#10060;</p>
                          )}
                        </li>
                      </ul>
                    </div>
                  );
                }
              })}
            </div>
          </div>
        )}
      </div>
      <span onClick={clearChat} className="bg-red-500 p-2 cursor-pointer">
        Clear Chat
      </span>
      <div
        className="result codeblock-container bg-white w-full h-full mb-1 overflow-y-scroll"
        ref={ref}
      >
        {output.length > 0 &&
          output.map((message, idx) => {
            return (
              <ChatBubble
                key={idx}
                message={message.message}
                sender={message.sender}
              />
            );
          })}
      </div>

      <div className="name flex-col flex bg-red-500 w-full">
        <textarea
          value={message}
          onChange={(e) => handleMessage(e)}
          className="input p-2 resize-none text-black w-full"
          placeholder="Tell me something"
          disabled={loading.answers}
        />
        <button
          onClick={() => fetchData(currentModel, message, props.contextData)}
          className="buttonPrimary"
        >
          SEND
        </button>
      </div>
    </main>
  );
}
