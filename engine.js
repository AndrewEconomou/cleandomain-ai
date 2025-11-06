/* === CleanDomain.ai Engine v3.0 === */
/* Full output restored + ChatGPT-style smooth reveal + blinking cursor */

document.addEventListener("DOMContentLoaded", () => {
  const outputEl = document.getElementById("engine-output");
  const runBtn = document.getElementById("run-engine");

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  function addCursor() {
    const cursor = document.createElement("span");
    cursor.className = "cursor";
    cursor.textContent = "█";
    outputEl.appendChild(cursor);
  }
  function removeCursor() {
    const cursor = outputEl.querySelector(".cursor");
    if (cursor) cursor.remove();
  }

  async function generateOutput() {
    outputEl.textContent = "";
    removeCursor();
    addCursor();

    const lines = [
      "⚙️ Initializing engine...",
      "🔍 Analyzing context...",
      "🧠 Generating insights...",
      "",
      "CleanDomain Engine v3.0 active.",
      "This build restores full output length and adds a smooth ChatGPT-style reveal.",
      "",
      "Output length and clarity fully reinstated.",
      "",
      "✅ Process complete — ready for next query."
    ];

    for (const line of lines) {
      const cursor = outputEl.querySelector(".cursor");
      cursor?.remove();
      outputEl.textContent += line + "\n";
      addCursor();
      await sleep(450);
    }

    await sleep(600);
    removeCursor();
    outputEl.classList.add("show");
  }

  runBtn?.addEventListener("click", generateOutput);
});
