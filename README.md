# tsgo-vs-tsc ⚡

Benchmark the performance of **TypeScript (tsc)** vs **TypeScript-Go (tsgo)** compilers.
Quickly see which compiler is faster on your project.

---

## 📦 Installation

### Global install (recommended)

Using **yarn**:

```bash
yarn global add tsgo-vs-tsc
```

Or with **npm**:

```bash
npm install -g tsgo-vs-tsc
```

Now you can run the CLI from anywhere:

```bash
tsgo-vs-tsc
```

### Local install (alternative)

If you prefer project-local usage:

```bash
yarn add -D tsgo-vs-tsc
# or
npm install --save-dev tsgo-vs-tsc
```

Then run via `npx`:

```bash
npx tsgo-vs-tsc
```

---

## 🚀 Usage

### Basic

Benchmark compilers on your default `tsconfig.json`:

```bash
tsgo-vs-tsc
```

### Custom config

Benchmark against a specific config file:

```bash
tsgo-vs-tsc ./path/to/tsconfig.build.json
```

### Local binaries

By default, the script uses the compilers bundled with this package.
To force it to run using your locally installed versions via `npx`, add the `--local` (or `-l`) flag:

```bash
tsgo-vs-tsc -l
```

---

## 📊 Example Output

```
🔬 Benchmarking TypeScript compilers on: ./tsconfig.json

📊 Results:
┌─────────┬──────────┬───────────┬───────────────┐
│ (index) │ Compiler │ Time (ms) │     Error     │
├─────────┼──────────┼───────────┼───────────────┤
│    0    │   tsc    │   520.31  │    None!      │
│    1    │  tsgo    │   133.84  │    None!      │
└─────────┴──────────┴───────────┴───────────────┘
🏆 Fastest: tsgo (133.84 ms)
```

---

## ⚙️ Options

| Flag            | Description                                                       |
| --------------- | ----------------------------------------------------------------- |
| `-l, --local`   | Use `npx tsc` and `npx tsgo` instead of package-bundled binaries. |
| `<config-path>` | Path to a custom `tsconfig.json`. Defaults to `./tsconfig.json`.  |

---

## 📌 Notes

- This tool measures compile **execution time only**.
- It does **not** check correctness of output JavaScript.
- If either compiler fails, the error is captured and displayed in the results table.

---

## 🛠 Development

Clone the repo and run locally:

```bash
yarn install
yarn build
npx tsgo-vs-tsc ./tsconfig.json
```