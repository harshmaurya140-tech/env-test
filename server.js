const express = require("express");
const path = require("path");
const { spawn } = require("child_process");

const app = express();
const PORT = process.env.PORT || 3000;
const ROOT = __dirname;
const DEMO_DIR = path.join(ROOT, "demo-project");
const BIN = path.join(
  ROOT,
  "node_modules",
  ".bin",
  process.platform === "win32" ? "envguardian.cmd" : "envguardian"
);

const ALLOWED_COMMANDS = new Set([
  "scan",
  "validate",
  "compare",
  "doctor",
  "git-check",
  "generate-example",
  "init"
]);

app.use(express.json());
app.use(express.static(path.join(ROOT, "public")));

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, package: "@ansari_mehran_24/envguardian", version: "1.0.0" });
});

app.post("/api/run", (req, res) => {
  const command = String(req.body?.command || "");
  if (!ALLOWED_COMMANDS.has(command)) {
    return res.status(400).json({ error: "Unsupported command." });
  }

  const child = spawn(BIN, [command], {
    cwd: DEMO_DIR,
    shell: false,
    env: { ...process.env, NO_COLOR: "1" }
  });

  let output = "";
  let finished = false;
  const timeout = setTimeout(() => {
    if (!finished) {
      child.kill("SIGKILL");
      output += "\nProcess stopped: execution exceeded 12 seconds.";
    }
  }, 12000);

  child.stdout.on("data", chunk => output += chunk.toString());
  child.stderr.on("data", chunk => output += chunk.toString());

  child.on("error", err => {
    finished = true;
    clearTimeout(timeout);
    res.status(500).json({ command, output: output + err.message, exitCode: 1 });
  });

  child.on("close", code => {
    if (finished) return;
    finished = true;
    clearTimeout(timeout);
    res.json({ command, output: output || "(The command produced no output.)", exitCode: code });
  });
});

app.listen(PORT, () => {
  console.log(`EnvGuardian Demo running on port ${PORT}`);
});
