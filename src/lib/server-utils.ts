import { headers } from "next/headers";

export function getServerPathname() {
  return headers().get("x-pathname") || "";
}
