import { relations } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  id: integer("id").primaryKey(),
  firstName: text("first_name"),
  lastName: text("last_name"),
  email: text("email"),
  password: text("password"),
});

export const products = sqliteTable("products", {
  id: integer("id").primaryKey(),
  title: text("name"),
  author: text("author"),
  price: integer("price"),
  image: text("image"),
});

export const shoppingCarts = sqliteTable("shopping_carts", {
  id: integer("id").primaryKey(),
  productIds: text("product_ids"),
});

export const userRelations = relations(users, ({ one }) => ({
  shoppingCarts: one(shoppingCarts),
}));
