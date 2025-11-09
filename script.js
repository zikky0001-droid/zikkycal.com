// script.js
// Consolidated script: menu/hamburger, menu actions, and calculator logic.

// ===== THEME MANAGEMENT =====
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// Check for saved theme preference or default to dark
const savedTheme = localStorage.getItem('calculator-theme');
if (savedTheme === 'light') {
  body.classList.add('light-mode');
}

// Toggle theme function
function toggleTheme() {
  body.classList.toggle('light-mode');
  const isLightMode = body.classList.contains('light-mode');
  localStorage.setItem('calculator-theme', isLightMode ? 'light' : 'dark');
}

// Event listener for toggle
if (themeToggle) {
  themeToggle.addEventListener('click', toggleTheme);
}

// Optional: Add keyboard shortcut (Alt+T)
document.addEventListener('keydown', (e) => {
  if (e.altKey && e.key === 't') {
    toggleTheme();
    e.preventDefault();
  }
});

/* ----------------------------
   Mini Screen Popup Function
   ---------------------------- */
function showMiniScreen(message) {
  // Remove existing mini screen if any
  const existingMiniScreen = document.getElementById('mini-screen-popup');
  if (existingMiniScreen) {
    existingMiniScreen.remove();
  }

  // Create mini screen element
  const miniScreen = document.createElement('div');
  miniScreen.id = 'mini-screen-popup';
  miniScreen.style.cssText = `
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 20px 30px;
    border-radius: 15px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    z-index: 10000;
    font-family: Arial, sans-serif;
    font-size: 16px;
    font-weight: bold;
    text-align: center;
    max-width: 80%;
    border: 2px solid rgba(255, 255, 255, 0.2);
    cursor: pointer;
  `;

  // Add CSS animation if not already added
  if (!document.querySelector('#mini-screen-styles')) {
    const style = document.createElement('style');
    style.id = 'mini-screen-styles';
    style.textContent = `
      @keyframes popIn {
        0% { transform: translate(-50%, -50%) scale(0.5); opacity: 0; }
        70% { transform: translate(-50%, -50%) scale(1.1); opacity: 1; }
        100% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
      }
      @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
      }
    `;
    document.head.appendChild(style);
  }

  // Add message
  miniScreen.textContent = message;

  // Add to document
  document.body.appendChild(miniScreen);

  // Auto remove after 3 seconds
  setTimeout(function() {
    miniScreen.style.animation = 'fadeOut 0.5s ease-in';
    setTimeout(function() {
      if (miniScreen.parentNode) {
        miniScreen.remove();
      }
    }, 500);
  }, 3000);

  // Also remove on click
  miniScreen.addEventListener('click', function() {
    miniScreen.style.animation = 'fadeOut 0.3s ease-in';
    setTimeout(function() {
      if (miniScreen.parentNode) {
        miniScreen.remove();
      }
    }, 300);
  });
}

/* ----------------------------
   Hamburger & Overlay
   ---------------------------- */
(function() {
  const menuToggle = document.getElementById('menu-toggle');
  const primaryNav = document.getElementById('primary-nav');
  const overlay = document.getElementById('menu-overlay');

  if (!menuToggle || !primaryNav || !overlay) {
    console.log('Menu elements not found');
    return;
  }

  // Initialize state
  overlay.hidden = true;
  primaryNav.setAttribute('aria-hidden', 'true');
  menuToggle.setAttribute('aria-expanded', 'false');

  function openMenu() {
    menuToggle.classList.add('open');
    menuToggle.setAttribute('aria-expanded', 'true');
    primaryNav.classList.add('open');
    primaryNav.setAttribute('aria-hidden', 'false');
    overlay.hidden = false;
    
    // Focus management for accessibility
    var firstFocusable = primaryNav.querySelector('a, button');
    if (firstFocusable) {
      setTimeout(function() {
        firstFocusable.focus();
      }, 100);
    }
  }

  function closeMenu() {
    menuToggle.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    primaryNav.classList.remove('open');
    primaryNav.setAttribute('aria-hidden', 'true');
    overlay.hidden = true;
    
    // Return focus to menu toggle
    setTimeout(function() {
      if (menuToggle) menuToggle.focus();
    }, 100);
  }

  // Toggle menu on button click
  menuToggle.addEventListener('click', function() {
    var expanded = menuToggle.getAttribute('aria-expanded') === 'true';
    if (expanded) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  // Close menu on overlay click
  overlay.addEventListener('click', closeMenu);

  // Close menu on Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      var expanded = menuToggle.getAttribute('aria-expanded') === 'true';
      if (expanded) {
        closeMenu();
      }
    }
  });

  // Close menu when clicking on menu links/buttons
  primaryNav.addEventListener('click', function(e) {
    if (e.target && (e.target.tagName === 'A' || e.target.tagName === 'BUTTON')) {
      setTimeout(closeMenu, 10);
    }
  });
})();

