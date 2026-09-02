/**
 * Utility functions for the RA.OS Portfolio
 * Separated for testing and reusability
 */

/**
 * Escape HTML special characters to prevent XSS attacks
 * Used whenever user input or untrusted data is rendered as HTML
 * @param {string} s - The string to escape
 * @returns {string} - The escaped HTML-safe string
 */
function escapeHtml(s) {
  var d = document.createElement('div');
  d.textContent = s == null ? '' : String(s);
  return d.innerHTML;
}

/**
 * Extract visitor's name from user input
 * Looks for patterns like "my name is John" or "call me Sarah"
 * Guards against capturing common non-name phrases
 * @param {string} text - The user's input text
 * @returns {string|null} - The extracted name in Title Case, or null if not found
 */
function detectVisitorName(text) {
  var m = text.match(/\b(?:my name is|call me|this is)\s+([a-zA-Z][a-zA-Z]{1,18}(?:\s[a-zA-Z][a-zA-Z]{1,18})?)\b/i);
  if (!m) return null;
  var name = m[1].trim();
  // Guard against capturing common non-name phrases that slip past the pattern
  if (/^(a|an|the|not|just|here|good|fine|ok|okay|great|nice|cool)\b/i.test(name)) return null;
  return name.split(' ').map(function (w) { return w.charAt(0).toUpperCase() + w.slice(1).toLowerCase(); }).join(' ');
}

/**
 * Escape special regex characters for safe pattern matching
 * @private
 * @param {string} s - The string to escape
 * @returns {string} - The escaped regex-safe string
 */
function escapeRegex(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Find the best matching intent from a knowledge base based on user input
 * Uses two-pass matching: exact word-boundary first, then loose substring
 * @param {string} userText - The user's input text
 * @param {Array} knowledgeBase - Array of intent objects with keywords and metadata
 * @returns {Object|null} - The best matching intent object, or null if no match
 */
function findBestIntent(userText, knowledgeBase) {
  var text = userText.toLowerCase().trim();
  var best = null, bestScore = 0;

  // Pass 1: exact word-boundary matches, weighted by phrase specificity
  // (a 3-word keyword phrase matching is a much stronger signal than a
  // single common word, so it's worth more toward the intent's score).
  knowledgeBase.forEach(function (intent) {
    var score = 0;
    intent.keywords.forEach(function (kw) {
      var re = new RegExp('\\b' + escapeRegex(kw.toLowerCase()) + '\\b', 'i');
      if (re.test(text)) score += kw.trim().split(/\s+/).length;
    });
    if (score > bestScore) { bestScore = score; best = intent; }
  });
  if (best) return best;

  // Pass 2: looser substring fallback (catches typos / slightly different
  // phrasing that Pass 1's word-boundary matching would miss entirely).
  knowledgeBase.forEach(function (intent) {
    var score = 0;
    intent.keywords.forEach(function (kw) {
      if (kw.length > 3 && text.indexOf(kw.toLowerCase()) !== -1) score += kw.trim().split(/\s+/).length;
    });
    if (score > bestScore) { bestScore = score; best = intent; }
  });
  return best;
}

/**
 * Simple ROT13 encoding/decoding for light obfuscation of contact info
 * This deters simple email scrapers and page-source harvesters but is not cryptographically secure
 * Used for email and phone numbers to reduce spam/robocalls from automated collection
 * @param {string} s - The string to encode/decode
 * @returns {string} - The ROT13 result
 */
function rot13(s) {
  return String(s).replace(/[a-zA-Z]/g, function(c) {
    return String.fromCharCode((c <= 'Z' ? 90 : 122) >= (c = c.charCodeAt(0) + 13) ? c : c - 26);
  });
}

/**
 * Obfuscate contact information for storage in page source
 * Use rot13 on email and phone to prevent simple email/phone scrapers
 * @param {string} email - Plain email address
 * @param {string} phone - Plain phone number
 * @returns {Object} - Object with obfuscated email and phone
 */
function obfuscateContact(email, phone) {
  return {
    email: rot13(email),
    phone: rot13(phone)
  };
}

/**
 * Deobfuscate contact information at runtime
 * Decodes rot13 email/phone only when needed for display
 * @param {string} obfuscatedEmail - ROT13-encoded email
 * @param {string} obfuscatedPhone - ROT13-encoded phone
 * @returns {Object} - Object with decoded email and phone
 */
function deobfuscateContact(obfuscatedEmail, obfuscatedPhone) {
  return {
    email: rot13(obfuscatedEmail),
    phone: rot13(obfuscatedPhone)
  };
}

// Export for testing (Node.js / Jest)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    escapeHtml: escapeHtml,
    detectVisitorName: detectVisitorName,
    findBestIntent: findBestIntent,
    rot13: rot13,
    obfuscateContact: obfuscateContact,
    deobfuscateContact: deobfuscateContact
  };
}
