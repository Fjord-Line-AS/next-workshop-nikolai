import { OpenAIApi, Configuration } from "openai";
export const openAiClient = new OpenAIApi(
  new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  })
);
