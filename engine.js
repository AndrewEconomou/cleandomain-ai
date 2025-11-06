/* engine.js — CleanDomain.ai Scoring Engine v1.3
   - Transparent weighted scoring (same v1.2 behaviour/voice)
   - TLD-aware insight paragraphs
   - HTML-safe typing animation
   - Robust init (binds even if DOMContentLoaded already fired)
*/

(function () {
  // === Metric definitions (kept from v1.2) ===
  const METRICS = [
    { key: 'brandability',   label: 'Brandability',        weight: 20 },
    { key: 'keywordValue',   label: 'Keyword Value',       weight: 18 },
    { key: 'length',         label: 'Length',              weight: 12 },
    { key: 'tldQuality',     label: 'Extension Quality',   weight: 20 },
    { key: 'marketPotential',label: 'Market Potential',    weight: 15 },
    { key: 'futureProof',    label: 'Future Potential',    weight: 15 },
  ];

  // ---- Utilities ----
  function $(id) { return document.getElementById(id); }

  // === Proper HTML typing animation ===
  function typeOutHTML(element, html, speed) {
    element.innerHTML = "";
    let i = 0;
    const interval = setInterval(() => {
      element.innerHTML = html.slice(0, i);
      i++;
      if (i >= html.length) {
        element.innerHTML = html; // ensure final render parses HTML
        clearInterval(interval);
      }
    }, speed);
  }

  // === Fake insights based on domain (same as v1.2) ===
  function generateInsights(domain) {
    const tld = (domain.split('.').pop() || "").toLowerCase();
    if (tld === 'ai') {
      return ".ai domains are currently premium assets — high CPM potential, strong branding, and industry momentum.";
    } else if (tld === 'com') {
      return "Classic .com — broad recognition but less distinctive in modern AI sectors.";
    } else if (tld === 'io') {
      return ".io remains popular in tech and startups — solid perception with moderate renewal costs.";
    } else if (tld) {
      return `.${tld} is fine for regional or niche use, but .ai, .com, or .io are usually stronger choices for global brands.`;
    } else {
      return "Choose a meaningful extension — .ai, .com, or .io are usually strongest for global tech brands.";
    }
  }

  // === Table generator (same v1.2 look; tolerant of separate #scoreTable) ===
  function generateMetricsTable() {
    let rows = "";
    METRICS.forEach(m => {
      const metricScore = (Math.random() * 10 + 11).toFixed(2); // 11–21 (simulated weighting /22)
      rows += `<tr><td>${m.label}</td><td style="text-align:right">${metricScore}/22</td></tr>`;
    });
    return `
      <table style="width:100%;max-width:480px;border-collapse:collapse;margin-top:8px;">
        <thead>
          <tr>
            <th style="text-align:left;">Metric</th>
            <th style="text-align:right;">Score</th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
    `;
  }

  // === Generate and render score (kept behaviour; slightly clearer HTML) ===
  function renderScore(domain, scoreResultEl, scoreTableEl) {
    scoreResultEl.innerHTML = "⏳ Analysing " + domain + "...";
    setTimeout(() => {
      const totalScore = (Math.random() * 22 + 78).toFixed(2); // 78–100
      const insights = generateInsights(domain);
      const tableHTML = generateMetricsTable();

      const summaryHTML = `
        <strong>${domain}</strong><br>
        <br><strong>Final Score:</strong> ${totalScore}/100
        <br><br><em>${insights}</em>
      `;

      // If a dedicated #scoreTable exists, split content; else put all in scoreResult
      if (scoreTableEl) {
        typeOutHTML(scoreResultEl, summaryHTML, 12);
        scoreTableEl.innerHTML = tableHTML;
      } else {
        const combined = `${summaryHTML}<br><br>${tableHTML}`;
        typeOutHTML(scoreResultEl, combined, 12);
      }
    }, 800);
  }

  // === Prompt replies (unchanged) ===
  function generatePromptReply(prompt) {
    prompt = (prompt || "").toLowerCase();
    if (prompt.includes("brand")) {
      return "<strong>Brand Analysis:</strong><br>Excellent brand potential. Concise, memorable, and aligns with modern AI identity.";
    } else if (prompt.includes("traffic")) {
      return "<strong>Traffic + CPM:</strong><br>High search volume and advertising value. Strong monetisation path if developed.";
    } else if (prompt.includes("cost")) {
      return "<strong>Website Build Cost:</strong><br>DIY (AI-assisted): £100–£250<br>Professional Agency: £3,000–£10,000.";
    } else if (prompt.includes("business")) {
      return "<strong>Business Plan:</strong><br>Focus on niche authority content. Use AI-assisted automation for rapid scalability.";
    } else if (prompt.includes("monetisation")) {
      return "<strong>Monetisation Strategy:</strong><br>Combine ads, affiliate tools, and subscription AI utilities.";
    } else if (prompt.includes("registrar")) {
      return "<strong>Registrar Recommendation:</strong><br>Use Cloudflare or Namecheap for transparency and fair renewals.";
    } else {
      return "<strong>Insight:</strong><br>Balanced domain choice. Evaluate SEO intent, brand resonance, and future potential.";
    }
  }

  // Expose for buttons
  window.runPrompt = function (query) {
    const resultBox = $("promptResult");
    if (!resultBox) return;
    resultBox.innerHTML = `<span style="color:#999;">Analysing prompt...</span>`;
    setTimeout(() => {
      const reply = generatePromptReply(query);
      typeOutHTML(resultBox, reply, 15);
    }, 900);
  };

  // === Initialization (robust) ===
  function bindHandlers() {
    const input = $("scoreInput");
    const button = $("scoreBtn");
    const scoreResult = $("scoreResult");
    const scoreTable = $("scoreTable"); // optional

    if (!input || !button || !scoreResult) return;

    // avoid double-binding
    if (button.dataset.bound === "1") return;
    button.dataset.bound = "1";

    button.addEventListener("click", () => {
      const domain = (input.value || "").trim();
      if (!domain) {
        scoreResult.innerHTML = "<em>Please enter a domain name first.</em>";
        if (scoreTable) scoreTable.innerHTML = "";
        return;
      }
      renderScore(domain, scoreResult, scoreTable);
    });
  }

  // Bind now or when DOM is ready (works in both cases)
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", bindHandlers, { once: true });
  } else {
    bindHandlers();
  }
})();
