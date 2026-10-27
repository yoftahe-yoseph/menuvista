import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  let password = "";
  try {
    const body = await req.json();
    password = String(body?.password ?? "");
  } catch {
    password = "";
  }

  const expected = process.env.ADMIN_PASSWORD || "menuvista-admin";
  if (!password || password !== expected) {
    return NextResponse.json({ ok: false, error: "Invalid password" }, { status: 401 });
  }

  cookies().set("mv_session", "authenticated", {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 8,
    secure: process.env.NODE_ENV === "production",
  });

  return NextResponse.json({ ok: true });
}