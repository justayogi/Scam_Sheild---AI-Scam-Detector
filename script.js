// Comprehensive scam keyword database
const scamDatabase = {
  keywords: [
    // Urgency & Time pressure
    "urgent", "immediately", "asap", "limited time", "act now", "expires", "deadline",
    
    // Account & Authentication
    "verify", "confirm", "validate", "authenticate", "account", "suspended", "locked",
    "compromised", "unauthorized", "unusual activity",
    
    // Financial & Banking
    "bank", "credit card", "debit card", "payment", "transfer", "wire", "funds",
    "billing", "invoice", "refund", "charge", "transaction",
    
    // Personal Information
    "password", "social security", "ssn", "date of birth", "personal info", "identity",
    "confirm identity", "verify identity", "personal information",
    
    // Clickbait & Links
    "click here", "click link", "open link", "download", "update", "install",
    "re-enter", "resubmit",
    
    // Prize & Rewards (too good to be true)
    "congratulations", "won", "prize", "winner", "claim", "reward", "free",
    "selected", "lucky",
    
    // Authority Impersonation
    "i.r.s", "irs", "fbi", "police", "federal", "government", "official",
    
    // Action Required
    "required", "must", "need to", "have to", "immediately action"
  ],

  descriptions: {
    low: "✅ This message appears safe. No common scam indicators detected.",
    medium: "⚠️ Be cautious. Some warning signs detected. Don't share personal info.",
    high: "🚨 WARNING! Multiple scam indicators. Do NOT click links or share info."
  }
};

function analyse() {
  const inputText = document.getElementById("inputText").value.trim();

  // Validation
  if (!inputText) {
    alert("Please paste a message to analyse");
    return;
  }

  // Convert to lowercase for matching
  const lowerText = inputText.toLowerCase();

  // Count keyword matches
  let matchedKeywords = [];
  let score = 0;

  scamDatabase.keywords.forEach(keyword => {
    if (lowerText.includes(keyword)) {
      matchedKeywords.push(keyword);
      score++;
    }
  });

  // Remove duplicates
  matchedKeywords = [...new Set(matchedKeywords)];

  // Determine risk level
  let riskLevel, riskBadgeClass, explanation;

  if (score === 0) {
    riskLevel = "🟢 LOW RISK";
    riskBadgeClass = "risk-low";
    explanation = scamDatabase.descriptions.low;
  } else if (score <= 3) {
    riskLevel = "🟠 MEDIUM RISK";
    riskBadgeClass = "risk-medium";
    explanation = scamDatabase.descriptions.medium;
  } else {
    riskLevel = "🔴 HIGH RISK";
    riskBadgeClass = "risk-high";
    explanation = scamDatabase.descriptions.high;
  }

  // Display results
  displayResults(riskLevel, riskBadgeClass, explanation, matchedKeywords, score);
}

function displayResults(riskLevel, badgeClass, explanation, keywords, score) {
  const resultContainer = document.getElementById("resultContainer");
  const riskBadge = document.getElementById("riskBadge");
  const explanationDiv = document.getElementById("explanation");

  // Build result text
  let resultHTML = `
    <p>${explanation}</p>
    <p style="margin-top: 15px; font-size: 0.95em;"><strong>Indicators Found: ${score}</strong></p>
  `;

  if (keywords.length > 0) {
    resultHTML += `<p style="margin-top: 10px; font-size: 0.9em; color: #666;">
      <strong>Detected Keywords:</strong> ${keywords.slice(0, 5).join(", ")} ${keywords.length > 5 ? "..." : ""}
    </p>`;
  }

  // Update UI
  riskBadge.textContent = riskLevel;
  riskBadge.className = "risk-badge " + badgeClass;
  explanationDiv.innerHTML = resultHTML;
  resultContainer.classList.remove("hidden");

  // Scroll to results
  setTimeout(() => {
    resultContainer.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, 100);
}

function reset() {
  document.getElementById("inputText").value = "";
  document.getElementById("resultContainer").classList.add("hidden");
  document.getElementById("inputText").focus();
}

// Allow Enter key to submit (Ctrl+Enter or Cmd+Enter)
document.addEventListener("DOMContentLoaded", () => {
  const textarea = document.getElementById("inputText");
  textarea.addEventListener("keydown", (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
      analyse();
    }
  });
});