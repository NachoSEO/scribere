import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Bypass auth in local development
  if (process.env.BYPASS_AUTH === "true") {
    return NextResponse.next({ request });
  }

  // Only run auth checks for protected routes and auth pages
  // The corrector runs entirely in the browser, so it is public
  const publicAppPaths = ["/app/corrector"];
  const isPublicAppRoute = publicAppPaths.some((path) => pathname.startsWith(path));
  const isProtectedRoute = pathname.startsWith("/app") && !isPublicAppRoute;
  const authPaths = ["/login", "/registro"];
  const isAuthRoute = authPaths.some((path) => pathname === path);
  const isAuthCallback = pathname.startsWith("/auth/callback");
  const needsAuth = isProtectedRoute || isAuthRoute || (pathname.startsWith("/auth") && !isAuthCallback);

  if (!needsAuth) {
    return NextResponse.next({ request });
  }

  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Protected routes — redirect to login if not authenticated
  if (isProtectedRoute && !user) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  // Redirect authenticated users away from auth pages
  if (isAuthRoute && user) {
    const url = request.nextUrl.clone();
    url.pathname = "/app/corrector";
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}
