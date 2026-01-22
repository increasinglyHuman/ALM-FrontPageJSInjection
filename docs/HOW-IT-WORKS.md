# How It Works: An ELI5 Guide to ALM Front Page Injection

This guide explains every part of the Learning Hub injection script in plain English. If you can understand how a website works, you can understand this.

---

## Table of Contents

1. [The Big Picture](#the-big-picture)
2. [The Wrapper: Why Everything Lives in a Bubble](#the-wrapper)
3. [Configuration: The Control Panel](#configuration)
4. [Icons: Pictures Made of Math](#icons)
5. [The Iframe Popup System: Websites Inside Websites](#iframe-popup-system)
6. [The ALM Bridge: Talking to Learning Manager](#alm-bridge)
7. [Styles: Making It Look Good](#styles)
8. [Creating the Panel: Building the House](#creating-the-panel)
9. [Rendering Content: Filling the House](#rendering-content)
10. [Initialization: Starting the Engine](#initialization)
11. [How ALM Integration Actually Works](#alm-integration)
12. [Security Considerations](#security)
13. [Troubleshooting](#troubleshooting)

---

<a name="the-big-picture"></a>
## 1. The Big Picture

**What does this script do?**

![Learning Hub Panel on ALM](images/learning-hub-screenshot.png)
*The Learning Hub panel in action - floating over a live ALM instance*

Imagine the ALM front page is a house. This script adds a floating window (our Learning Hub panel) that hovers over the house. The window shows:
- Who you are (your name, avatar)
- Your learning stats (courses enrolled, completed, badges, points)
- Quick links to navigate ALM
- Buttons to open external tools (like Pop Trivia or Badge Maker)

**How does it get there?**

ALM administrators can add custom JavaScript to the platform. When the page loads, this script runs, creates the panel, and attaches it to the page. It's like hanging a picture on a wall that's already there.

---

<a name="the-wrapper"></a>
## 2. The Wrapper: Why Everything Lives in a Bubble

```javascript
(function() {
  'use strict';
  // ... all the code ...
})();
```

**ELI5:** Imagine you're playing with LEGOs, but you don't want your pieces to get mixed up with someone else's. You put all your LEGOs in a box. This code does the same thing - it puts all our code in a "box" so it doesn't accidentally interfere with ALM's own code or any other scripts on the page.

**Technical term:** This is called an IIFE (Immediately Invoked Function Expression). The `'use strict'` part tells JavaScript to be extra careful about catching mistakes.

**Why it matters for ALM:** ALM has its own JavaScript running. If we created variables with common names like `user` or `config` without this wrapper, we might accidentally overwrite ALM's variables and break things.

---

<a name="configuration"></a>
## 3. Configuration: The Control Panel

```javascript
const CONFIG = {
  panelId: 'alm-learning-hub-bb',
  iframeId: 'alm-extension-popup',
  position: { top: '80px', right: '20px' },
  width: '340px',
  extensions: {
    popQuiz: {
      url: 'https://p0qp0q.com/alm-quiz/',
      title: 'Pop Trivia',
      width: '570px',
      height: '980px'
    },
    // ... more extensions
  }
};
```

**ELI5:** This is like the settings menu in a video game. Want the panel in a different spot? Change `position`. Want it wider? Change `width`. Want to add a new extension? Add it to `extensions`.

**Key settings explained:**

| Setting | What it does | Example |
|---------|--------------|---------|
| `panelId` | The unique name for our panel (so we can find it later) | `'alm-learning-hub-bb'` |
| `iframeId` | The unique name for popup windows | `'alm-extension-popup'` |
| `position.top` | Distance from the top of the screen | `'80px'` |
| `position.right` | Distance from the right edge | `'20px'` |
| `width` | How wide the panel is | `'340px'` |
| `extensions` | External tools that can be opened | Object with URL, title, dimensions |

**Why these specific values?** The `80px` from the top gives room for ALM's header. The `340px` width fits nicely without covering important content.

---

<a name="icons"></a>
## 4. Icons: Pictures Made of Math

```javascript
const ICONS = {
  catalog: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">...</svg>`,
  learning: `<svg ...>...</svg>`,
  // ... more icons
};
```

**ELI5:** These icons aren't image files - they're instructions for drawing pictures. Imagine giving someone directions: "Draw a line from here to there, then curve around, then fill it in." That's what SVG is. The browser follows the instructions and draws the picture.

**Why SVG instead of images?**
- **Crisp at any size:** Unlike JPG or PNG, SVGs never get blurry when you zoom in
- **Tiny file size:** The "instructions" are smaller than actual image files
- **Easy to color:** We can change the color with CSS
- **No extra downloads:** Everything is right in the code

**The "Brutalist Bob" style:** These hand-drawn, slightly imperfect icons give the panel personality. They're intentionally rough around the edges - that's the aesthetic.

---

<a name="iframe-popup-system"></a>
## 5. The Iframe Popup System: Websites Inside Websites

```javascript
function createIframePopup(extension) {
  // Remove existing popup if any
  document.getElementById(CONFIG.iframeId)?.remove();
  
  const popup = document.createElement('div');
  popup.id = CONFIG.iframeId;
  popup.innerHTML = `...`;
  document.body.appendChild(popup);
  // ... event handlers
}
```

**ELI5:** An iframe is like a picture frame, but instead of a photo, it shows another website. When you click "Pop Trivia," we create a frame, put the quiz website inside it, and display it as a floating window over ALM.

**Step by step:**

1. **Remove old popup:** If a popup is already open, close it first (only one at a time)
2. **Create container:** Make a new invisible box (`div`)
3. **Add styles:** Give it a dark overlay background and center the frame
4. **Add the iframe:** Create the "picture frame" pointing to the extension's URL
5. **Add controls:** Close button, "open in new tab" button
6. **Attach to page:** Add it to the document so it appears

**The loading spinner:** When an iframe loads, there's a brief moment where it's blank. We show a spinner during this time so users know something is happening.

**Closing the popup:**
- Click the X button
- Click the dark background around it
- Press the Escape key

---

<a name="alm-bridge"></a>
## 6. The ALM Bridge: Talking to Learning Manager

This is the most important part for ALM integration - and it's far more powerful than you might expect.

**The Big Revelation:** This isn't just a customization layer - it's a full plugin architecture. Adobe has exposed the entire application layer.

```javascript
const ALMBridge = {
  isAvailable: () => typeof window.ALM !== 'undefined',
  getConfig: () => window.ALM?.getALMConfig?.() || window.ALM?.ALMConfig || {},
  isLoggedIn: () => window.ALM?.isPrimeUserLoggedIn?.() ?? false,
  
  async getUser() {
    if (!window.ALM?.getALMUser) throw new Error('getALMUser not available');
    const result = await window.ALM.getALMUser();
    return typeof result === 'string' ? JSON.parse(result) : result;
  },
  
  navigate: {
    toCatalog: () => window.ALM?.navigateToCatalogPage?.(),
    toMyLearning: () => window.ALM?.navigateToMyLearningPage?.(),
    // ... more navigation methods
  }
};
```

**ELI5:** ALM has a built-in "assistant" called `window.ALM` that knows things about the current user and can do things like navigate to different pages. Our ALMBridge is like a translator that talks to this assistant for us.

### What ALM Provides: The Full SDK

When you're on an ALM page, Adobe's code creates a special object called `window.ALM`. This isn't just a few helper functions - it's a comprehensive SDK with authentication, data access, navigation, and theming capabilities.

---

### 🔐 Authentication & Tokens

| Method | What it does | Example Return |
|--------|--------------|----------------|
| `ALM.getCsrfToken()` | CSRF protection token for secure requests | `"abc123..."` |
| `ALM.getNativeExtensionToken()` | API authentication token | `"natext_63e7a19b..."` |
| `ALM.getCommerceToken()` | E-commerce integration token | Token string |
| `ALM.isPrimeUserLoggedIn()` | Check if someone is logged in | `true` or `false` |

**Why this matters:** The `nativeExtensionToken` is the same token that headless integrations use. You essentially have headless LMS capabilities inside the headed experience.

---

### 👤 User Data

| Method | What it does | Returns |
|--------|--------------|---------|
| `ALM.getALMUser()` | Get current learner's full profile | User object |
| `ALM.updateALMUser()` | Write to user profile | - |
| `ALM.getAccountActiveFields()` | Get custom profile fields | Field definitions |

**Bonus:** The user object is also cached in `storage.storage.sessionStorage` as JSON for fast access.

### The User Object

When you call `ALM.getALMUser()`, you get back an object like this:

```javascript
{
  name: "Jane Smith",
  email: "jane.smith@company.com",
  avatarUrl: "https://...",
  enrollmentCount: 12,      // Courses enrolled in
  completedCount: 8,        // Courses completed
  badgeCount: 5,            // Badges earned
  pointsEarned: 1250        // Gamification points
}
```

---

### 🧭 Navigation API

| Method | Destination |
|--------|-------------|
| `ALM.navigateToCatalogPage()` | Course catalog |
| `ALM.navigateToMyLearningPage()` | My Learning dashboard |
| `ALM.navigateToSkillsPage()` | Skills page |
| `ALM.navigateToBadgesPage()` | Badges collection |
| `ALM.navigateToLeaderboardPage()` | Gamification leaderboard |
| `ALM.navigateToSocial()` | Social learning |
| `ALM.navigateToTrainingOverviewPage()` | Training overview |
| `ALM.navigateToCustomPage()` | Your Experience Builder pages |

**Why use these instead of links?** These methods handle routing through ALM's official navigation system - proper URL handling, history management, state preservation.

---

### ⚙️ Configuration (`ALMConfig`)

The `ALMConfig` object gives you access to the entire instance configuration:

| Property | What it contains |
|----------|------------------|
| `ALMConfig.primeApiURL` | The REST API endpoint (e.g., `https://learningmanager.adobe.com/primeapi/v2/`) |
| `ALMConfig.mountingPoints` | DOM selectors for every major component |
| `ALMConfig.themeData` | Full theme object (colors, fonts, everything) |
| `ALMConfig.widgetConfig` | Widget system configuration |

**The API endpoint is huge:** `primeApiURL` + the authentication tokens = you can call the Learning Manager REST API directly from your JavaScript.

---

### 🎨 Theme Awareness

```javascript
const theme = ALMConfig.themeData;
// Now you can read:
// - theme.primaryColor
// - theme.fontFamily
// - theme.headerBackground
// - ... everything
```

Your custom components can read the current theme and match it perfectly - no hardcoded colors needed.

---

### What You Can Build With This

You're not in a sandbox. You have:

1. **Authenticated API access** - `primeApiURL` + tokens = direct API calls
2. **User context** - Know who's logged in, personalize everything
3. **Navigation control** - Build custom UIs that route through official navigation
4. **Theme awareness** - Match the look and feel automatically
5. **DOM mounting points** - Know exactly where to inject components

**Real possibilities:**
- AI-powered recommendation widgets calling external services
- Custom dashboards aggregating data from multiple sources
- Gamification overlays with external reward systems
- Integration bridges (Slack notifications, calendar sync, CRM updates)
- Accessibility enhancements
- Analytics instrumentation
- External API mashups (weather, news, stock prices in learning context)

---

### Safety Checks (The `?.` Operator)

You'll see a lot of `?.` in the code:

```javascript
window.ALM?.getALMUser?.()
```

**ELI5:** This is like knocking before entering. The `?.` says "if this exists, continue; if not, stop and give me `undefined` instead of crashing."

Without this, if `ALM` didn't exist, the code would crash with an error. With `?.`, it gracefully handles the missing piece.

**Why `async`?** The `getUser()` function is asynchronous because it might need to fetch data from ALM's servers. We use `await` to wait for the answer before continuing.

---

<a name="styles"></a>
## 7. Styles: Making It Look Good

```javascript
function createStyles() {
  return `
    <style>
      #${CONFIG.panelId} {
        position: fixed;
        top: ${CONFIG.position.top};
        right: ${CONFIG.position.right};
        width: ${CONFIG.width};
        background: #0d0d0d;
        border-radius: 20px;
        /* ... more styles */
      }
    </style>
  `;
}
```

**ELI5:** CSS is like a makeup artist for websites. It takes plain HTML and makes it pretty - colors, spacing, shadows, animations.

**Key styling concepts used:**

| Concept | What it does | Example |
|---------|--------------|---------|
| `position: fixed` | Stays in place even when you scroll | The panel doesn't move when you scroll the page |
| `z-index: 99999` | Stacks on top of other elements | The panel appears above ALM's content |
| `border-radius` | Rounds the corners | `20px` gives smooth, modern rounded corners |
| `box-shadow` | Adds a shadow behind | Creates depth, makes panel "float" |
| `transition` | Smooth animations | Buttons smoothly change color on hover |
| `linear-gradient` | Blends two colors | The subtle gradient in backgrounds |

**Why inline styles?** By putting styles directly in the JavaScript, we ensure they're always available without needing a separate CSS file. This makes deployment simpler - one file does everything.

**The dark theme:** Colors like `#0d0d0d` (almost black), `#141414` (slightly lighter), and `rgba(255,255,255,0.06)` (barely visible white) create a sleek, modern dark interface that doesn't clash with ALM's design.

---

<a name="creating-the-panel"></a>
## 8. Creating the Panel: Building the House

```javascript
function createPanel() {
  const panel = document.createElement('div');
  panel.id = CONFIG.panelId;
  panel.innerHTML = `
    ${createStyles()}
    <div class="header">...</div>
    <div class="body" id="${CONFIG.panelId}-content">
      <div class="loading">Loading...</div>
    </div>
  `;
  return panel;
}
```

**ELI5:** This function builds the panel's structure. It's like constructing a house:
1. Create the foundation (`div`)
2. Give it an address (`id`)
3. Build the rooms inside (header, body)
4. Put a "Loading" sign up while we get the furniture

**The HTML structure:**
```
Panel (div#alm-learning-hub-bb)
├── Styles (injected CSS)
├── Header
│   ├── Title with icon
│   └── Close button
└── Body
    └── Content (filled in later)
```

---

<a name="rendering-content"></a>
## 9. Rendering Content: Filling the House

```javascript
function renderContent(container, user) {
  container.innerHTML = `
    <div class="user-card">
      <div class="avatar">${getAvatarContent(user)}</div>
      <div class="user-info">
        <h3>${user.name || 'Learner'}</h3>
        <p>${user.email || ''}</p>
      </div>
    </div>
    
    <div class="stats">
      <div class="stat"><div class="stat-val">${user.enrollmentCount}</div>...</div>
      <!-- more stats -->
    </div>
    
    <div class="actions">
      <button class="action" onclick="ALMBridge.navigate.toCatalog()">...</button>
      <!-- more actions -->
    </div>
    
    <div class="ext-section">
      <button class="ext-btn" onclick="window.openExtensionPopup('popQuiz')">...</button>
      <!-- more extensions -->
    </div>
  `;
}
```

**ELI5:** Once we have the user's information from ALM, we fill in the panel with their actual data - their name, avatar, stats, and the buttons they can click.

**Key sections:**

1. **User Card:** Shows avatar, name, and email
2. **Stats:** Four clickable stat boxes (enrolled, completed, badges, points)
3. **Quick Actions:** Navigation buttons to different ALM pages
4. **Extensions:** Buttons that open external tools in popups

**Template literals:** The backticks (`` ` ``) let us write HTML with variables mixed in using `${variable}`. Much cleaner than concatenating strings.

---

<a name="initialization"></a>
## 10. Initialization: Starting the Engine

```javascript
async function init() {
  // Remove any existing panel (prevents duplicates)
  document.getElementById(CONFIG.panelId)?.remove();
  
  // Only continue if ALM is available and user is logged in
  if (!ALMBridge.isAvailable() || !ALMBridge.isLoggedIn()) return;
  
  // Create and add the panel
  const panel = createPanel();
  document.body.appendChild(panel);
  
  // Set up close button
  document.getElementById(`${CONFIG.panelId}-close`).onclick = () => panel.remove();
  
  // Get user data and render
  const content = document.getElementById(`${CONFIG.panelId}-content`);
  try {
    const user = await ALMBridge.getUser();
    renderContent(content, user);
  } catch (e) {
    renderError(content, e.message);
  }
}

// Run when page loads
document.readyState === 'complete' ? init() : window.addEventListener('load', init);
```

**ELI5:** This is the "power button." When the page finishes loading:
1. Clean up any old panel (if you're rerunning the script)
2. Check if ALM is available and someone's logged in
3. Create the panel and add it to the page
4. Fetch the user's information
5. Fill in the panel with that information

**Error handling:** If something goes wrong (maybe ALM's API isn't responding), we show an error message instead of leaving the user confused.

**The last line:** `document.readyState === 'complete'` checks if the page already finished loading. If yes, run immediately. If no, wait for the `load` event.

---

<a name="alm-integration"></a>
## 11. How ALM Integration Actually Works

### The Injection Point

ALM allows administrators to add custom JavaScript in the admin settings. When you paste this script there, ALM includes it in every page load.

**Where it runs:** This script runs in the same context as ALM itself - meaning it has access to everything ALM has put on the page, including the `window.ALM` object.

### Timing Matters

```javascript
document.readyState === 'complete' ? init() : window.addEventListener('load', init);
```

This ensures our script runs *after* ALM has finished setting up. If we ran too early, `window.ALM` might not exist yet.

### Respecting ALM's Design

The panel uses:
- `position: fixed` - Floats over ALM content without disrupting layout
- High `z-index` - Appears above ALM elements but below critical modals
- `adobe-clean` font - Matches ALM's typography
- Dark theme - Complements ALM's design language

### Navigation Integration

When users click our navigation buttons, we call ALM's own navigation functions:

```javascript
onclick="ALMBridge.navigate.toCatalog()"
```

This means navigation works exactly like clicking ALM's own menu items - proper URL handling, history management, etc.

---

<a name="security"></a>
## 12. Security Considerations

### Same-Origin Policy

The iframe popups work because:
- If the extension URL is on a different domain, it runs in a sandbox
- Extensions cannot access ALM's page or user data
- ALM cannot access extension content

**This is good!** It means a compromised extension can't steal user data.

### What This Script CAN Access

- User information ALM explicitly provides via `window.ALM`
- The ability to add elements to the page
- The ability to navigate using ALM's navigation functions

### What This Script CANNOT Access

- Passwords or authentication tokens
- Data ALM doesn't expose via its public API
- Other users' information
- Admin-only functionality (unless you're an admin)

### Best Practices

1. **Only inject scripts you trust** - Review any custom JavaScript before adding it
2. **Use HTTPS for extensions** - Never load extension URLs over HTTP
3. **Keep it simple** - More code = more potential vulnerabilities

---

<a name="troubleshooting"></a>
## 13. Troubleshooting

### Panel doesn't appear

**Check 1:** Open browser console (F12) and look for errors
```javascript
// Try this in console:
console.log(window.ALM);  // Should not be undefined
console.log(ALMBridge.isLoggedIn());  // Should be true
```

**Check 2:** Make sure you're logged in to ALM

**Check 3:** The script might have run before ALM loaded. Try:
```javascript
window.LearningHubBB.init();
```

### Panel appears but shows "Loading" forever

**Cause:** `ALM.getALMUser()` isn't returning data

**Fix:** Check if the method exists:
```javascript
console.log(typeof window.ALM.getALMUser);  // Should be "function"
```

### Extension popup doesn't load

**Cause 1:** The extension URL is blocked by browser or firewall
**Fix:** Try opening the URL directly in a new tab

**Cause 2:** The extension blocks being iframed (X-Frame-Options header)
**Fix:** The extension needs to allow embedding, or use the "open in new tab" button

### Stats show wrong numbers

**Cause:** ALM's API might be caching old data

**Fix:** The data comes directly from ALM - check if the same numbers appear in ALM's native UI

### Panel is in the wrong position

**Fix:** Modify the CONFIG:
```javascript
const CONFIG = {
  position: { top: '100px', right: '50px' },  // Adjust these
  // ...
};
```

---

## Glossary

| Term | Simple Explanation |
|------|-------------------|
| **DOM** | The page's structure that JavaScript can modify |
| **API** | A way for programs to talk to each other |
| **Async/Await** | A way to handle operations that take time |
| **SVG** | Pictures made of instructions, not pixels |
| **Iframe** | A webpage embedded inside another webpage |
| **IIFE** | A code wrapper that runs immediately |
| **CSS** | Instructions for how things should look |
| **Event Handler** | Code that runs when something happens (click, load, etc.) |

---

## Still Have Questions?

This is a living document. If something isn't clear, that's our fault, not yours. Open an issue and we'll explain it better.

*Remember: Every expert was once a beginner. The only silly question is the one you didn't ask.*
