/* engine.js — CleanDomain.ai Scoring Engine v1.0 (Production Table)
   - Transparent weighted scoring
   - TLD guidance (.ai, .com, .io) + sensible defaults for others
   - Works with #scoreBtn/#scoreInput and the existing "Score" button for #engineInput
*/

(function () {
  // ===== Metric configuration =====
  const METRICS = [
    { key: 'brandability',         label: 'Brandability',              weight: 20 },
    { key: 'keywordValue',         label: 'Keyword Value',             weight: 12 },
    { key: 'length',               label: 'Length',                    weight: 

     function runPrompt(query) {
  const resultBox = document.getElementById("promptResult");
  resultBox.innerHTML = "⏳ Analysing: " + query + "...";

  setTimeout(() => {
    // For now it just simulates the output
    const score = (Math.random() * (9.8 - 7.2) + 7.2).toFixed(1);
    resultBox.innerHTML = `💡 <strong>${query}</strong><br><br>Estimated Intelligence Score: <strong>${score}/10</strong><br><br><em>Insight:</em> ${query.includes('monetisation') ? 'Diversify revenue via ads, affiliate tools, and premium reports.' : 'This domain has strong potential — focus on SEO, value delivery, and user trust.'}`;
  }, 900);
}

     // === AI Typing Simulation for Quick Prompts ===
function runPrompt(promptText) {
  const resultBox = document.getElementById("promptResult");
  if (!resultBox) return;

  // Simulate “thinking” animation
  resultBox.innerHTML = `<span style="color:#999;">Analysing prompt...</span>`;
  
  setTimeout(() => {
    const fakeReply = generateFakeResponse(promptText);
    typeOut(resultBox, fakeReply, 25); // speed in ms per character
  }, 1200);
}

// Generate a fake AI reply (demo logic — replace with live output later)
function generateFakeResponse(prompt) {
  if (prompt.toLowerCase().includes("brand")) {
    return "Score: 9.2/10 — Excellent brand potential. The name is concise, memorable, and aligns with the .ai trend.";
  } else if (prompt.toLowerCase().includes("traffic")) {
    return "Traffic potential: 8.5/10 — High search volume keywords with competitive CPM. Strong for monetisation.";
  } else if (prompt.toLowerCase().includes("cost")) {
    return "Estimated build cost: $150–$300 (AI-assisted DIY) or $3K–$10K (professional agency).";
  } else if (prompt.toLowerCase().includes("business")) {
    return "Business plan: Focus on niche authority content, SEO + AI integration. Aim for ad revenue + affiliate income.";
  } else if (prompt.toLowerCase().includes("monetisation")) {
    return "Monetisation strategy: Combine ads, subscriptions, AI tool integrations, and premium reports.";
  } else if (prompt.toLowerCase().includes("registrar")) {
    return "Recommendation: Use Cloudflare for transparent pricing and reliability. Avoid teaser-rate traps.";
  } else {
    return "Insight: A solid domain choice. Evaluate branding strength, traffic intent, and long-term positioning.";
  }
}

// Typing animation
function typeOut(element, text, speed) {
  element.innerHTML = "";
  let i = 0;
  const interval = setInterval(() => {
    element.innerHTML += text.charAt(i);
    i++;
    if (i >= text.length) clearInterval(interval);
  }, speed);
}
