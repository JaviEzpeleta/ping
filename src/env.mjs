import { z } from "zod";

/**
 * Server-side environment variables schema.
 */
const server = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]),
  STORAGE_ACCESS_KEY: z.string(),
  STORAGE_SECRET_KEY: z.string(),
  ETHERSCAN_API_KEY: z.string(),
  POLYGONSCAN_API_KEY: z.string(),
  DONOR_WALLET: z.string(),
});

/**
 * Client-side environment variables schema
 */
const client = z.object({
  NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID: z.string(),
});

/**
 * You can't destruct `process.env` as a regular object in the Next.js edge runtimes (e.g.
 * middlewares) or client-side so we need to destruct manually.
 *
 * @type {Record<keyof z.infer<typeof server> | keyof z.infer<typeof client>, string | undefined>}
 */
const processEnv = {
  NODE_ENV: process.env.NODE_ENV,
  NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID,
  STORAGE_ACCESS_KEY: process.env.STORAGE_ACCESS_KEY,
  STORAGE_SECRET_KEY: process.env.STORAGE_SECRET_KEY,
  ETHERSCAN_API_KEY: process.env.ETHERSCAN_API_KEY,
  POLYGONSCAN_API_KEY: process.env.POLYGONSCAN_API_KEY,
  DONOR_WALLET: process.env.DONOR_WALLET,
};

const merged = server.merge(client);

/** @typedef {z.input<typeof merged>} MergedInput */
/** @typedef {z.infer<typeof merged>} MergedOutput */
/** @typedef {z.SafeParseReturnType<MergedInput, MergedOutput>} MergedSafeParseReturn */

let env = /** @type {MergedOutput} */ (process.env);

if (!!process.env.SKIP_ENV_VALIDATION === false) {
  const isServer = typeof window === "undefined";

  const parsed = /** @type {MergedSafeParseReturn} */ (
    isServer
      ? merged.safeParse(processEnv) // on server we can validate all env vars
      : client.safeParse(processEnv) // on client we can only validate the ones that are exposed
  );

  if (parsed.success === false) {
    console.error("❌ Invalid environment variables:", parsed.error.flatten().fieldErrors);
    throw new Error("Invalid environment variables");
  }

  env = new Proxy(parsed.data, {
    get(target, prop) {
      if (typeof prop !== "string") return undefined;
      // Throw a descriptive error if a server-side env var is accessed on the client
      // Otherwise it would just be returning `undefined` and be annoying to debug
      if (!isServer && !prop.startsWith("NEXT_PUBLIC_"))
        throw new Error(
          process.env.NODE_ENV === "production"
            ? "❌ Attempted to access a server-side environment variable on the client"
            : `❌ Attempted to access server-side environment variable '${prop}' on the client`,
        );
      return target[/** @type {keyof typeof target} */ (prop)];
    },
  });
}

export { env };
