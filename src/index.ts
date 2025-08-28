#!/usr/bin/env node
import { execSync } from "child_process";
import { performance } from "perf_hooks";
import * as path from "path";

function runCommand(cmd: string): number {
  const start = performance.now();
  execSync(cmd, { stdio: "pipe" });
  return performance.now() - start;
}

function bench(target: string, local: boolean) {
  console.log(`🔬 Benchmarking TypeScript compilers on: ${target}\n`);
  const res = [
    { Compiler: "tsc", "Time (ms)": 0, Error: "None!" },
    { Compiler: "tsgo", "Time (ms)": 0, Error: "None!" },
  ];

  const absTarget = path.resolve(process.cwd(), target);

  // Pick command based on local flag
  const binDir = path.resolve(__dirname, "../node_modules/.bin");
  const tscCmd = local ? "npx tsc" : path.join(binDir, "tsc");
  const tsgoCmd = local ? "npx tsgo" : path.join(binDir, "tsgo");

  try {
    const tscTime = runCommand(`${tscCmd} --project ${absTarget}`);
    res[0]["Time (ms)"] = Number(tscTime.toFixed(2));
  } catch (e) {
    res[0]["Error"] = e instanceof Error ? e.message : String(e);
  }

  try {
    const tsgoTime = runCommand(`${tsgoCmd} --project ${absTarget}`);
    res[1]["Time (ms)"] = Number(tsgoTime.toFixed(2));
  } catch (e) {
    res[1]["Error"] = e instanceof Error ? e.message : String(e);
  }

  console.log("📊 Results:");
  console.table(res);
}

function main() {
  const args = process.argv.slice(2);

  let local = false;
  const filteredArgs: string[] = [];

  for (const arg of args) {
    if (arg === "-l" || arg === "--local") {
      local = true;
    } else {
      filteredArgs.push(arg);
    }
  }

  if (filteredArgs.length === 0) {
    console.log("Defaulting to './tsconfig.json'");
    filteredArgs.push("./tsconfig.json");
  }

  bench(filteredArgs[0], local);
}

main();
