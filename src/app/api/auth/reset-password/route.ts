import { RESET_PASSWORD_DATA } from "@/utils/backEndConstant";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const cookie = request.headers.get("cookie"); 

    const response = await fetch(RESET_PASSWORD_DATA, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(cookie && { Cookie: cookie }),
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const text = await response.text();
      return NextResponse.json(
        { error: text },
        { status: response.status }
      );
    }

    return NextResponse.json(await response.json());
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Something went wrong while adding activity wish list" },
      { status: 500 }
    );
  }
}
