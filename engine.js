/* === CleanDomain.ai Engine v3.1 === */
/* Restores full output + ChatGPT-style reveal + domain search simulation */

document.addEventListener("DOMContentLoaded", () => {
  const outputEl = document.getElementById("engine-output");
  const runBtn = document.getElementById("run-engine");
  const searchBtn = document.getElementById("search-btn");
  const domainInput = document.getElementById("domain-input");
  const searchResults = document.getElementById("search-results");

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
      "CleanDomain Engine v3.1 active.",
      "Smooth ChatGPT-style output restored.",
      "Output length and clarity verified.",
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

  // Domain search simulation
  function fakeDomainScore() {
    return (Math.random() * 100).toFixed(2);
  }

  function searchDomain() {
    const domain = domainInput.value.trim();
    searchResults.textContent = "";
    if (!domain) {
      searchResults.textContent = "❗ Please enter a domain.";
      return;
    }

    const score = fakeDomainScore();
    const result = `
🔎 Domain: ${domain}
💡 CleanDomain Score: ${score}/100
📊 Status: ${score > 80 ? "Excellent" : score > 60 ? "Good" : "Average"}
✅ Analysis complete.
    `;
    searchResults.textContent = result;
  }

  runBtn?.addEventListener("click", generateOutput);
  searchBtn?.addEventListener("click", searchDomain);
});
