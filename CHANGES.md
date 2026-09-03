# Pending Changes for script.js

The following changes in `script.js` are committed locally but could not be pushed via the GitHub API due to file size limits. Apply these manually or via `git push` with credentials:

## Task 1: Fix GitHub username (line ~42-48)
```js
// BEFORE:
    email: 'Ahmadaslam0904@gmail.com',
    github: 'https://github.com/ahmadaslam0904',
    githubUser: 'ahmadaslam0904',

// AFTER:
    email: 'Nuznqnfynz0904@tznvy.pbz', // Obfuscated (ROT13) — decoded at runtime
    github: 'https://github.com/Ranahmad1',
    githubUser: 'Ranahmad1',
```

## Task 1: Fix fallback project URL (line ~58)
```js
// BEFORE:
    github: 'https://github.com/ahmadaslam0904',

// AFTER:
    github: 'https://github.com/Ranahmad1',
```

## Task 4: Add rot13 + getDecodedEmail helpers (after escapeHtml function)
```js
  /* Rot13 decoder: runtime deobfuscation of contact info */
  function rot13(s) {
    return String(s).replace(/[a-zA-Z]/g, function(c) {
      return String.fromCharCode((c <= 'Z' ? 90 : 122) >= (c = c.charCodeAt(0) + 13) ? c : c - 26);
    });
  }

  function getDecodedEmail() { return rot13(owner.email); }
```

## Task 4: Use decoded email in botData (line ~1076)
```js
// BEFORE:
        email: owner.email,

// AFTER:
        email: getDecodedEmail(), // Decode ROT13 at runtime
```

All other files (utils.js, test suite, README, .gitignore, package.json, jest.config.js) are already pushed and up to date.
