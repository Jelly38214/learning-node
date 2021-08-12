/**
 * Deno supports browser compatible lifecycle events: load and unload
 * You can use these events to provide setup and cleanup code in your program.
 * Listeners for load events can be asynchronous and will be awaited.
 * BUT listeners for unload events need to be synchronous.
 * Both events cannot be cancelled.
 */
import "./imported.ts";
const handler = (event: Event): void => {
  console.log(`got ${event.type} event in event handler (main)`);
};

window.addEventListener("load", handler);

window.addEventListener("unload", handler);

/**
 * Can use both window.addEventListener and window.onXX to define handlers for event.
 * But there is a major difference between them:
 * 1. onXX is executed first then addEventListener
 * 2. only the last loaded window.xxx events will be executed.
 * 3. can register multiple addEventListeners for the same event and all of them will be executed totally.
 */
window.onload = (event: Event): void => {
  console.log(`got ${event.type} event in onload function (main)`);
};

window.onunload = (event: Event): void => {
  console.log(`got ${event.type} event in onunload function (main)`);
};

console.log("log from main script");