/* ----------------------------
   Menu actions (Like / Share / Comment / WhatsApp)
   ---------------------------- */
(function() {
  const menuLikeBtn = document.getElementById('menu-like');
  const menuCommentBtn = document.getElementById('menu-comment');
  const menuWhatsApp = document.getElementById('menu-whatsapp');
  const shareBtn = document.getElementById('share-btn');
  const licenseLink = document.getElementById('license-link');

  // Initialize states
  var isLiked = false;
  var isCommented = false;

  // Update UI functions
  function updateLikeUI() {
    if (!menuLikeBtn) return;
    var pressed = isLiked ? 'true' : 'false';
    var text = isLiked ? '❤️ Liked' : '👍 Like';
    menuLikeBtn.setAttribute('aria-pressed', pressed);
    menuLikeBtn.textContent = text;
    menuLikeBtn.style.backgroundColor = isLiked ? '#ffcccc' : '#d4edda';
  }
  
  function updateCommentUI() {
    if (!menuCommentBtn) return;
    var pressed = isCommented ? 'true' : 'false';
    var text = isCommented ? '🚀Sent ' : '💬 Comment';
    menuCommentBtn.setAttribute('aria-pressed', pressed);
    menuCommentBtn.textContent = text;
    menuCommentBtn.style.backgroundColor = isCommented ? '#fff3cd' : '#fff3cd';
  }
  
  // Like button
  if (menuLikeBtn) {
    menuLikeBtn.addEventListener('click', function() {
      isLiked = !isLiked;
      updateLikeUI();
      showMiniScreen(isLiked ? 'Thanks, ZIKKY Loves You Too😘😊' : 'Like removed(ZIKKY Is Sad😔)');
    });
  }

   // Comment button
  if (menuCommentBtn) {
    menuCommentBtn.addEventListener('click', function() {
      isCommented = !isCommented;
      updateCommentUI();
      showMiniScreen(isCommented ? 'Comment sending!...' : 'Comment removed');
    });
  }

  // WhatsApp link
  if (menuWhatsApp) {
    menuWhatsApp.addEventListener('click', function(e) {
      e.preventDefault();
      var url = this.href;
      showMiniScreen('Opening WhatsApp...');
      setTimeout(function() {
        window.open(url, '_blank');
      }, 500);
    });
  }

  // Share button
  if (shareBtn) {
    shareBtn.addEventListener('click', function() {
      showShareDialog();
    });
  }

  // License link
  if (licenseLink) {
    licenseLink.addEventListener('click', function(e) {
      e.preventDefault();
      showLicenseDialog();
    });
  }
})();

/* ----------------------------
   Share Dialog
   ---------------------------- */
