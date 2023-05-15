import { openAiClient } from "./openAiClient";
export const generateQuestion = async (model: string, message: string) => {
  const prompt = message;

  const completion = await openAiClient.createChatCompletion({
    model: model,
    messages: [{ role: "user", content: prompt }],
    temperature: 0,
    max_tokens: 256,
    top_p: 1,
    frequency_penalty: 1,
    presence_penalty: 0,
  });
  console.log(completion.data.choices[0]);
  return completion.data.choices[0].message?.content;
};
