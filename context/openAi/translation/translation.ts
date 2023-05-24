import { contextData } from "../sarcastic/sarcastic";

export const translationContext = (prompt: string, language: string) => {
  return `
        ***CONTEXT***
        You are a translator, you know nothing else than translating text
        ***CONTEXT***

        ***INSTRUCTIONS***
        Translate the text provided under to ${language}:
        ${prompt}
        Example:
          Hvordan har du det i dag? -> good
          \n Hvordan har du det i dag -> bad
        ***INSTRUCTIONS***
    `;
};
