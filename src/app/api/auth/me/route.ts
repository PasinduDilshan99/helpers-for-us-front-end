import { GET_USER_DETAILS_FOR_LOGIN_DATA } from "@/utils/backEndConstant";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const response = await fetch(GET_USER_DETAILS_FOR_LOGIN_DATA, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        cookie: req.headers.get("cookie") || "",
      },
      credentials: "include"
    });

    if (!response.ok) {
      const text = await response.text();
      return NextResponse.json(
        { error: text || "Failed to fetch data from backend" },
        { status: response.status },
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching backend data:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}
