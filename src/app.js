const profiles = {
  saas: {
    label: "SaaS",
    spend: "$18,400/mo",
    risk: "High",
    stack: ["Claude Code", "Cursor", "GitHub Actions", "Notion", "Zapier"],
    issues: ["Agentic dev spend has no team budget", "Stale repo context is reused across tasks", "No traceability from prompt to PR"],
    recommendations: ["LiteLLM gateway", "Langfuse tracing", "Local code-review route", "Approval gate for repo writes"],
    sprint: "Deploy a coding-agent gateway, tag spend by developer and repo, then benchmark local models for review, tests, and docs."
  },
  recruiting: {
    label: "Recruiting",
    spend: "$7,900/mo",
    risk: "Critical",
    stack: ["AI ATS", "Gmail", "Calendly", "HubSpot", "ChatGPT"],
    issues: ["Candidates fall into black-hole states", "No human approval for rejection messaging", "Duplicate automations update the same record"],
    recommendations: ["Candidate status ledger", "Human approval queues", "ATS event tracing", "Fallback handoff rules"],
    sprint: "Map the candidate journey, build a triage workflow, and add status visibility before adding more AI agents."
  },
  healthcare: {
    label: "Healthcare",
    spend: "$11,200/mo",
    risk: "Critical",
    stack: ["ChatGPT", "EHR exports", "Support inbox", "Sheets", "Slack"],
    issues: ["Sensitive data boundaries are unclear", "Staff use public tools for summarization", "No access policy by workflow"],
    recommendations: ["Private model route", "PII/PHI redaction layer", "Role-based access", "Audit logs"],
    sprint: "Create a safe summarization and support triage path with clear data rules, logs, and local/private routing."
  },
  manufacturing: {
    label: "Manufacturing",
    spend: "$5,600/mo",
    risk: "Medium",
    stack: ["Excel", "ERP", "Teams", "Maintenance logs", "ChatGPT"],
    issues: ["Knowledge lives in spreadsheets", "Maintenance notes are not searchable", "No standard workflow owner"],
    recommendations: ["Internal knowledge assistant", "Document ingestion", "Ops dashboard", "Scheduled report agent"],
    sprint: "Turn recurring maintenance, safety, and reporting workflows into governed assistants with observable outputs."
  }
};

const formatCurrency = (value) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value);

function renderProfile(profileKey) {
  const profile = profiles[profileKey];
  const metrics = document.getElementById("profileMetrics");
  const canvas = document.getElementById("opsCanvas");

  metrics.innerHTML = `
    <div class="metric-card"><small>Likely AI spend</small><strong>${profile.spend}</strong></div>
    <div class="metric-card"><small>Operational risk</small><strong>${profile.risk}</strong></div>
    <div class="metric-card"><small>First deliverable</small><strong>10-day audit</strong></div>
  `;

  canvas.innerHTML = `
    <article class="canvas-card">
      <h4>Current stack</h4>
      <ul>${profile.stack.map((item) => `<li>${item}</li>`).join("")}</ul>
    </article>
    <article class="canvas-card issue">
      <h4>Issues found</h4>
      <ul>${profile.issues.map((item) => `<li>${item}</li>`).join("")}</ul>
    </article>
    <article class="canvas-card recommend">
      <h4>Recommended controls</h4>
      <ul>${profile.recommendations.map((item) => `<li>${item}</li>`).join("")}</ul>
    </article>
    <article class="canvas-card sprint">
      <h4>Deployment sprint</h4>
      <p>${profile.sprint}</p>
      <strong>${profile.label} teams should sell the audit internally as risk reduction plus operating leverage.</strong>
    </article>
  `;
}

function attachProfileSelector() {
  document.querySelectorAll(".segment").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll(".segment").forEach((item) => item.classList.remove("active"));
      button.classList.add("active");
      renderProfile(button.dataset.profile);
    });
  });
}

function calculateSpend() {
  const developers = Number(document.getElementById("developers").value);
  const contextSize = Number(document.getElementById("contextSize").value);
  const agents = Number(document.getElementById("agents").value);

  const current = Math.round((developers * 210) + (contextSize * 11.5) + (agents * 640));
  const routed = Math.round(current * (0.26 + Math.min(0.18, agents / 120)));
  const savings = Math.max(0, current - routed);
  const percent = current > 0 ? Math.round((savings / current) * 100) : 0;

  document.getElementById("developersValue").textContent = developers;
  document.getElementById("contextValue").textContent = `${contextSize}k`;
  document.getElementById("agentsValue").textContent = agents;
  document.getElementById("currentSpend").textContent = formatCurrency(current);
  document.getElementById("routedSpend").textContent = formatCurrency(routed);
  document.getElementById("savingsSpend").textContent = formatCurrency(savings);
  document.getElementById("savingsBar").style.width = `${Math.min(92, Math.max(8, percent))}%`;
}

function attachSpendSimulator() {
  ["developers", "contextSize", "agents"].forEach((id) => {
    document.getElementById(id).addEventListener("input", calculateSpend);
  });
  calculateSpend();
}

function renderScore() {
  const form = document.getElementById("assessmentForm");
  const data = new FormData(form);
  const hasProdAccess = data.has("productionAccess");
  const hasSpendTracking = data.has("spendTracking");
  const hasApprovalFlows = data.has("approvalFlows");

  let score = 58;
  if (hasProdAccess) score -= 18;
  if (hasSpendTracking) score += 24;
  if (hasApprovalFlows) score += 26;
  if (hasProdAccess && !hasApprovalFlows) score -= 18;
  score = Math.max(0, Math.min(100, score));

  let risk = "MEDIUM RISK";
  let firstMove = "Run an AI Ops Audit and document the first three workflows that need ownership.";
  if (score < 45) {
    risk = "HIGH RISK";
    firstMove = "Install governance immediately: approval workflows, access rules, and model-call tracing.";
  } else if (score >= 75) {
    risk = "CONTROLLED";
    firstMove = "Move into optimization: routing, local models, evals, and workflow-specific ROI reporting.";
  }

  document.getElementById("scoreOutput").innerHTML = `
    <span class="risk-label">${risk}</span>
    <div class="score-number">${score}/100</div>
    <p>${firstMove}</p>
    <a class="button button-small" href="mailto:hello@snakepit.dev?subject=Snakepit%20Score%20${score}">Send score to Snakepit</a>
  `;
}

function attachAssessment() {
  const form = document.getElementById("assessmentForm");
  form.addEventListener("change", renderScore);
  renderScore();
}

attachProfileSelector();
attachSpendSimulator();
attachAssessment();
renderProfile("saas");
