"use client";
import Image from "next/image";
import { Inter } from "next/font/google";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const fetchSomething = async () => {
    const res = fetch("/api/new", {
      method: "POST",
      body: text,
    });
    return await res;
  };
  const [text, setText] = useState("Hello");
  const [ifTrue, setIfTrue] = useState(true);
  console.log(text);
  return (
    <main className="grid place-content-center h-full bg-black">
      <input
        onChange={(e) => setText(e.target.value)}
        type="text"
        className="text-black p-2 "
      />
      <button onClick={fetchSomething} className="bg-white p-2 text-black">
        Click me
      </button>
      {ifTrue && <div>Popup</div>}
    </main>
  );
}
