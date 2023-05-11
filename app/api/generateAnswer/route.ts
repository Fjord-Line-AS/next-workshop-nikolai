import { NextRequest, NextResponse } from "next/server";
import { generateQuestion } from "@/utils/generateQuestion";

export async function POST(_request: NextRequest) {
  const req = await _request.json();
  console.log(req);
  const resp = await generateQuestion(req.model, req.message);
  console.log(resp);
  return NextResponse.json(resp);
}