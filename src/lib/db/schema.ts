import { relations } from "drizzle-orm";
import {
  integer,
  primaryKey,
  sqliteTable,
  text,
} from "drizzle-orm/sqlite-core";
import { AdapterAccount } from "next-auth/adapters";

export const users = sqliteTable("user", {
  id: text("id").notNull().primaryKey(),
  name: text("name"),
  email: text("email").notNull(),
  emailVerified: integer("emailVerified", { mode: "timestamp_ms" }),
  image: text("image"),
});

export const accounts = sqliteTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccount["type"]>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => ({
    compoundKey: primaryKey(account.provider, account.providerAccountId),
  }),
);

export const shoppingCarts = sqliteTable("shopping_carts", {
  id: integer("id").primaryKey(),
  userId: text("user_id").references(() => users.id),
});

export const shoppingCartRelations = relations(shoppingCarts, ({ many }) => ({
  shoppingCartItems: many(shoppingCartItems),
}));

export const shoppingCartItems = sqliteTable("shopping_cart_items", {
  id: integer("id").primaryKey(),
  productId: integer("product_id")
    .notNull()
    .references(() => products.id),
  quantity: integer("quantity").notNull(),
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
  title: text("name").notNull(),
  author: text("author").notNull(),
  price: integer("price").notNull(),
  image: text("image").notNull(),
});

export const sessions = sqliteTable("session", {
  sessionToken: text("sessionToken").notNull().primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: integer("expires", { mode: "timestamp_ms" }).notNull(),
});

export const verificationTokens = sqliteTable(
  "verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: integer("expires", { mode: "timestamp_ms" }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey(vt.identifier, vt.token),
  }),
);
