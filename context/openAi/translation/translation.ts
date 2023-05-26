import { contextData } from "../sarcastic/sarcastic";

export const translationContext = (prompt: string, language: string) => {
  return `Translate this text to ${language}:${prompt}`;
};
