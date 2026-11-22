const output = document.querySelector("#output");
const title = document.querySelector("#terminal-title");
const status = document.querySelector("#status");
const buttons = [...document.querySelectorAll("[data-command]")];

async function checkHealth() {
  try {
    const response = await fetch("/api/health");
    if (!response.ok) throw new Error("not ready");
    status.classList.add("ready");
    status.innerHTML = "<i></i> Demo online · package 1.0.0";
  } catch {
    status.innerHTML = "<i></i> Demo unavailable";
  }
}

buttons.forEach(button => button.addEventListener("click", async () => {
  const command = button.dataset.command;
  buttons.forEach(item => { item.disabled = true; item.classList.toggle("active", item === button); });
  title.textContent = `envguardian ${command}`;
  output.textContent = `Running envguardian ${command}…`;
  try {
    const response = await fetch("/api/run", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ command })
    });
    const result = await response.json();
    output.textContent = result.output || result.error || "No output.";
    if (result.exitCode !== undefined) output.textContent += `\n\n[exit code: ${result.exitCode}]`;
  } catch (error) {
    output.textContent = `Request failed: ${error.message}`;
  } finally {
    buttons.forEach(item => item.disabled = false);
  }
}));

document.querySelector("#clear").addEventListener("click", () => {
  output.textContent = "Terminal cleared. Select a command to run it.";
  title.textContent = "envguardian — ready";
  buttons.forEach(item => item.classList.remove("active"));
});

checkHealth();
