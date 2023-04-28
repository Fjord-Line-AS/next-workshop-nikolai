import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  console.log(await request.text());
  return new Response(request.body);
}
