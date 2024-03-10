ALTER TABLE "products" ALTER COLUMN "id" SET DATA TYPE serial;--> statement-breakpoint
ALTER TABLE "shopping_cart_items" ALTER COLUMN "id" SET DATA TYPE serial;--> statement-breakpoint
ALTER TABLE "shopping_cart_items" ALTER COLUMN "product_id" SET DATA TYPE serial;--> statement-breakpoint
ALTER TABLE "shopping_cart_items" ALTER COLUMN "shopping_cart_id" SET DATA TYPE serial;--> statement-breakpoint
ALTER TABLE "shopping_cart_items" ALTER COLUMN "shopping_cart_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "shopping_carts" ALTER COLUMN "id" SET DATA TYPE serial;