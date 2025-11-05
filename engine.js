// CleanDomain.ai – Demo Fair-Value Engine v1.0
// Lightweight front-end scorer (illustrative only)

document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("scoreInput");
  const button = document.getElementById("scoreBtn");
  const resultBox = document.createElement("div");
  resultBox.style.marginTop = "12px";
  resultBox.style.fontWeight = "600";
  resultBox.style.fontSize = "1.1em";
  document.body.appendChild(resultBox);

  if (!input || !button) return;

  button.addEventListener("click", () => {
    const domain = input.value.trim();
    if (!domain) {
      resultBox.textContent = "Please enter a domain.";
      resultBox.style.color = "gray";
      return;
    }

    // --- Simple demo scoring logic ---
    let score = 50;
    if (domain.includes("ai")) score += 25;
    if (domain.includes("iq")) score += 15;
    if (domain.length <= 10) score += 10;
    if (domain.includes("fx") || domain.includes("forex")) score += 15;

    score = Math.min(100, score);
    let color = "orange";
    if (score >= 85) color = "green";
    else if (score >= 70) color = "gold";

    resultBox.innerHTML = `<span style="color:${color}">Score: ${score}/100</span>`;
  });
});
