import { relations } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  id: integer("id").primaryKey(),
  firstName: text("first_name"),
  lastName: text("last_name"),
  email: text("email"),
  password: text("password"),
  shoppingCartId: integer("shopping_cart_id").references(
    () => shoppingCarts.id,
  ),
});

export const userRelations = relations(users, ({ one }) => ({
  shoppingCart: one(shoppingCarts, {
    fields: [users.shoppingCartId],
    references: [shoppingCarts.id],
  }),
}));

export const shoppingCarts = sqliteTable("shopping_carts", {
  id: integer("id").primaryKey(),
});

export const shoppingCartRelations = relations(shoppingCarts, ({ many }) => ({
  shoppingCartItems: many(shoppingCartItems, {
    relationName: "shoppingCart",
  }),
}));

export const shoppingCartItems = sqliteTable("shopping_cart_items", {
  id: integer("id").primaryKey(),
  productId: integer("product_id").references(() => products.id),
  quantity: integer("quantity"),
  shoppingCartId: integer("shopping_cart_id").references(
    () => shoppingCarts.id,
  ),
});

export const shoppingCartItemsRelations = relations(
  shoppingCartItems,
  ({ one }) => ({
    shoppingCart: one(shoppingCarts, {
      fields: [shoppingCartItems.shoppingCartId],
      references: [shoppingCarts.id],
    }),
    product: one(products, {
      fields: [shoppingCartItems.productId],
      references: [products.id],
    }),
  }),
);

export const products = sqliteTable("products", {
  id: integer("id").primaryKey(),
  title: text("name"),
  author: text("author"),
  price: integer("price"),
  image: text("image"),
});
