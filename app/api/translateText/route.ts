import { NextRequest, NextResponse } from "next/server";
import { generateTranslation } from "@/utils";

export async function POST(_request: NextRequest) {
  try {
    const req = await _request.json();
    const resp = await generateTranslation(req.message, req.language);
    return NextResponse.json(resp);
  } catch (error) {
    console.log(error);
  }
}
