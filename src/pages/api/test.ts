import type { APIRoute } from 'astro';
import { getDb, orders } from '@/db';

export const prerender = false;

export const GET: APIRoute = async ({ locals }) => {
  const db = getDb(locals.runtime.env.DB!);
  
  // Fetch all orders as a test
  const allOrders = await db.select().from(orders);
  
  return new Response(JSON.stringify({
    message: 'API is working!',
    timestamp: new Date().toISOString(),
    ordersCount: allOrders.length,
    orders: allOrders,
  }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

