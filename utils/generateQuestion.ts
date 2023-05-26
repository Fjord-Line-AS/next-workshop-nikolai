import { openAiClient } from "./openAiClient";
import { sarcasticContext } from "@/context/openAi/sarcastic";
import type { contextData } from "@/context/openAi/sarcastic/sarcastic";
import { fjordlineContext } from "@/context/openAi/fjordline";
import { translationContext } from "@/context/openAi/translation";
export const generateQuestion = async (
  model: string,
  message: string,
  contextData: contextData[],
  contextType: "sarcastic" | "fjordline" | "translation"
) => {
  const prompt = message;
  const contexts = {
    sarcastic: sarcasticContext(prompt, contextData),
    fjordline: fjordlineContext(prompt, contextData),
    translation: translationContext(prompt, "Norwegian"),
  };
  const completion = await openAiClient.createCompletion({
    model: model,
    prompt: contexts[contextType],
    temperature: 0.9,
    max_tokens: 150,
    top_p: 1,
    frequency_penalty: 1,
    presence_penalty: 0.6,
  });
  console.log(completion.data.choices[0]);
  return completion.data.choices[0].text;
};
