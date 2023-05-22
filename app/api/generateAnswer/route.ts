import { NextRequest, NextResponse } from "next/server";
import { generateQuestion } from "@/utils";

export async function POST(_request: NextRequest) {
  const req = await _request.json();
  console.log(req);
  const resp = await generateQuestion(req.model, req.message, req.contextData);
  console.log(resp);
  return NextResponse.json(resp);
}
