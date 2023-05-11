import { NextRequest, NextResponse } from "next/server";
import { generateQuestion } from "@/utils/generateQuestion";

export async function POST(_request: NextRequest) {
  const res = await _request.json();
  console.log(res);
  const resp = await generateQuestion(res.model, res.message);
  console.log(resp);
  return NextResponse.json(resp);
}
