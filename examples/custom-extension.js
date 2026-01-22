/**
 * Custom Extension Template
 * 
 * Use this as a starting point for creating new extensions
 * that can be opened via the Learning Hub iframe popup system.
 */

// Add your extension to the CONFIG in learning-hub.js:
// 
// extensions: {
//   myExtension: {
//     url: 'https://your-domain.com/my-extension/',
//     title: 'My Extension',
//     width: '800px',
//     height: '600px'
//   }
// }

// Then add a button to the renderContent function:
//
// <button class="ext-btn" onclick="window.openExtensionPopup('myExtension')">
//   <span class="icon">${ICONS.bulb}</span>
//   My Extension
//   <span class="badge">Open</span>
// </button>

// Your extension HTML page should handle its own functionality.
// It will be loaded in an iframe within the ALM page context.

// Example extension page structure:
const exampleExtensionHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My ALM Extension</title>
  <style>
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: #1a1a2e;
      color: #e0e0e0;
      padding: 20px;
      min-height: 100vh;
    }
    
    .container {
      max-width: 600px;
      margin: 0 auto;
    }
    
    h1 {
      color: #fff;
      margin-bottom: 20px;
      font-size: 24px;
    }
    
    .card {
      background: #252542;
      border-radius: 12px;
      padding: 20px;
      margin-bottom: 16px;
    }
    
    .btn {
      background: linear-gradient(135deg, #eb1000, #ff4d4d);
      color: white;
      border: none;
      padding: 12px 24px;
      border-radius: 8px;
      font-size: 14px;
      cursor: pointer;
      transition: transform 0.2s, box-shadow 0.2s;
    }
    
    .btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(235, 16, 0, 0.3);
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>My Extension</h1>
    
    <div class="card">
      <p>This is a custom extension for Adobe Learning Manager.</p>
      <p style="margin-top: 12px; color: #888;">
        Build your own tools and integrate them with the Learning Hub!
      </p>
    </div>
    
    <button class="btn" onclick="doSomething()">
      Take Action
    </button>
  </div>
  
  <script>
    function doSomething() {
      alert('Extension action triggered!');
      
      // You can communicate with the parent ALM page if needed:
      // window.parent.postMessage({ type: 'extension-action', data: {} }, '*');
    }
    
    // Listen for messages from the parent page
    window.addEventListener('message', (event) => {
      // Verify origin for security
      // if (event.origin !== 'https://your-alm-instance.learningmanager.adobe.com') return;
      
      console.log('Received message from parent:', event.data);
    });
  </script>
</body>
</html>
`;

// Export for reference
if (typeof module !== 'undefined') {
  module.exports = { exampleExtensionHTML };
}
