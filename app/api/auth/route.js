import { NextResponse } from "next/server";

export async function POST(req) {
  const { user, pass } = await req.json();
  const validUser = process.env.ADMIN_USER;
  const validPass = process.env.ADMIN_PASS;

  if (user === validUser && pass === validPass) {
    return NextResponse.json({ ok: true });
  }
  return NextResponse.json({ ok: false, error: "Invalid credentials." }, { status: 401 });
}
