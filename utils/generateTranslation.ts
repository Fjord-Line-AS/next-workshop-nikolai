import { openAiClient } from "./openAiClient";
import { translationContext } from "@/context/openAi/translation";
export const generateTranslation = async (
  message: string,
  language: string
) => {
  console.log(language);
  const prompt = message;
  const contexts = {
    translation: translationContext(prompt, language),
  };
  const completion = await openAiClient.createCompletion({
    model: "text-davinci-003",
    prompt: contexts.translation,
    temperature: 1,
    max_tokens: 150,
    top_p: 0,
    frequency_penalty: 1,
    presence_penalty: 0.6,
  });
  console.log(completion.data.choices[0].text);
  return completion.data.choices[0].text;
};
