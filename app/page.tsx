"use client";
import { useState, useEffect } from "react";
import { TModel, TOutput } from "@/types";
import LoadingSkeleton from "@/components/LoadingSkeleton";

export default function Home() {
  const [message, setMessage] = useState<string>("");
  const [currentModel, setCurrentModel] = useState<string>("text-davinci-003");
  const [models, setModels] = useState([]);
  const [loading, setLoading] = useState({
    models: true,
    answers: false,
  });

  const [output, setOutput] = useState<TOutput>({
    guest: {
      messages: [],
    },
    openAI: {
      messages: [],
    },
  });

  const handleLoading = (type: "models" | "answers", isLoading: boolean) => {
    switch (type) {
      case "models":
        setLoading((prev) => ({
          ...prev,
          models: isLoading,
        }));
      case "answers":
        setLoading((prev) => ({
          ...prev,
          answers: isLoading,
        }));
    }
  };
  const handleMessage = (e: any) => {
    setMessage(e.target.value);
  };

  const handleModelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentModel(e.target.value);
  };

  // get OpenAI models
  useEffect(() => {
    const fetchModels = async () => {
      handleLoading("models", true);
      const res = await fetch("/api/models");
      if (res.status === 200) {
        const data = await res.json();
        setModels(data.data);
        handleLoading("models", false);
      }
    };
    fetchModels();
  }, []);

  //
  const fetchData = async (model: string, message: string) => {
    handleLoading("answers", true);
    const req = await fetch(`/api/generateAnswer`, {
      method: "POST",
      body: JSON.stringify({
        model: model,
        message: message,
      }),
    });
    console.log(req);
    if (req.status === 200) {
      handleLoading("answers", false);
    }
  };

  return (
    <main className=" flex flex-col justify-between items-center p-10 h-screen max-w-5xl m-auto ">
      <div className="flex justify-between items-start w-full">
        <img
          src="https://logowik.com/content/uploads/images/openai5002.jpg"
          alt=""
          className="w-40 rounded"
        />
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
                        <li>
                          <strong>Root</strong>: {model.root}
                        </li>
                        <li className="flex">
                          <strong>Allow View</strong>:{" "}
                          {model.permission[0].allow_view ? (
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
      {/* {data && data.result && (
        <div className="result codeblock-container">
          <div className="codeblock-content">{data.result}</div>
        </div>
      )} */}

      <div className="name flex-col flex bg-red-500">
        <textarea
          value={message}
          onChange={(e) => handleMessage(e)}
          className="input p-2 resize-none text-black"
          placeholder="Tell me something"
          rows={9}
          cols={108}
        />
        <button
          onClick={() => fetchData(currentModel, message)}
          className="buttonPrimary"
        >
          SEND
        </button>
      </div>
    </main>
  );
}