(function() {
  const shareDialog = document.getElementById('share-dialog');
  const closeShareDialog = document.getElementById('close-share-dialog');
  const nativeShareBtn = document.getElementById('native-share-btn');
  const copyLinkBtn = document.getElementById('copy-link-btn');
  const sendDevicesBtn = document.querySelector('.share-option[data-share="send-devices"]');

  // Close dialog
  function closeShareDialogFunc() {
    shareDialog.hidden = true;
  }

  // Open dialog
  function openShareDialog() {
    shareDialog.hidden = false;
  }

  // Close button
  if (closeShareDialog) {
    closeShareDialog.addEventListener('click', closeShareDialogFunc);
  }

  // Close on Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && !shareDialog.hidden) {
      closeShareDialogFunc();
    }
  });

  // Close on overlay click
  shareDialog.addEventListener('click', function(e) {
    if (e.target === shareDialog) {
      closeShareDialogFunc();
    }
  });

  // Native share
  if (nativeShareBtn) {
    nativeShareBtn.addEventListener('click', function() {
      if (navigator.share) {
        navigator.share({
          title: 'ZikkyCal Calculator',
          text: 'Check out ZikkyCal, a smart calculator!',
          url: 'https://github.com/zikky0001-droid/zikkycal.com'
        })
        .then(function() {
          showMiniScreen('Shared successfully!');
          closeShareDialogFunc();
        })
        .catch(function(error) {
          console.log('Error sharing:', error);
          showMiniScreen('Share cancelled or failed');
        });
      } else {
        showMiniScreen('Web Share not supported on this device');
      }
    });
  }

  // Copy link
  if (copyLinkBtn) {
    copyLinkBtn.addEventListener('click', function() {
      var url = 'https://github.com/zikky0001-droid/zikkycal.com';
      navigator.clipboard.writeText(url).then(function() {
        showMiniScreen('Link copied to clipboard!');
        closeShareDialogFunc();
      }, function() {
        // Fallback for older browsers
        var textArea = document.createElement('textarea');
        textArea.value = url;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        showMiniScreen('Link copied to clipboard!');
        closeShareDialogFunc();
      });
    });
  }

  // Send to devices
  if (sendDevicesBtn) {
    sendDevicesBtn.addEventListener('click', function() {
      showMiniScreen('Send to devices feature would open here');
    });
  }

  // Expose open function globally
  window.showShareDialog = openShareDialog;
})();

/* ----------------------------
   About Dialog
   ---------------------------- */
(function() {
  const aboutDialog = document.getElementById('about-dialog');
  const closeAboutDialog = document.getElementById('close-about-dialog');
  const aboutLink = document.getElementById('about-link');

  // Close dialog
  function closeAboutDialogFunc() {
    aboutDialog.hidden = true;
  }

  // Open dialog
  function openAboutDialog() {
    aboutDialog.hidden = false;
  }

  // Close button
  if (closeAboutDialog) {
    closeAboutDialog.addEventListener('click', closeAboutDialogFunc);
  }

  // Close on Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && !aboutDialog.hidden) {
      closeAboutDialogFunc();
    }
  });

  // Close on overlay click
  aboutDialog.addEventListener('click', function(e) {
    if (e.target === aboutDialog) {
      closeAboutDialogFunc();
    }
  });

  // About link
  if (aboutLink) {
    aboutLink.addEventListener('click', function(e) {
      e.preventDefault();
      openAboutDialog();
    });
  }
})();

/* ----------------------------
   License Dialog
   ---------------------------- */
(function() {
  const licenseDialog = document.getElementById('license-dialog');
  const closeLicenseDialog = document.getElementById('close-license-dialog');

  // Close dialog
  function closeLicenseDialogFunc() {
    licenseDialog.hidden = true;
  }

  // Open dialog
  function openLicenseDialog() {
    licenseDialog.hidden = false;
  }

  // Close button
  if (closeLicenseDialog) {
    closeLicenseDialog.addEventListener('click', closeLicenseDialogFunc);
  }

  // Close on Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && !licenseDialog.hidden) {
      closeLicenseDialogFunc();
    }
  });

  // Close on overlay click
  licenseDialog.addEventListener('click', function(e) {
    if (e.target === licenseDialog) {
      closeLicenseDialogFunc();
    }
  });

  // Expose open function globally
  window.showLicenseDialog = openLicenseDialog;
})();

/* ----------------------------
   Calculator Logic
   ---------------------------- */
