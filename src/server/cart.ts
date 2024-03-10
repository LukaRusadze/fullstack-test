"use server";

import { eq, sql } from "drizzle-orm";
import { auth } from "~/lib/auth";
import { db } from "~/lib/db";
import { products, shoppingCartItems, shoppingCarts } from "~/lib/db/schema";

export type ShoppingCartItem = typeof shoppingCartItems.$inferSelect;

interface ShoppingCart extends ShoppingCartItem {
  product: typeof products.$inferSelect;
}

export async function get() {
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
      shoppingCartItems: sql<
        Prettify<ShoppingCart>[]
      >`json_agg(json_build_object(
        'id', ${shoppingCartItems.id},
        'productId', ${shoppingCartItems.productId},
        'quantity', ${shoppingCartItems.quantity},
        'shoppingCartId', ${shoppingCartItems.shoppingCartId},
        'product', json_build_object(
          'id', ${products.id},
          'title', ${products.title},
          'author', ${products.author},
          'price', ${products.price},
          'image', ${products.image}
        )
      ))`.as("shoppingCartItems"),
    })
    .from(shoppingCarts)
    .innerJoin(
      shoppingCartItems,
      eq(shoppingCarts.id, shoppingCartItems.shoppingCartId),
    )
    .innerJoin(products, eq(shoppingCartItems.productId, products.id))
    .where(eq(shoppingCarts.userId, session.user.id))
    .groupBy(shoppingCarts.id, shoppingCarts.userId);

  if (!shoppingCart) {
    await db.insert(shoppingCarts).values({ userId: session.user.id });
    return null;
  }

  return shoppingCart;
}

export type CartType = Awaited<ReturnType<typeof get>>;

export async function getCartItemById(id: number) {
  const cartItem = await db.query.shoppingCartItems.findFirst({
    where: eq(shoppingCartItems.id, id),
    with: { product: true },
  });

  return cartItem ?? null;
}

export async function getCartQuantity() {
  const session = await auth();

  if (!session?.user) {
    return 0;
  }

  const shoppingCart = await db.query.shoppingCarts.findFirst({
    where: eq(shoppingCarts.userId, session.user.id),
  });

  if (!shoppingCart) {
    return 0;
  }

  const totalQuantity = await db
    .select({
      quantity: sql<number>`sum(${shoppingCartItems.quantity})`,
    })
    .from(shoppingCartItems)
    .where(eq(shoppingCartItems.shoppingCartId, shoppingCart.id));

  return totalQuantity[0].quantity ?? 0;
}

export async function add(input: number) {
  const session = await auth();

  if (!session?.user) {
    console.log("first");
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
    console.log(shoppingCart);
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
}

export async function reduceQuantity(productId: number) {
  const currentItems = await db.query.shoppingCartItems.findFirst({
    where: eq(shoppingCartItems.id, productId),
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
      .where(eq(shoppingCartItems.id, productId));
    return;
  }

  await db.delete(shoppingCartItems).where(eq(shoppingCartItems.id, productId));
}

export async function removeFromCart(productId: number) {
  await db.delete(shoppingCartItems).where(eq(shoppingCartItems.id, productId));
}

export async function clearCart() {
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
}
