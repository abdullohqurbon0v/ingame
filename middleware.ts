import type { NextRequest } from "next/server";
import createMiddleware from "next-intl/middleware";

const intlMiddleware = createMiddleware({
  locales: ["uz", "ru"],
  defaultLocale: "uz",
});

export function middleware(request: NextRequest) {
  return intlMiddleware(request);
}
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
