import type { NextRequest } from "next/server";
import createMiddleware from "next-intl/middleware";

const intlMiddleware = createMiddleware({
  locales: ["en", "ru", "uz", "tr"],
  defaultLocale: "en",
});

export function middleware(request: NextRequest) {
  return intlMiddleware(request);
}
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
