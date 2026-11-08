import { ADD_AGENCY_BE } from "@/utils/backEndConstant";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    if (!ADD_AGENCY_BE) {
      throw new Error("Backend URL is not defined");
    }

    const body = await request.json();

    // Get cookies from the incoming request
    const cookieHeader = request.headers.get("cookie") || "";

    const response = await fetch(ADD_AGENCY_BE, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Forward cookies
        "Cookie": cookieHeader,
      },
      body: JSON.stringify(body),
      // credentials is ignored in server-side fetch, headers already include cookies
    });

    if (!response.ok) {
      const text = await response.text();
      console.error("Backend returned error:", text);
      return NextResponse.json(
        { error: "Failed to fetch activities" },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching activities:", error);
    return NextResponse.json(
      { error: "Something went wrong while fetching activities" },
      { status: 500 }
    );
  }
}
