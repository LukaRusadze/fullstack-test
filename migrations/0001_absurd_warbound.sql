CREATE TABLE `products` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text,
	`author` text,
	`price` integer,
	`image` text
);
--> statement-breakpoint
CREATE TABLE `shopping_cart_items` (
	`id` integer PRIMARY KEY NOT NULL,
	`product_id` integer,
	`quantity` integer,
	`shopping_cart_id` integer,
	FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`shopping_cart_id`) REFERENCES `shopping_carts`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `shopping_carts` (
	`id` integer PRIMARY KEY NOT NULL,
	`user_id` integer,
	`shopping_cart_item_id` integer,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`shopping_cart_item_id`) REFERENCES `shopping_cart_items`(`id`) ON UPDATE no action ON DELETE no action
);
