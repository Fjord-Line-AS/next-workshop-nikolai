import { openAiClient } from "./openAiClient";
export const generateQuestion = async (model: string, message: string) => {
  const prompt = message;

  const completion = await openAiClient.createCompletion({
    model: model,
    prompt: prompt,
    temperature: 1,
    max_tokens: 256,
    top_p: 1,
    best_of: 5,
    frequency_penalty: 1,
    presence_penalty: 0,
  });
  console.log(completion);
  return completion.data.choices[0].text;
};
