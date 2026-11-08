import { LOGIN } from "@/utils/backEndConstant";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    const backendResponse = await fetch(LOGIN, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ username, password }),
    });

    const data = await backendResponse.json();
    const res = NextResponse.json(data);

    const cookies = backendResponse.headers.getSetCookie();
    if (cookies) {
      cookies.forEach((cookie: string) => {
        res.headers.append("Set-Cookie", cookie);
      });
    }

    return res;
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Login failed" }, { status: 500 });
  }
}
