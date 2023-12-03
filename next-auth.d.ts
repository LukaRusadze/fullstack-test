import { DefaultSession } from "next-auth";
import { users } from "~/lib/db/schema";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `Provider` React Context
   */
  interface Session extends DefaultSession {
    user?: typeof users.$inferSelect;
  }
}
