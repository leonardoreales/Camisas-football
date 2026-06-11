import { NextResponse, type NextRequest } from "next/server";

// Supabase auth desactivado temporalmente — descomentar cuando se configure .env.local
// import { updateSession } from "@/lib/supabase/middleware";

export async function proxy(request: NextRequest) {
  // return await updateSession(request);
  return NextResponse.next({ request });
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
