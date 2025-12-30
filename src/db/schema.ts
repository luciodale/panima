import { integer, real, sqliteTable, text } from 'drizzle-orm/sqlite-core';

// Orders table - linked to Clerk users via email
export const orders = sqliteTable('orders', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  
  // Customer info (from Clerk)
  customerEmail: text('customer_email').notNull(),
  customerName: text('customer_name'),
  customerPhone: text('customer_phone'),
  
  // Order details
  status: text('status', { 
    enum: ['pending', 'confirmed', 'ready', 'completed', 'cancelled'] 
  }).notNull().default('pending'),
  
  // Pickup date/time
  pickupDate: text('pickup_date').notNull(), // ISO date string
  pickupTimeSlot: text('pickup_time_slot'), // e.g., "10:00-12:00"
  
  // Order notes
  notes: text('notes'),
  
  // Pricing
  totalAmount: real('total_amount'),
  
  // Timestamps
  createdAt: text('created_at').notNull().$defaultFn(() => new Date().toISOString()),
  updatedAt: text('updated_at').notNull().$defaultFn(() => new Date().toISOString()),
});

// Order items - individual bread items in an order
export const orderItems = sqliteTable('order_items', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  orderId: integer('order_id').notNull().references(() => orders.id, { onDelete: 'cascade' }),
  
  // Product info
  breadType: text('bread_type').notNull(), // e.g., "Classico", "Integrale"
  quantity: integer('quantity').notNull().default(1),
  unitPrice: real('unit_price'),
  
  // Notes for this specific item
  notes: text('notes'),
});

// Types
export type Order = typeof orders.$inferSelect;
export type NewOrder = typeof orders.$inferInsert;
export type OrderItem = typeof orderItems.$inferSelect;
export type NewOrderItem = typeof orderItems.$inferInsert;

