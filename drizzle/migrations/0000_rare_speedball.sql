CREATE TABLE `order_items` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`order_id` integer NOT NULL,
	`bread_type` text NOT NULL,
	`quantity` integer DEFAULT 1 NOT NULL,
	`unit_price` real,
	`notes` text,
	FOREIGN KEY (`order_id`) REFERENCES `orders`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `orders` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`customer_email` text NOT NULL,
	`customer_name` text,
	`customer_phone` text,
	`status` text DEFAULT 'pending' NOT NULL,
	`pickup_date` text NOT NULL,
	`pickup_time_slot` text,
	`notes` text,
	`total_amount` real,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL
);
