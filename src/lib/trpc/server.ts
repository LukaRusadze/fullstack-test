import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import { AppRouter } from "~/server";
import { getBaseUrl } from "./shared";

export const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: `${getBaseUrl()}/api/trpc`,
      async headers() {
        return {
          // authorization: getAuthCookie(),
        };
      },
    }),
  ],
});
