import { getServerSession } from "next-auth/next";
import { authOptions } from "~/app/api/auth/[...nextauth]/_utils";

export async function auth() {
  return await getServerSession(authOptions);
}
