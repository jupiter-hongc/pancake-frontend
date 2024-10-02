import pino from "pino";

export const logger = pino({
  level: import.meta.env.DEV ? "info" : "error",
  browser: {
    asObject: true,
    serialize: true,
  },
});

// @ts-expect-error - inject logger instance to global
globalThis.__logger__ = logger;
