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
