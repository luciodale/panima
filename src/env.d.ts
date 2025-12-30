/// <reference types="astro/client" />

interface Env {
  DB?: D1Database;
  // Add more bindings as needed (e.g., R2, KV, secrets)
}

type Runtime = import('@astrojs/cloudflare').Runtime<Env>;

declare namespace App {
  interface Locals extends Runtime {}
}

