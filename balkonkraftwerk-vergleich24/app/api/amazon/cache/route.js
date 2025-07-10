import { promises as fs } from "fs";
import path from "path";

const CACHE_FILE = path.join(process.cwd(), "app", "api", "amazon", "priceCache.json");

export async function GET() {
  try {
    const data = await fs.readFile(CACHE_FILE, "utf8");
    return new Response(data, {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ error: "Cache not found" }),
      { status: 500 }
    );
  }
}
