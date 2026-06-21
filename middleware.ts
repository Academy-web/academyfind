import { NextRequest, NextResponse } from "next/server";

// ✅ SEO & Social Media Bots (Google, Bing, Facebook, Twitter, WhatsApp, etc.)
// Inhe allow karna zaroori hai for ranking and rich link previews
const GOOD_BOTS = /Googlebot|Googlebot-Image|Googlebot-Video|Googlebot-News|Storebot-Google|Google-InspectionTool|GoogleOther|Google-CloudVertexBot|Bingbot|Slurp|DuckDuckBot|Baiduspider|YandexBot|facebookexternalhit|Twitterbot|Applebot|LinkedInBot|WhatsApp|TelegramBot|Discordbot/i;

// ❌ Aggressive Scrapers, AI Bots & Scripting Tools
const BAD_BOTS = /bot|crawl|spider|fetch|scrape|http|wget|curl|python-requests|axios|node-fetch|java\/|libwww|ClaudeBot|GPTBot|AhrefsBot|SemrushBot|MJ12bot|DotBot|PetalBot|BLEXBot|CCBot|Bytespider/i;

export function middleware(req: NextRequest) {
  const ua = req.headers.get("user-agent") || "";

  // ❌ 1. Empty UA is mostly a cheap scraper script. Block it.
  if (!ua.trim()) {
    return new NextResponse("Access Denied: Missing User-Agent", { status: 403 });
  }

  // ✅ 2. Allow Good Bots (SEO & Social Media)
  if (GOOD_BOTS.test(ua)) {
    return NextResponse.next();
  }

  // ❌ 3. Block all other patterns matching bad bots/scripts
  if (BAD_BOTS.test(ua)) {
    return new NextResponse("Access Denied: Blocked Bot", { status: 403 });
  }

  // ✅ 4. Allow Normal human browsers
  return NextResponse.next();
}

export const config = {
  // 🔥 FIX: Excluded api/webhooks and api/auth from middleware to prevent webhook failures
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|api/webhooks|api/auth).*)",
  ],
};