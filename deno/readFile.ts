// Read files specified by command args
for (let i = 0; i < Deno.args.length; i++) {
  const fileName: string = Deno.args[i];
  const file: Deno.File = await Deno.open(fileName);

  await Deno.copy(file, Deno.stdout);
  file.close();
}
