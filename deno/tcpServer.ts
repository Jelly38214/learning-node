const listener = Deno.listen({ port: 8080 });

for await (const conn of listener) {
  console.log('Listened')
  Deno.copy(conn, conn);
}
