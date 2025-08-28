#!/usr/bin/env node
import { execSync } from "child_process";
import { performance } from "perf_hooks";
import * as path from "path";

function runCommand(cmd: string): number {
  const start = performance.now();
  execSync(cmd, { stdio: "pipe" });
  return performance.now() - start;
}

function bench(target: string) {
  console.log(`🔬 Benchmarking TypeScript compilers on: ${target}\n`);
  const res = [
    { Compiler: "tsc", "Time (ms)": 0, Error: "None!" },
    { Compiler: "tsgo", "Time (ms)": 0, Error: "None!" },
  ];
  const absTarget = path.resolve(process.cwd(), target);
  try {
    const tscTime = runCommand(`npx tsc --project ${absTarget}`);
    res[0]["Time (ms)"] = Number(tscTime.toFixed(2));
  } catch (e) {
    res[0]["Error"] = e instanceof Error ? e.message : String(e);
  }
  try {
    const tsgoTime = runCommand(`npx tsgo --project ${absTarget}`);
    res[1]["Time (ms)"] = Number(tsgoTime.toFixed(2));
  } catch (e) {
    res[1]["Error"] = e instanceof Error ? e.message : String(e);
  }
  console.log("📊 Results:");
  console.table(res);
}

function main() {
  const args = process.argv.slice(2);
  if (args.length === 0) {
    console.log("Defaulting to './tsconfig.json'");
    args.push("./tsconfig.json");
  }
  bench(args[0]);
}

main();
