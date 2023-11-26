import { NextResponse } from "next/server";

export function middleware(request: Request) {
  const { headers, url } = request;

  const pathname = url.split(headers.get("host") ?? "")[1];

  request.headers.set("x-pathname", pathname);

  return NextResponse.next({ request });
}
