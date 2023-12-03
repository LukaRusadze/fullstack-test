import { getServerSession } from "next-auth/next";
import { authOptions } from "~/app/api/auth/[...nextauth]/_utils";

export function auth() {
  return getServerSession(authOptions);
}
