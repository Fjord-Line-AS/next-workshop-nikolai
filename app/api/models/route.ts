import { openAiClient } from "@/utils/openAiClient";

export async function GET(request: Request) {
  const response = await openAiClient.listModels();
  return new Response(JSON.stringify(response.data));
}
