import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  cookies().delete("mv_session");
  return NextResponse.json({ ok: true });
}