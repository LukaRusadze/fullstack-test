import { db } from "~/lib/db";
import { procedure, router } from "../trpc";
import { z } from "zod";
import { eq, sql } from "drizzle-orm";
import { products, shoppingCartItems, shoppingCarts } from "~/lib/db/schema";
import { auth } from "~/lib/auth";

type ShoppingCartItem = typeof shoppingCartItems.$inferSelect;

interface ShoppingCart extends ShoppingCartItem {
  product: typeof products.$inferSelect;
}

export const cartRouter = router({
  get: procedure.query(async () => {
    const session = await auth();

    if (!session?.user) {
      return;
    }

    const [shoppingCart] = await db
      .select({
        id: shoppingCarts.id,
        userId: shoppingCarts.userId,
        totalQuantity: sql<number>`sum(${shoppingCartItems.quantity})`,
        totalPrice: sql<number>`sum(${products.price} * ${shoppingCartItems.quantity})`,
        shoppingCartItems: sql`JSON_GROUP_ARRAY(JSON_OBJECT(
          'id', ${shoppingCartItems.id},
          'productId', ${shoppingCartItems.productId},
          'quantity', ${shoppingCartItems.quantity},
          'shoppingCartId', ${shoppingCartItems.shoppingCartId},
          'product', JSON_OBJECT(
            'id', ${products.id},
            'title', ${products.title},
            'author', ${products.author},
            'price', ${products.price},
            'image', ${products.image}
          )
        ))`
          .mapWith(JSON.parse)
          .as<Prettify<ShoppingCart>[]>("shoppingCartItems"),
      })
      .from(shoppingCarts)
      .innerJoin(
        shoppingCartItems,
        eq(shoppingCarts.id, shoppingCartItems.shoppingCartId),
      )
      .innerJoin(products, eq(shoppingCartItems.productId, products.id))
      .where(eq(shoppingCarts.userId, session.user.id));

    if (!shoppingCart) {
      await db.insert(shoppingCarts).values({ userId: session.user.id });
      return;
    }

    return shoppingCart;
  }),
  add: procedure.input(z.number()).mutation(async ({ input }) => {
    const session = await auth();

    if (!session?.user) {
      return;
    }

    let shoppingCart = await db.query.shoppingCarts.findFirst({
      where: eq(shoppingCarts.userId, session.user.id),
    });

    if (!shoppingCart) {
      shoppingCart = (
        await db
          .insert(shoppingCarts)
          .values({ userId: session.user.id })
          .returning()
      )[0];
    }

    const itemInCart = await db.query.shoppingCartItems.findFirst({
      where: eq(shoppingCartItems.productId, Number(input)),
    });

    if (itemInCart) {
      await db
        .update(shoppingCartItems)
        .set({
          quantity: itemInCart.quantity + 1,
        })
        .where(eq(shoppingCartItems.id, itemInCart.id));
      return;
    }

    try {
      await db.insert(shoppingCartItems).values({
        productId: input,
        shoppingCartId: shoppingCart.id,
        quantity: 1,
      });
    } catch (error) {
      console.warn(error);
    }
  }),
  reduceQuantity: procedure.input(z.number()).mutation(async ({ input }) => {
    const currentItems = await db.query.shoppingCartItems.findFirst({
      where: eq(shoppingCartItems.id, input),
    });

    if (!currentItems) {
      return;
    }

    if (currentItems.quantity > 1) {
      await db
        .update(shoppingCartItems)
        .set({
          quantity: currentItems.quantity - 1,
        })
        .where(eq(shoppingCartItems.id, input));
      return;
    }

    await db.delete(shoppingCartItems).where(eq(shoppingCartItems.id, input));
  }),
  remove: procedure.input(z.number()).mutation(async ({ input }) => {
    await db.delete(shoppingCartItems).where(eq(shoppingCartItems.id, input));
  }),
  clear: procedure.mutation(async () => {
    const session = await auth();

    if (!session?.user) {
      return;
    }

    const shoppingCart = await db.query.shoppingCarts.findFirst({
      where: eq(shoppingCarts.userId, session.user.id),
    });

    if (!shoppingCart) {
      return;
    }

    await db
      .delete(shoppingCartItems)
      .where(eq(shoppingCartItems.shoppingCartId, shoppingCart.id));
  }),
});
