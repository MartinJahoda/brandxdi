import { readFile, writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { NextResponse } from "next/server";

const DATA_DIR = join(process.cwd(), "data");
const CONFIG_FILE = join(DATA_DIR, "config.json");

export async function GET() {
  try {
    const raw = await readFile(CONFIG_FILE, "utf-8");
    return NextResponse.json(JSON.parse(raw));
  } catch {
    // No saved config yet — return empty so client uses defaults
    return NextResponse.json(null);
  }
}

export async function POST(request) {
  try {
    const config = await request.json();
    await mkdir(DATA_DIR, { recursive: true });
    await writeFile(CONFIG_FILE, JSON.stringify(config, null, 2), "utf-8");
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Config save error:", err);
    return NextResponse.json({ error: "Failed to save config" }, { status: 500 });
  }
}
