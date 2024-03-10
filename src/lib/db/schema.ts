import { relations } from "drizzle-orm";
import {
  integer,
  primaryKey,
  pgTable,
  text,
  timestamp,
  serial,
} from "drizzle-orm/pg-core";
import { AdapterAccount } from "next-auth/adapters";

export const users = pgTable("user", {
  id: text("id").notNull().primaryKey(),
  name: text("name"),
  email: text("email").notNull(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
});

export const accounts = pgTable(
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
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  }),
);

export const shoppingCarts = pgTable("shopping_carts", {
  id: serial("id").primaryKey(),
  userId: text("user_id").references(() => users.id),
});

export const shoppingCartRelations = relations(shoppingCarts, ({ many }) => ({
  shoppingCartItems: many(shoppingCartItems),
}));

export const shoppingCartItems = pgTable("shopping_cart_items", {
  id: serial("id").primaryKey(),
  productId: serial("product_id")
    .notNull()
    .references(() => products.id),
  quantity: integer("quantity").notNull(),
  shoppingCartId: serial("shopping_cart_id").references(() => shoppingCarts.id),
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

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  author: text("author").notNull(),
  price: integer("price").notNull(),
  image: text("image").notNull(),
});

export const sessions = pgTable("session", {
  sessionToken: text("sessionToken").notNull().primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const verificationTokens = pgTable(
  "verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
  }),
);
