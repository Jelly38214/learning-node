import { DenonConfig } from "https://deno.land/x/denon@2.4.7/mod.ts";

const config: DenonConfig = {
  allow: ["net"],
  scripts: {
    start: {
      cmd: "deno run httpServer.ts",
      desc: "run my app.ts file",
    },
  },
  logger: {
    quiet: false,
    fullscreen: true,
    debug: true,
  },
};

export default config;
