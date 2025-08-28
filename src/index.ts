#!/usr/bin/env node
import { execSync } from "child_process";
import { performance } from "perf_hooks";
import * as path from "path";

function runCommand(cmd: string): number {
  const start = performance.now();
  try {
    execSync(cmd, { stdio: "ignore" });
  } catch (e) {
    console.error(`❌ Failed: ${cmd}`);
  }
  return performance.now() - start;
}

function bench(target: string) {
  console.log(`🔬 Benchmarking TypeScript compilers on: ${target}\n`);

  const absTarget = path.resolve(process.cwd(), target);

  const tscTime = runCommand(`npx tsc --project ${absTarget}`);
  const tsgoTime = runCommand(`npx tsgo --project ${absTarget}`);

  console.log("📊 Results (ms):");
  console.table([
    { Compiler: "tsc", Time: tscTime.toFixed(2) },
    { Compiler: "tsgo", Time: tsgoTime.toFixed(2) },
  ]);
}

function main() {
  const args = process.argv.slice(2);
  if (args.length === 0) {
    console.log("Usage: tsbench <path-to-tsconfig.json>");
    process.exit(1);
  }
  bench(args[0]);
}

main();
