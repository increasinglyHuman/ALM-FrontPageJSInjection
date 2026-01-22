/**
 * DEMO: Learning Hub - Dark Theme + Brutalist Bob + Iframe Popups
 * 
 * Extensions open in floating iframe panels instead of new tabs.
 */

(function() {
  'use strict';
  
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
      badgeMaker: {
        url: 'https://www.p0qp0q.com/badgemaker/five/index.html',
        title: 'Badge Maker',
        width: '900px',
        height: '700px'
      }
    }
  };
  
  // ============================================
  // BRUTALIST BOB ICONS
  // ============================================
  
  const ICONS = {
    catalog: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"><g><path style="fill:rgb(99.2%,99.6%,99.6%);fill-opacity:1;" d="M 63.4375 29.125 C 63.4375 29.125 64.8125 29.25 64.8125 29.25 C 72.804688 35.578125 83.3125 40.722656 91.0625 47.125 C 92.34375 48.183594 93.03125 48.851562 92.125 50.5625 C 83.453125 55.957031 74.828125 63.5625 66.0625 68.625 C 63.320312 70.207031 62.941406 69.375 60.5625 67.875 C 52.082031 62.535156 43.792969 55.945312 35.5 50.3125 C 35.242188 49.625 35.136719 48.996094 35.5 48.3125 C 44.589844 41.640625 54.183594 35.597656 63.4375 29.125 Z M 63.6875 42.125 C 63.6875 42.125 53.875 48.9375 53.875 48.9375 C 53.875 48.9375 53.625 50.0625 53.625 50.0625 C 53.625 50.0625 64.1875 57.125 64.1875 57.125 C 65.414062 56.035156 74.042969 50.832031 74.25 49.9375 C 74.277344 49.824219 74.277344 49.160156 74.25 49.0625 C 74.046875 48.359375 66.0625 43.667969 65.0625 42.625 Z"/><path style="fill:rgb(98.8%,99.2%,99.2%);fill-opacity:1;" d="M 37.6875 60.75 L 48.625 68.3125 C 48.847656 69.570312 48.277344 72.65625 48.75 73.6875 C 49.25 74.777344 57.980469 79.625 58.25 80.5625 L 58.1875 93.125 L 38.9375 79.875 L 37.625 78.6875 Z"/><path style="fill:rgb(98.8%,99.2%,99.2%);fill-opacity:1;" d="M 89.9375 60.875 L 90.125 78.8125 C 83.402344 83.820312 76.425781 88.496094 69.4375 93.125 L 69.375 80.5625 C 69.640625 79.6875 78.6875 74.59375 79.125 73.5625 C 79.605469 72.421875 78.921875 69.558594 79.25 68.4375 C 79.515625 67.523438 88.636719 62.007812 89.9375 60.875 Z"/></g></svg>`,
    
    learning: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"><path style="fill:rgb(98%,99.2%,99.6%);fill-opacity:1;" d="M 85.125 27.5 C 85.125 27.5 85.5 31.875 85.5 31.875 C 85.5 31.875 82.375 35.625 82.375 35.625 C 79.414062 35.980469 77.027344 35.5625 74.5 33.6875 C 74.5 33.6875 74.375 29.625 74.375 29.625 C 77.355469 26.710938 80.894531 26.382812 85.125 27.5 Z"/><path style="fill:rgb(99.2%,99.6%,99.6%);fill-opacity:1;" d="M 95.375 51.5 C 95.375 51.5 93.5625 64.9375 93.5625 64.9375 C 91.894531 74.777344 86.574219 82.601562 80.3125 89.9375 C 77.359375 93.398438 73.375 98.613281 68.5 98.875 C 66.003906 99.011719 63.382812 96.894531 61 96.6875 C 56.453125 96.296875 52.34375 99.496094 47.875 98.5 C 41.074219 96.984375 35.605469 88.003906 32.25 82.375 C 25.578125 71.179688 23.207031 52.546875 33.0625 42.375 C 37.164062 38.144531 43.714844 35.214844 49.625 36.0625 C 53.75 36.652344 57.386719 39.753906 61.5 39.9375 C 66.09375 40.144531 70.433594 36.464844 75 36.1875 C 82.058594 35.757812 88.390625 40.042969 92.75 45.125 C 92.75 45.125 95.375 51.5 95.375 51.5 Z"/></svg>`,
    
    skills: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"><path style="fill:rgb(98%,98.4%,98.4%);fill-opacity:1;" d="M 74.875 90.75 C 73.550781 90.3125 71.679688 89.46875 70.375 88.875 C 68.15625 87.867188 66.042969 86.597656 63.9375 85.375 L 57.25 88.6875 C 59.089844 92.363281 62.074219 98.398438 66.75 94.25 C 67.070312 94.519531 68.121094 94.585938 68.1875 94.625 C 68.664062 94.898438 69.140625 95.925781 69.4375 96.125 C 69.542969 96.195312 71.703125 97.0625 71.625 96.375 C 71.6875 96.394531 71.792969 96.367188 71.875 96.375 C 64.605469 106.691406 55.984375 99.664062 52.4375 90.75 C 47.789062 92.445312 40.398438 93.535156 36.875 89.1875 C 33.632812 85.183594 34.800781 78.820312 36.25 74.3125 C 30.308594 71.601562 22.972656 66.21875 27.125 58.8125 C 28.386719 56.566406 30.75 54.96875 32.875 53.625 L 32.375 54.1875 C 33.707031 55.277344 34.972656 56.597656 36.5 57.5 C 28.84375 62.285156 30.945312 65.863281 38.1875 69.25 L 41.125 69.9375 L 45 72.4375 C 46.03125 73.558594 47.0625 74.648438 48.25 75.625 L 48.4375 76.5 L 49.5625 77.25 L 51.6875 78.875 L 52.625 80.3125 L 53.1875 81.5 L 55.125 82.875 L 55.4375 83.625 L 58.875 81.8125 L 53.75 77.75 C 53.042969 76.496094 50.859375 75.242188 50.125 74.4375 L 45 67.875 L 42.75 64.75 L 38.25 56.5 C 37.601562 55.046875 36.863281 53.253906 36.375 51.75 C 34.910156 47.234375 33.519531 41.160156 36.75 37.0625 C 40.433594 32.394531 47.640625 33.792969 52.5625 35.25 C 53.984375 32.117188 55.761719 28.507812 58.5625 26.375 C 66.195312 20.5625 72.375 28.882812 75.0625 35.375 C 79.582031 33.585938 87.089844 32.707031 90.625 36.8125 C 93.960938 40.6875 92.777344 47.261719 91.25 51.6875 C 94.273438 53.257812 97.84375 55.113281 99.875 57.9375 C 105.269531 65.445312 97.617188 71.71875 91.125 74.3125 C 92.78125 78.820312 93.9375 85.164062 90.625 89.1875 C 86.96875 93.632812 79.679688 92.335938 74.875 90.75 Z M 63.3125 30.25 C 60.859375 30.535156 58.375 35.167969 57.375 37.1875 L 63.9375 40.375 L 70 37.0625 C 68.820312 34.726562 66.425781 29.890625 63.3125 30.25 Z M 62.5625 56.75 C 72.214844 55.449219 72.175781 70.164062 62.6875 68.875 C 56.015625 67.96875 56.167969 57.613281 62.5625 56.75 Z"/></svg>`,
    
    social: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"><path style="fill:rgb(93.3%,94.9%,96.9%);fill-opacity:1;" d="M 54.625 33.75 C 64.476562 33.695312 74.335938 33.792969 84.1875 33.75 C 84.542969 33.828125 85.289062 34.472656 85.375 34.8125 C 85.644531 35.898438 85.375 39.949219 85.375 41.375 C 85.375 41.855469 85.082031 44.339844 85.4375 44.5 C 95.28125 44.386719 102.109375 55.449219 96.375 63.9375 C 93.621094 68.011719 88.707031 70.222656 83.8125 69.875 C 81.292969 75.53125 75.632812 80.464844 69.4375 81.5 C 56.398438 83.683594 43.265625 77.949219 42.125 63.5625 C 41.390625 54.289062 42.574219 43.9375 42.25 34.5625 C 42.550781 34.226562 42.984375 33.835938 43.4375 33.75 C 45.875 33.28125 51.78125 33.765625 54.625 33.75 Z M 85.4375 52.75 L 85.25 61.4375 C 91.707031 62.375 91.859375 52.359375 85.4375 52.75 Z"/><path style="fill:rgb(98.8%,99.2%,99.6%);fill-opacity:1;" d="M 99.375 83.5 C 97.421875 85.140625 95.121094 86.355469 93 87.75 C 80.707031 94.035156 66.570312 93.324219 52.9375 92.75 C 44.25 92.382812 36.992188 90.066406 29.9375 85 C 28.453125 83.933594 24.074219 81.34375 26.4375 79.5 L 43.8125 79.375 C 53.820312 89.382812 73.566406 89.128906 83.6875 79.375 L 100.8125 79.5 C 102.640625 81.125 100.632812 82.445312 99.375 83.5 Z"/></svg>`,
    
    alien: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"><path style="fill:rgb(98%,99.2%,99.6%);fill-opacity:1;" d="M 96.625 51.25 C 96.609375 51.164062 96.511719 50.714844 96.5 50.6875 C 95.980469 49.628906 93.132812 47.625 92.625 46.8125 C 92.230469 46.183594 92 45.054688 92.125 44.3125 C 92.238281 43.628906 94.933594 41.019531 92.5625 42 C 90.867188 42.703125 90.425781 46.621094 90.75 48.1875 C 90.890625 48.859375 93.914062 54.648438 94.375 55.1875 L 94.75 55 C 96.40625 59.980469 96.609375 64.316406 95.25 69.4375 L 94.375 71.5 L 94.75 69.9375 L 94.3125 70.125 C 93.976562 69.957031 93.683594 69.179688 93 69.8125 C 92.769531 70.027344 91.804688 73.394531 91.5 74.0625 C 88.660156 80.292969 83.632812 83.574219 78.8125 87.875 C 73.996094 92.171875 75.566406 92.722656 74.125 98.1875 C 73.304688 101.300781 72.40625 98.929688 71.1875 98 C 66.4375 94.367188 61.054688 94.511719 56.4375 98.25 C 55.355469 99.125 54.441406 101.492188 53.375 98.6875 C 52.863281 97.34375 53.179688 93.65625 52.875 92.0625 C 52.332031 89.222656 45.15625 85.125 42.9375 83.125 C 38.832031 79.425781 35.945312 74.605469 34.5625 69.25 L 33.25 71.875 C 30.882812 65.179688 30.847656 57.527344 34.625 51.375 L 34.125 52.5625 L 34.5625 52.5 C 35.355469 51.828125 37.203125 47.769531 37.25 46.6875 C 37.292969 45.679688 36.199219 42.074219 35.1875 41.875 C 34.855469 41.808594 34.691406 42.648438 34.75 42.9375 C 34.933594 43.835938 35.863281 44.429688 35.625 45.8125 C 35.441406 46.878906 32.246094 50.015625 31.25 50.8125 L 31.125 51.375 C 29.351562 33.832031 45.292969 20.492188 61.8125 19.625 C 79.847656 18.679688 98.398438 31.867188 96.625 51.25 Z M 37.3125 58.375 C 33.0625 59.070312 34.171875 65.636719 35.25 68.4375 C 37.921875 75.378906 45.757812 80.625 53.0625 81.25 C 58.726562 81.734375 60.75 81.226562 58.75 75.3125 C 56.191406 67.753906 46.011719 56.953125 37.3125 58.375 Z M 88.4375 58.375 C 81.21875 58.789062 73.792969 65.59375 70.5 71.6875 C 69.285156 73.941406 66.179688 80.695312 70.4375 81.25 C 79.597656 82.445312 89.425781 76.460938 92.75 67.9375 C 94.390625 63.734375 94.292969 58.039062 88.4375 58.375 Z M 61.5625 86.625 C 60.265625 86.808594 59.554688 90.09375 61.6875 89.75 C 62.6875 89.589844 62.835938 86.445312 61.5625 86.625 Z M 65.8125 86.625 C 64.996094 86.800781 64.964844 89.519531 65.8125 89.75 C 68.210938 90.402344 67.644531 86.230469 65.8125 86.625 Z"/></svg>`,
    
    cowSkull: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"><path style="fill:rgb(99.2%,99.2%,99.6%);fill-opacity:1;" d="M 34.75 29.75 C 38.101562 31.667969 41.902344 32.515625 45.375 34.1875 L 41.75 41.125 C 41.746094 40.03125 39.292969 39.589844 39.375 39.3125 L 39.0625 39.125 L 39.1875 38.625 L 37.625 38.5 C 37.210938 38.183594 35.027344 36.613281 34.8125 36.5 L 32.6875 35.875 L 32.5 36.25 C 31.992188 36.371094 31.835938 36.34375 31.375 36.125 C 30.535156 35.722656 28.222656 33.078125 27.625 32.25 C 25.09375 28.726562 23.007812 22.402344 23.5 18.0625 C 23.550781 17.601562 23.828125 15.605469 24.5 16.3125 C 24.777344 16.601562 26.292969 20.480469 26.75 21.3125 C 28.722656 24.910156 31.167969 27.699219 34.75 29.75 Z"/><path style="fill:rgb(98.4%,98.8%,99.2%);fill-opacity:1;" d="M 102.5 27.875 C 102.140625 27.660156 102.207031 27.101562 102 26.625 C 102.453125 25.632812 102.726562 25.058594 103 24 L 103.0625 24.25 L 103.25 24.0625 L 103 24 C 103.101562 23.609375 103.191406 23.296875 103.375 22.9375 C 101.5 22.136719 101.488281 24.382812 100.75 25.6875 C 98.234375 30.125 94.46875 33.042969 89.9375 35.25 C 89.800781 35.675781 90.382812 36.609375 90.375 36.6875 L 88.5625 37.875 C 87.679688 38.367188 87.382812 37.578125 87.125 39.375 C 86.546875 39.636719 85.875 39.941406 85.875 40.625 C 85.40625 39.496094 84.832031 38.445312 84.25 37.375 L 82.375 34.3125 L 82.5625 34 C 87.640625 32.003906 92.675781 30.664062 96.75 26.875 C 100.894531 23.019531 100.53125 20.117188 103.125 16.5625 C 103.242188 16.402344 103.449219 16.046875 103.6875 16.125 C 104.847656 19.636719 103.828125 24.480469 102.5 27.875 Z"/><path style="fill:rgb(98.8%,98.8%,99.6%);fill-opacity:1;" d="M 72.125 31.875 C 70.28125 32.214844 71.191406 32.476562 70.5 33.8125 C 70.996094 34.914062 71.699219 34.292969 72.4375 34.5 C 72.996094 34.65625 74.601562 35.441406 75.0625 35.5 L 76.5625 35.375 L 76.375 35 C 78.445312 35.207031 79.070312 33.71875 81.0625 35.25 C 82.332031 36.226562 83.960938 39.824219 84.375 41.375 L 84.375 41.5 C 83.933594 41.648438 83.578125 42 83.25 42.3125 L 82.9375 43 C 82.828125 43.050781 82.109375 42.824219 81.625 43.4375 L 81.5 44.1875 C 80.535156 45.652344 80.582031 45.625 80.1875 47.375 L 80.375 47.875 L 80.375 48.25 C 80.015625 51.109375 82.074219 51.601562 82.75 53.75 C 83.546875 56.289062 82.367188 59.839844 82.125 62.5 C 82.027344 61.761719 81.917969 61.875 81.375 61.5 C 81.808594 59.082031 83.046875 53.953125 78.9375 57.125 C 77.175781 58.484375 74.644531 61.816406 74.875 64.125 L 74.5625 64 C 74.257812 64.210938 73.714844 65.28125 73.3125 65.625 L 72.1875 66.125 C 70.722656 67.46875 70.445312 68.425781 69.9375 70.25 L 69.125 69.25 C 68.558594 67.875 69.554688 66.582031 70.375 65.4375 C 71.46875 63.910156 72.882812 62.925781 74.25 61.6875 C 71.839844 62.855469 70.199219 65.203125 68.9375 67.5 C 68.515625 67.527344 66.3125 59.496094 64 62.1875 L 64 45.9375 L 63.5 62.25 C 62.605469 60.796875 61.476562 62.136719 61 63.1875 C 62.023438 62.25 62.726562 60.890625 63.625 62.875 L 63.6875 65.375 L 63.9375 65.5 C 63.976562 64.542969 63.769531 61.425781 65.4375 61.875 C 66.019531 62.03125 68.445312 66.589844 68.625 67.3125 L 68.625 69.6875 L 69 69.25 L 70.125 71.25 L 70.125 71.5 C 69.890625 72.046875 69.601562 73.285156 69.625 73.9375 C 69.648438 74.597656 70.003906 77.363281 70.125 78.0625 C 70.242188 78.742188 71.335938 79.984375 71.9375 80.125 L 72.75 80 C 73.273438 80.308594 74.273438 80.507812 74.9375 80.375 L 75.8125 79.75 C 76.691406 79.554688 77.75 79.578125 78.625 79.375 C 80.21875 83.878906 76.207031 84.296875 74.25 87.6875 C 71.089844 93.164062 73.871094 106.519531 67.4375 108.625 C 63.101562 110.042969 64.765625 105.867188 64.875 103.5625 L 65 97.3125 L 64.375 96.9375 C 63.597656 95.335938 64.015625 85.976562 64 83.5 C 63.972656 78.796875 64.089844 74.078125 63.8125 69.375 C 63.664062 74.078125 63.792969 78.800781 63.75 83.5 C 63.714844 87.507812 64.136719 92.589844 63.375 96.4375 L 62.75 97.1875 C 62.113281 99.652344 63.511719 105.078125 63.25 107.8125 C 61.8125 110.5 58.164062 107.570312 57.125 105.875 C 54.03125 100.828125 56.945312 92.03125 52.5 86.3125 C 50.863281 84.203125 48.085938 83.449219 48.625 80.3125 C 49.488281 75.277344 51.617188 75.355469 48.375 69.75 L 49.3125 70.75 L 50.1875 70.5 L 50.5625 71.125 C 50.902344 71.316406 51.410156 70.757812 51.75 71.9375 L 51.625 72.6875 C 51.734375 73.011719 53.636719 74.699219 54.1875 74.625 L 54.375 74.3125 C 52.246094 69.929688 52 69.6875 52 69.6875 C 51.148438 68.847656 47.910156 68.785156 46.9375 67.375 L 47.625 68.75 C 47.226562 68.472656 46.984375 68.035156 46.75 67.625 C 45.710938 65.8125 44.222656 55.519531 44.875 53.625 L 45.125 53.125 C 45.59375 52.1875 47.378906 50.445312 47.75 49.4375 L 47.625 45.6875 L 47 44.9375 C 46.464844 43.28125 46.417969 42.285156 44.8125 41.5 L 43.625 40.75 C 44.191406 39.035156 45.523438 35.75 47.1875 34.875 C 48.867188 33.992188 49.925781 35.367188 51.75 35 C 52.867188 36.003906 53.867188 34.804688 54.8125 34.25 C 55.722656 33.714844 56.804688 34.042969 56.625 32.3125 L 55.625 32 L 56.6875 31.5 C 59.574219 31.019531 69.585938 30.890625 72.125 31.875 Z M 46.6875 56 C 46.382812 56.042969 45.9375 56.640625 45.875 56.9375 C 45.617188 58.136719 46.46875 63.503906 47 64.6875 C 48.371094 67.742188 53.710938 66.167969 52.5 61.8125 C 52.144531 60.535156 48.078125 55.804688 46.6875 56 Z"/></svg>`,
    
    arrow: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>`,
    
    close: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`,
    
    maximize: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/><line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/></svg>`
  };
  
  // ============================================
  // IFRAME POPUP SYSTEM
  // ============================================
  
  function createIframePopup(extension) {
    // Remove existing popup if any
    document.getElementById(CONFIG.iframeId)?.remove();
    
    const popup = document.createElement('div');
    popup.id = CONFIG.iframeId;
    popup.innerHTML = `
      <style>
        #${CONFIG.iframeId} {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0,0,0,0.85);
          z-index: 1000000;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: fadeIn 0.2s ease-out;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        #${CONFIG.iframeId} .popup-container {
          width: ${extension.width};
          height: ${extension.height};
          max-width: 95vw;
          max-height: 90vh;
          background: #0d0d0d;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 30px 100px rgba(0,0,0,0.8);
          border: 1px solid rgba(255,255,255,0.1);
          display: flex;
          flex-direction: column;
          animation: scaleIn 0.25s ease-out;
        }
        
        @keyframes scaleIn {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        
        #${CONFIG.iframeId} .popup-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 16px;
          background: #141414;
          border-bottom: 1px solid rgba(255,255,255,0.06);
          flex-shrink: 0;
        }
        
        #${CONFIG.iframeId} .popup-title {
          font-family: 'adobe-clean', -apple-system, sans-serif;
          font-size: 14px;
          font-weight: 600;
          color: #fff;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        
        #${CONFIG.iframeId} .popup-title .icon {
          width: 20px;
          height: 20px;
        }
        
        #${CONFIG.iframeId} .popup-actions {
          display: flex;
          gap: 8px;
        }
        
        #${CONFIG.iframeId} .popup-btn {
          background: rgba(255,255,255,0.05);
          border: none;
          color: #666;
          width: 32px;
          height: 32px;
          border-radius: 8px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
        }
        
        #${CONFIG.iframeId} .popup-btn:hover {
          background: rgba(255,255,255,0.1);
          color: #fff;
        }
        
        #${CONFIG.iframeId} .popup-btn svg {
          width: 16px;
          height: 16px;
        }
        
        #${CONFIG.iframeId} .popup-iframe-container {
          flex: 1;
          position: relative;
          background: #000;
        }
        
        #${CONFIG.iframeId} iframe {
          width: 100%;
          height: 100%;
          border: none;
          background: #fff;
        }
        
        #${CONFIG.iframeId} .loading-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: #0d0d0d;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          gap: 12px;
          color: #666;
          font-family: 'adobe-clean', -apple-system, sans-serif;
          font-size: 13px;
        }
        
        #${CONFIG.iframeId} .loading-spinner {
          width: 28px;
          height: 28px;
          border: 2px solid #222;
          border-top-color: #666;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }
        
        @keyframes spin { to { transform: rotate(360deg); } }
      </style>
      
      <div class="popup-container">
        <div class="popup-header">
          <div class="popup-title">
            <span class="icon">${extension.title === 'Pop Trivia' ? ICONS.alien : ICONS.cowSkull}</span>
            ${extension.title}
          </div>
          <div class="popup-actions">
            <button class="popup-btn" id="${CONFIG.iframeId}-newtab" title="Open in new tab">
              ${ICONS.maximize}
            </button>
            <button class="popup-btn" id="${CONFIG.iframeId}-close" title="Close">
              ${ICONS.close}
            </button>
          </div>
        </div>
        <div class="popup-iframe-container">
          <div class="loading-overlay" id="${CONFIG.iframeId}-loading">
            <div class="loading-spinner"></div>
            <div>Loading ${extension.title}...</div>
          </div>
          <iframe 
            src="${extension.url}" 
            id="${CONFIG.iframeId}-iframe"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope"
          ></iframe>
        </div>
      </div>
    `;
    
    document.body.appendChild(popup);
    
    // Event handlers
    const closePopup = () => {
      popup.style.animation = 'fadeIn 0.15s ease-out reverse';
      setTimeout(() => popup.remove(), 150);
    };
    
    // Close button
    document.getElementById(`${CONFIG.iframeId}-close`).onclick = closePopup;
    
    // Open in new tab button
    document.getElementById(`${CONFIG.iframeId}-newtab`).onclick = () => {
      window.open(extension.url, '_blank');
      closePopup();
    };
    
    // Click backdrop to close
    popup.onclick = (e) => {
      if (e.target === popup) closePopup();
    };
    
    // ESC key to close
    const escHandler = (e) => {
      if (e.key === 'Escape') {
        closePopup();
        document.removeEventListener('keydown', escHandler);
      }
    };
    document.addEventListener('keydown', escHandler);
    
    // Hide loading overlay when iframe loads
    const iframe = document.getElementById(`${CONFIG.iframeId}-iframe`);
    iframe.onload = () => {
      document.getElementById(`${CONFIG.iframeId}-loading`).style.display = 'none';
    };
    
    // Fallback: hide loading after timeout
    setTimeout(() => {
      const loading = document.getElementById(`${CONFIG.iframeId}-loading`);
      if (loading) loading.style.display = 'none';
    }, 5000);
  }
  
  // Expose globally for button onclick
  window.openExtensionPopup = (extKey) => {
    const ext = CONFIG.extensions[extKey];
    if (ext) createIframePopup(ext);
  };
  
  // ============================================
  // ALM SDK WRAPPER
  // ============================================
  
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
      toSkills: () => window.ALM?.navigateToSkillsPage?.(),
      toBadges: () => window.ALM?.navigateToBadgesPage?.(),
      toLeaderboard: () => window.ALM?.navigateToLeaderboardPage?.(),
      toSocial: () => window.ALM?.navigateToSocial?.()
    }
  };
  
  // ============================================
  // STYLES
  // ============================================
  
  function createStyles() {
    return `
      <style>
        #${CONFIG.panelId} {
          position: fixed;
          top: ${CONFIG.position.top};
          right: ${CONFIG.position.right};
          width: ${CONFIG.width};
          max-height: 85vh;
          overflow-y: auto;
          background: #0d0d0d;
          border-radius: 20px;
          box-shadow: 0 25px 80px rgba(0,0,0,0.8);
          z-index: 99999;
          font-family: 'adobe-clean', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          border: 1px solid rgba(255,255,255,0.06);
          color: #ffffff;
        }
        
        #${CONFIG.panelId} * { box-sizing: border-box; }
        
        #${CONFIG.panelId} .header {
          padding: 20px;
          border-bottom: 1px solid rgba(255,255,255,0.06);
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: linear-gradient(180deg, #141414 0%, #0d0d0d 100%);
          border-radius: 20px 20px 0 0;
        }
        
        #${CONFIG.panelId} .title {
          font-size: 15px;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        
        #${CONFIG.panelId} .title .icon { width: 28px; height: 28px; }
        
        #${CONFIG.panelId} .close-btn {
          background: rgba(255,255,255,0.05);
          border: none;
          color: #555;
          width: 32px;
          height: 32px;
          border-radius: 10px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
        }
        
        #${CONFIG.panelId} .close-btn:hover { background: rgba(255,255,255,0.1); color: #fff; }
        #${CONFIG.panelId} .close-btn svg { width: 16px; height: 16px; }
        
        #${CONFIG.panelId} .body { padding: 20px; }
        
        #${CONFIG.panelId} .user-card {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-bottom: 24px;
          padding: 18px;
          background: linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%);
          border-radius: 16px;
          border: 1px solid rgba(255,255,255,0.04);
        }
        
        #${CONFIG.panelId} .avatar {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background: linear-gradient(135deg, #333 0%, #222 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          font-weight: 700;
          overflow: hidden;
          flex-shrink: 0;
          border: 2px solid rgba(255,255,255,0.1);
        }
        
        #${CONFIG.panelId} .avatar img { width: 100%; height: 100%; object-fit: cover; }
        
        #${CONFIG.panelId} .user-info h3 { margin: 0; font-size: 16px; font-weight: 600; }
        #${CONFIG.panelId} .user-info p { margin: 4px 0 0 0; font-size: 12px; color: #999; }
        
        #${CONFIG.panelId} .stats { display: flex; gap: 10px; margin-bottom: 24px; }
        
        #${CONFIG.panelId} .stat {
          flex: 1;
          background: #141414;
          border-radius: 14px;
          padding: 16px 12px;
          text-align: center;
          cursor: pointer;
          transition: all 0.2s;
          border: 1px solid rgba(255,255,255,0.03);
        }
        
        #${CONFIG.panelId} .stat:hover {
          background: #1a1a1a;
          transform: translateY(-2px);
          border-color: rgba(255,255,255,0.08);
        }
        
        #${CONFIG.panelId} .stat-val { font-size: 26px; font-weight: 700; color: #fff; line-height: 1; }
        #${CONFIG.panelId} .stat-label { font-size: 10px; color: #999; text-transform: uppercase; letter-spacing: 0.5px; margin-top: 6px; }
        
        #${CONFIG.panelId} .section { font-size: 10px; font-weight: 600; color: #888; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 10px; }
        
        #${CONFIG.panelId} .actions { display: flex; flex-direction: column; gap: 6px; margin-bottom: 20px; }
        
        #${CONFIG.panelId} .action {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 12px 14px;
          background: #141414;
          border: 1px solid rgba(255,255,255,0.03);
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.2s;
          color: #ddd;
          font-size: 13px;
          font-family: inherit;
          text-align: left;
        }
        
        #${CONFIG.panelId} .action:hover { background: #1a1a1a; border-color: rgba(255,255,255,0.08); color: #fff; }
        #${CONFIG.panelId} .action .icon { width: 24px; height: 24px; flex-shrink: 0; }
        #${CONFIG.panelId} .action .arrow { margin-left: auto; width: 16px; height: 16px; color: #555; }
        #${CONFIG.panelId} .action:hover .arrow { color: #999; }
        
        #${CONFIG.panelId} .ext-section { padding-top: 16px; border-top: 1px solid rgba(255,255,255,0.04); }
        
        #${CONFIG.panelId} .ext-btn {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 14px 16px;
          background: linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.2s;
          color: #fff;
          font-size: 13px;
          font-family: inherit;
          text-align: left;
          width: 100%;
          margin-bottom: 8px;
        }
        
        #${CONFIG.panelId} .ext-btn:hover {
          background: linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.04) 100%);
          border-color: rgba(255,255,255,0.12);
          transform: translateY(-1px);
        }
        
        #${CONFIG.panelId} .ext-btn .icon { width: 28px; height: 28px; }
        
        #${CONFIG.panelId} .ext-btn .badge {
          margin-left: auto;
          font-size: 9px;
          padding: 4px 10px;
          background: rgba(255,255,255,0.1);
          color: #fff;
          border-radius: 12px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          font-weight: 600;
        }
        
        #${CONFIG.panelId} .loading { text-align: center; padding: 40px 20px; color: #444; }
        
        #${CONFIG.panelId} .spinner {
          width: 24px; height: 24px;
          border: 2px solid #222; border-top-color: #666;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
          margin: 0 auto 12px;
        }
        
        @keyframes spin { to { transform: rotate(360deg); } }
        
        #${CONFIG.panelId} .footer {
          padding: 14px 20px;
          text-align: center;
          font-size: 10px;
          color: #666;
          border-top: 1px solid rgba(255,255,255,0.03);
        }
      </style>
    `;
  }
  
  // ============================================
  // RENDER
  // ============================================
  
  function createPanel() {
    const panel = document.createElement('div');
    panel.id = CONFIG.panelId;
    panel.innerHTML = `
      ${createStyles()}
      <div class="header">
        <div class="title">
          <span class="icon">${ICONS.cowSkull}</span>
          Learning Hub
        </div>
        <button class="close-btn" id="${CONFIG.panelId}-close">${ICONS.close}</button>
      </div>
      <div class="body" id="${CONFIG.panelId}-content">
        <div class="loading">
          <div class="spinner"></div>
          <div>Loading...</div>
        </div>
      </div>
      <div class="footer">Experience Builder • Brutalist Bob Edition</div>
    `;
    return panel;
  }
  
  function renderContent(container, userData) {
    const attrs = userData?.data?.attributes || {};
    const name = attrs.name || 'Learner';
    const email = attrs.email || '';
    const avatarUrl = attrs.avatarUrl || null;
    const points = attrs.pointsEarned ?? '--';
    const firstName = name.split(' ')[0];
    const initials = name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
    
    container.innerHTML = `
      <div class="user-card">
        <div class="avatar">
          ${avatarUrl 
            ? `<img src="${avatarUrl}" alt="${name}" onerror="this.parentElement.textContent='${initials}'" />`
            : initials
          }
        </div>
        <div class="user-info">
          <h3>Welcome, ${firstName}</h3>
          <p>${email}</p>
        </div>
      </div>
      
      <div class="stats">
        <div class="stat" onclick="window.ALM?.navigateToLeaderboardPage?.()">
          <div class="stat-val">${points.toLocaleString?.() || points}</div>
          <div class="stat-label">Points</div>
        </div>
        <div class="stat" onclick="window.ALM?.navigateToBadgesPage?.()">
          <div class="stat-val">${attrs.badgesCount ?? '--'}</div>
          <div class="stat-label">Badges</div>
        </div>
        <div class="stat" onclick="window.ALM?.navigateToMyLearningPage?.()">
          <div class="stat-val">${attrs.enrollmentCount ?? '--'}</div>
          <div class="stat-label">Enrolled</div>
        </div>
      </div>
      
      <div class="section">Navigate</div>
      <div class="actions">
        <button class="action" onclick="window.ALM?.navigateToCatalogPage?.()">
          <span class="icon">${ICONS.catalog}</span>
          Browse Catalog
          <span class="arrow">${ICONS.arrow}</span>
        </button>
        <button class="action" onclick="window.ALM?.navigateToMyLearningPage?.()">
          <span class="icon">${ICONS.learning}</span>
          Continue Learning
          <span class="arrow">${ICONS.arrow}</span>
        </button>
        <button class="action" onclick="window.ALM?.navigateToSkillsPage?.()">
          <span class="icon">${ICONS.skills}</span>
          My Skills
          <span class="arrow">${ICONS.arrow}</span>
        </button>
        <button class="action" onclick="window.ALM?.navigateToSocial?.()">
          <span class="icon">${ICONS.social}</span>
          Social Learning
          <span class="arrow">${ICONS.arrow}</span>
        </button>
      </div>
      
      <div class="ext-section">
        <div class="section">Extensions</div>
        <button class="ext-btn" onclick="window.openExtensionPopup('popQuiz')">
          <span class="icon">${ICONS.alien}</span>
          Pop Trivia
          <span class="badge">Play</span>
        </button>
        <button class="ext-btn" onclick="window.openExtensionPopup('badgeMaker')">
          <span class="icon">${ICONS.cowSkull}</span>
          Badge Maker
          <span class="badge">Create</span>
        </button>
      </div>
    `;
  }
  
  function renderError(container, message) {
    container.innerHTML = `<div style="padding: 20px; text-align: center; color: #f44;"><p>Failed to load: ${message}</p></div>`;
  }
  
  // ============================================
  // INIT
  // ============================================
  
  async function init() {
    document.getElementById(CONFIG.panelId)?.remove();
    
    if (!ALMBridge.isAvailable() || !ALMBridge.isLoggedIn()) return;
    
    const panel = createPanel();
    document.body.appendChild(panel);
    
    document.getElementById(`${CONFIG.panelId}-close`).onclick = () => panel.remove();
    
    const content = document.getElementById(`${CONFIG.panelId}-content`);
    
    try {
      const user = await ALMBridge.getUser();
      renderContent(content, user);
    } catch (e) {
      renderError(content, e.message);
    }
  }
  
  document.readyState === 'complete' ? init() : window.addEventListener('load', init);
  window.LearningHubBB = { init, ALMBridge, openExtensionPopup: window.openExtensionPopup };
})();
