// CleanDomain.ai Demo Engine
// Lightweight front-end scorer for domain quality demonstration
// (Not production-grade — illustrative logic for scoring framework)

document.addEventListener("DOMContentLoaded", () => {
  const input = document.querySelector("input[placeholder='e.g., marketnews.ai']");
  const button = document.querySelector("button, input[type='button'], input[type='submit']");
  const resultBox = document.createElement("p");
  resultBox.style.marginTop = "12px";
  resultBox.style.fontWeight = "600";
  resultBox.style.fontSize = "1.1em";
  document.body.appendChild(resultBox);

  if (!input || !button) return;

  button.addEventListener("click", (e) => {
    e.preventDefault();
    const domain = input.value.trim().toLowerCase();
    if (!domain) {
      resultBox.textContent = "Please enter a domain to score.";
      return;
    }

    // Basic scoring metrics
    let score = 50;

    // 1. Shorter domains = higher score
    if (domain.length < 10) score += 20;
    else if (domain.length < 15) score += 10;

    // 2. Presence of “ai”, “iq”, or “tech” keywords
    if (domain.includes("ai")) score += 10;
    if (domain.includes("iq")) score += 8;
    if (domain.includes("tech")) score += 6;

    // 3. Strong financial or innovation keywords
    const strongWords = ["crypto", "forex", "finance", "trade", "invest", "clean", "domain"];
    for (const word of strongWords) {
      if (domain.includes(word)) score += 5;
    }

    // 4. Remove outliers
    score = Math.min(100, Math.max(0, score));

    // Display result
    resultBox.textContent = `💡 Domain Score for "${domain}": ${score}/100`;
  });
});
