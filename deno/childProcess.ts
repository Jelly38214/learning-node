const fileNames: string[] = Deno.args;

const p = Deno.run({
  cmd: [
    "deno",
    "run",
    "-A",
    "https://deno.land/std/examples/cat.ts",
    ...fileNames,
  ],
  stdout: "piped", // means can communicate with stdout
  stderr: "piped",
});
const { code } = await p.status();

if (code === 0) {
  const rawOutput = await p.output();
  await Deno.stdout.write(rawOutput);
} else {
  const rawError = await p.stderrOutput();
  const errorString = new TextDecoder().decode(rawError);
  console.log(errorString);
}

Deno.exit(code);
