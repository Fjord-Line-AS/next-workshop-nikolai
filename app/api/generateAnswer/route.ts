import { NextRequest, NextResponse } from "next/server";
import { generateQuestion } from "@/utils";

export async function POST(_request: NextRequest) {
  try {
    const req = await _request.json();
    const resp = await generateQuestion(
      req.model,
      req.message,
      req.contextData,
      "fjordline"
    );
    console.log(req.contextData);
    return NextResponse.json(resp);
  } catch (error) {
    console.log(error);
  }
}