(function() {
  const display = document.getElementById('display');
  const buttons = document.querySelectorAll('.calculator-buttons button');
  const clearBtn = document.getElementById('clear');
  const delBtn = document.getElementById('del');
  const equalsBtn = document.getElementById('equals');

  let currentInput = '';
  let operator = null;
  let previousInput = '';
  let shouldResetDisplay = false;

  // Update display
  function updateDisplay(value) {
    display.value = value;
  }

  // Reset calculator
  function resetCalculator() {
    currentInput = '';
    previousInput = '';
    operator = null;
    shouldResetDisplay = false;
    updateDisplay('0');
  }

  // Handle number and operator inputs
  function handleInput(value) {
    if (shouldResetDisplay) {
      currentInput = '';
      shouldResetDisplay = false;
    }

    if (value === '.' && currentInput.includes('.')) {
      return;
    }

    if (['+', '-', '*', '/'].includes(value)) {
      if (currentInput === '' && previousInput !== '') {
        operator = value;
        return;
      }
      
      if (currentInput !== '') {
        if (previousInput !== '') {
          calculate();
        }
        operator = value;
        previousInput = currentInput;
        currentInput = '';
      }
      return;
    }

    if (currentInput === '0' && value !== '.') {
      currentInput = value;
    } else {
      currentInput += value;
    }

    updateDisplay(currentInput);
  }

  // Handle special operations
  function handleSpecialOperation(action) {
    if (shouldResetDisplay && previousInput !== '') {
      currentInput = previousInput;
      shouldResetDisplay = false;
    }

    let result;
    switch (action) {
      case 'square':
        if (currentInput === '' && previousInput !== '') {
          currentInput = previousInput;
        }
        result = Math.pow(parseFloat(currentInput || '0'), 2);
        break;
      case 'sqrt':
        if (currentInput === '' && previousInput !== '') {
          currentInput = previousInput;
        }
        result = Math.sqrt(parseFloat(currentInput || '0'));
        break;
      case 'power':
        if (currentInput === '' && previousInput !== '') {
          currentInput = previousInput;
        }
        operator = '^';
        previousInput = currentInput;
        currentInput = '';
        updateDisplay(currentInput);
        return;
      case 'paren':
        if (currentInput.includes('(') && !currentInput.includes(')')) {
          currentInput += ')';
        } else if (!currentInput.includes('(') && !currentInput.includes(')')) {
          currentInput = '(' + currentInput;
        } else {
          currentInput = '';
        }
        updateDisplay(currentInput);
        return;
      default:
        return;
    }

    currentInput = result.toString();
    updateDisplay(currentInput);
    shouldResetDisplay = true;
  }

  // Perform calculation
  function calculate() {
    if (previousInput === '' || currentInput === '' || operator === null) {
      return;
    }

    let prev = parseFloat(previousInput);
    let current = parseFloat(currentInput);
    let result;

    switch (operator) {
      case '+':
        result = prev + current;
        break;
      case '-':
        result = prev - current;
        break;
      case '*':
        result = prev * current;
        break;
      case '/':
        result = prev / current;
        break;
      case '^':
        result = Math.pow(prev, current);
        break;
      default:
        return;
    }

    currentInput = result.toString();
    operator = null;
    previousInput = '';
    shouldResetDisplay = true;
    updateDisplay(currentInput);
  }

  // Event listeners for buttons
  buttons.forEach(button => {
    button.addEventListener('click', () => {
      const value = button.getAttribute('data-value');
      const action = button.getAttribute('data-action');

      if (value) {
        handleInput(value);
      } else if (action) {
        handleSpecialOperation(action);
      }
    });
  });

  // Clear button
  if (clearBtn) {
    clearBtn.addEventListener('click', resetCalculator);
  }

  // Delete button
  if (delBtn) {
    delBtn.addEventListener('click', () => {
      if (shouldResetDisplay) {
        resetCalculator();
      } else {
        currentInput = currentInput.slice(0, -1);
        updateDisplay(currentInput || '0');
      }
    });
  }

  // Equals button
  if (equalsBtn) {
    equalsBtn.addEventListener('click', () => {
      if (previousInput !== '' && currentInput !== '' && operator !== null) {
        calculate();
      }
    });
  }

  // Keyboard support
  document.addEventListener('keydown', (e) => {
    if (e.key >= '0' && e.key <= '9' || e.key === '.') {
      handleInput(e.key);
    } else if (['+', '-', '*', '/'].includes(e.key)) {
      handleInput(e.key);
    } else if (e.key === 'Enter' || e.key === '=') {
      e.preventDefault();
      if (previousInput !== '' && currentInput !== '' && operator !== null) {
        calculate();
      }
    } else if (e.key === 'Escape' || e.key === 'Delete') {
      resetCalculator();
    } else if (e.key === 'Backspace') {
      currentInput = currentInput.slice(0, -1);
      updateDisplay(currentInput || '0');
    }
  });

  // Initialize calculator
  resetCalculator();
})();

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js')
    .then(() => console.log('Service Worker registered'))
    .catch(error => console.error('Service Worker registration failed:', error));
}