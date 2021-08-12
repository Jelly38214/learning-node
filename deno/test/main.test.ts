/**
 * Deno has a built-in test runner that you can use for testing Javascript or Typescript code.
 * There are useful assertion utilities at `https://deno.land/std/testing` to make testing easier
 */
import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { delay } from "https://deno.land/std@/async/delay.ts";

// To define a test you need to call `Deno.test` with a name and function to be tested.
Deno.test("Hello world", () => {
  const x = 1 + 2;

  if (x !== 3) {
    throw Error("x should be equal to 3");
  }

  assertEquals(x, 3);
});

// Async function
Deno.test("Async hello world", async () => {
  const x = 1 + 2;

  // await some async test
  await delay(100);

  if (x !== 3) {
    throw Error("x should be equal to 3");
  }
});
