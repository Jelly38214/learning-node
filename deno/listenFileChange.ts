const watcher: AsyncIterableIterator<Deno.FsEvent> = Deno.watchFs("./");

for await (const event of watcher) {
  console.log(">>> event", event); // Trigger twice when modify a file, seems unusual.
}
