import { db } from "~/lib/db";
import { procedure, router } from "../trpc";

export const productRouter = router({
  getProducts: procedure.query(async () => {
    const products = await db.query.products.findMany();
    return products;
  }),
});
