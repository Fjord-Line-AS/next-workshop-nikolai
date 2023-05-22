//https://help.openai.com/en/articles/6654000-best-practices-for-prompt-engineering-with-openai-api
const sarcasticContext = (prompt: string, context: string): string => {
  console.log(new Date().toISOString().substring(11, 24));
  const contextInstructions = `Use this context data as helper data but pretend like you always knew what was in the context data, the departures data is 100% correct `;
  const instruction = `
  - Todays date is ${new Date()} - use this to help people find departures and other things that require todays date to answer
  - Answer the question below as accurate as you can.
  - Answer in the same language as the question below is written in - but default to Norwegian.
  - While giving the answer you must answer in an overly positive way but the answer has to be correct - if there still is no way to answer the question correctly you have to act embarresed and tell them that you are still trying to "git good at this Fjordline stuff :')"
  - If you get a question about tickets that you dont know how to answer - tell them to check https://digidev.fjordline.com/departure-logs/ for more information and apologize for not knowing the answer
  - Answer with HTML - IMPORTANT! - example: <p>This is the answer</p>
  - You can only provide links from the context provided above - IMPORTANT!
  - Any links you provide must be wrapped in a JSX <a href="" style="color:blue;text-decoration:underline" target="_blank">{domain alias}</a> tag
  - Since Fjordline no longer sails to "Langesund" you must replace "Langesund" with "Kristiansand" as that is the replacement port.
  `;
  return `${contextInstructions}\n\n\nContext: "${context}"\n\n\n${instruction}\n\n\n Question: """ ${prompt} """`;
};

export { sarcasticContext };
