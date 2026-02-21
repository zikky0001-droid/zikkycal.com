// ===== MATRIX RAIN EFFECT =====
const canvas = document.getElementById('matrix');
const ctx = canvas.getContext('2d');

let width, height;
let particles = [];
let matrixAnimationFrame;

function initMatrix() {
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;
  
  const columns = Math.floor(width / 20);
  particles = [];
  
  for (let i = 0; i < columns; i++) {
    particles[i] = {
      x: i * 20,
      y: Math.random() * height,
      speed: 1 + Math.random() * 3,
      chars: '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン'
    };
  }
}

function drawMatrix() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
  ctx.fillRect(0, 0, width, height);
  
  ctx.fillStyle = '#0f0';
  ctx.font = '15px monospace';
  
  particles.forEach(p => {
    const char = p.chars[Math.floor(Math.random() * p.chars.length)];
    ctx.fillText(char, p.x, p.y);
    
    p.y += p.speed;
    if (p.y > height) {
      p.y = 0;
    }
  });
  
  matrixAnimationFrame = requestAnimationFrame(drawMatrix);
}

// ===== STARFIELD EFFECT =====
const starsCanvas = document.getElementById('stars');
const starsCtx = starsCanvas.getContext('2d');
let stars = [];
let starsAnimationFrame;

function initStars() {
  starsCanvas.width = window.innerWidth;
  starsCanvas.height = window.innerHeight;
  
  stars = [];
  for (let i = 0; i < 200; i++) {
    stars.push({
      x: Math.random() * starsCanvas.width,
      y: Math.random() * starsCanvas.height,
      radius: Math.random() * 2,
      speed: 0.5 + Math.random() * 2
    });
  }
}

function drawStars() {
  starsCtx.clearRect(0, 0, starsCanvas.width, starsCanvas.height);
  starsCtx.fillStyle = 'white';
  
  stars.forEach(s => {
    starsCtx.beginPath();
    starsCtx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
    starsCtx.fill();
    
    s.y += s.speed;
    if (s.y > starsCanvas.height) {
      s.y = 0;
      s.x = Math.random() * starsCanvas.width;
    }
  });
  
  starsAnimationFrame = requestAnimationFrame(drawStars);
}

// ===== CURSOR GLOW =====
const cursorGlow = document.getElementById('cursorGlow');

document.addEventListener('mousemove', (e) => {
  cursorGlow.style.left = e.clientX + 'px';
  cursorGlow.style.top = e.clientY + 'px';
});

// ===== BOOT SEQUENCE =====
const bootScreen = document.getElementById('boot');
const bootText = document.getElementById('bootText');
const welcomeScreen = document.getElementById('welcome');
const enterBtn = document.getElementById('enterBtn');

const bootMessages = [
  '> SYSTEM INITIALIZATION v2.0',
  '> CPU: QUANTUM PROCESSOR DETECTED',
  '> RAM: 8192 GB ONLINE',
  '> GPU: NEURAL NETWORK ACTIVATED',
  '> MATRIX INTERFACE LOADING...',
  '',
  '> 🔴 TAPPING INTO MATRIX REALM...',
  '> [!] DETECTING INTRUSION PROTOCOLS...',
  '> [!] BYPASSING CORPORATE FIREWALL...',
  '> [!] EXPLOITING CVE-2025-1337... [SUCCESS]',
  '',
  '> ⚡ DOWNLOADING BINARY FISSION',
  '> 00101110 01101001 01101110 01101001 01110100',
  '> 01101001 01100001 01101100 01101001 01111010',
  '> 01101001 01101110 01100111 00101110 00101110',
  '> 00101110 01101101 01100001 01110100 01110010',
  '> 01101001 01111000 00101110 01100100 01101111',
  '> 01101101 01100001 01101001 01101110',
  '',
  '> DECODING... [████████░░░░░░░░] 40%',
  '> DECODING... [████████████░░░░] 70%',
  '> DECODING... [████████████████] 100%',
  '',
  '> ⚠️ YOU ARE NOW PERMITTED TO TRESPASS THIS DOMAIN',
  '> ⚠️ ALL ACTIVITIES ARE BEING MONITORED',
  '> ⚠️ PROCEED WITH CAUTION',
  '',
  '> INITIALIZING CALCULATOR ENGINE...',
  '> LOADING TRIGONOMETRIC FUNCTIONS... [OK]',
  '> LOADING LOGARITHMIC FUNCTIONS... [OK]',
  '> LOADING MATRIX VISUALIZATION... [OK]',
  '',
  '> ESTABLISHING SECURE CONNECTION...',
  '> CONNECTION ESTABLISHED [AES-256 ENCRYPTED]',
  '> IP: 192.168.xxx.xxx [HIDDEN]',
  '> LOCATION: UNKNOWN [PROXY ACTIVE]',
  '',
  '> ⚡ SYSTEM READY 🎉',
  '> ⚡ WELCOME TO THE MATRIX ZONE 👨‍💻',
  '> PRESS ENTER TO ACTIVATE...'
];

let bootIndex = 0;

function typeBootMessage() {
  if (bootIndex < bootMessages.length) {
    bootText.innerHTML += bootMessages[bootIndex] + '\n';
    bootIndex++;
    setTimeout(typeBootMessage, 200);
  } else {
    setTimeout(() => {
      bootScreen.style.display = 'none';
      enterBtn.style.display = 'block';
    }, 1000);
  }
}

// ===== DYNAMIC DATE & TIME FUNCTION =====
function updateDateTime() {
  const now = new Date();
  
  // Format: DD/MM/YYYY
  const day = String(now.getDate()).padStart(2, '0');
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const year = now.getFullYear();
  const dateString = `${day}/${month}/${year}`;
  
  // Format: HH:MM:SS
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  const timeString = `${hours}:${minutes}:${seconds}`;
  
  // Update header date/time displays
  const dateEl = document.getElementById('currentDate');
  const timeEl = document.getElementById('currentTime');
  if (dateEl) dateEl.textContent = dateString;
  if (timeEl) timeEl.textContent = timeString;

  // UPDATE MENU DATE/TIME - SHOWING SECONDS
  const menuDate = document.getElementById('menuDate');
  const menuTime = document.getElementById('menuTime');
  if (menuDate) menuDate.textContent = dateString;
  if (menuTime) menuTime.textContent = timeString;

  // Update copyright with dynamic year
  const startYear = 2025;
  const yearText = year > startYear ? `${startYear}-${year}` : startYear;
  
  document.querySelectorAll('.menu-footer h6, footer h6, #copyright-text').forEach(el => {
    if (el) {
      el.innerHTML = `&copy; ${yearText} ZIKKY MATRIX CALCULATOR. All Rights Reserved.`;
    }
  });
  
  // Update license year
  const licenseYearEl = document.getElementById('license-year');
  if (licenseYearEl) licenseYearEl.textContent = year;
  
  // Update system uptime
  const uptimeEl = document.getElementById('systemUptime');
  if (uptimeEl) {
    const hours = now.getHours();
    if (hours < 6) uptimeEl.textContent = 'NIGHT MODE';
    else if (hours < 12) uptimeEl.textContent = 'MORNING SESSION';
    else if (hours < 18) uptimeEl.textContent = 'DAYLIGHT ACTIVE';
    else uptimeEl.textContent = 'EVENING PROTOCOL';
  }
}

// ===== PERFORMANCE OPTIMIZATIONS =====
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Optimize resize events
const optimizedResize = debounce(() => {
  initMatrix();
  initStars();
}, 100);

// ===== START ALL ANIMATIONS =====
window.addEventListener('load', () => {
  initMatrix();
  initStars();
  drawMatrix();
  drawStars();
  typeBootMessage();
  updateDateTime();
  setInterval(updateDateTime, 1000);
});

window.addEventListener('resize', optimizedResize);

// Enter button
if (enterBtn) {
  enterBtn.addEventListener('click', () => {
    welcomeScreen.classList.add('hidden');
    showMiniScreen('🔓 ACCESS GRANTED. WELCOME TO THE MATRIX');
  });
}

// ===== THEME MANAGEMENT =====
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// Check for saved theme preference
const savedTheme = localStorage.getItem('calculator-theme');
if (savedTheme === 'light') {
  body.classList.add('light-mode');
}

function toggleTheme() {
  body.classList.toggle('light-mode');
  const isLightMode = body.classList.contains('light-mode');
  localStorage.setItem('calculator-theme', isLightMode ? 'light' : 'dark');
  showMiniScreen(isLightMode ? '☀️ LIGHT MODE ACTIVATED' : '🌙 DARK MODE ACTIVATED');
}

if (themeToggle) {
  themeToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleTheme();
  });
}

// Keyboard shortcut (Alt+T)
document.addEventListener('keydown', (e) => {
  if (e.altKey && e.key === 't') {
    toggleTheme();
    e.preventDefault();
  }
});

// ===== MINI SCREEN POPUP =====
function showMiniScreen(message, isError = false) {
  const existingMiniScreen = document.getElementById('mini-screen-popup');
  if (existingMiniScreen) {
    existingMiniScreen.remove();
  }

  const miniScreen = document.createElement('div');
  miniScreen.id = 'mini-screen-popup';
  miniScreen.style.cssText = `
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: ${isError ? 'linear-gradient(135deg, #ff4444, #ff0000)' : 'linear-gradient(135deg, #00ffff, #0088ff)'};
    color: ${isError ? 'white' : 'black'};
    padding: 15px 25px;
    border-radius: 15px;
    box-shadow: 0 0 50px ${isError ? '#ff0000' : '#00ffff'};
    z-index: 10000;
    font-family: 'Consolas', monospace;
    font-size: 14px;
    font-weight: bold;
    text-align: center;
    max-width: 80%;
    border: 2px solid ${isError ? '#ff8888' : '#ffffff'};
    cursor: pointer;
    animation: popIn 0.3s ease-out;
  `;

  miniScreen.textContent = message;
  document.body.appendChild(miniScreen);

  setTimeout(() => {
    miniScreen.style.animation = 'fadeOut 0.3s ease-in';
    setTimeout(() => miniScreen.remove(), 300);
  }, 2000);

  miniScreen.addEventListener('click', () => miniScreen.remove());
}

// ===== BUTTON GLOW EFFECT =====
let lastGlowTime = 0;

function createButtonGlow(x, y, color = '#00ffff') {
  const now = Date.now();
  if (now - lastGlowTime < 50) return; // Throttle to 20fps
  
  lastGlowTime = now;
  
  const glow = document.getElementById('buttonGlow');
  if (!glow) return;
  
  glow.style.left = x + 'px';
  glow.style.top = y + 'px';
  glow.style.background = `radial-gradient(circle, ${color} 0%, transparent 70%)`;
  glow.style.animation = 'none';
  glow.offsetHeight; // Force reflow
  glow.style.animation = 'glowPulse 0.3s ease-out';
}

// ===== HAMBURGER MENU =====
const menuToggle = document.getElementById('menu-toggle');
const primaryNav = document.getElementById('primary-nav');
const overlay = document.getElementById('menu-overlay');
const navClose = document.querySelector('.nav-close');

function openMenu() {
  menuToggle.classList.add('open');
  menuToggle.setAttribute('aria-expanded', 'true');
  primaryNav.classList.add('open');
  primaryNav.setAttribute('aria-hidden', 'false');
  overlay.hidden = false;
  document.body.style.overflow = 'hidden';
}

function closeMenu() {
  menuToggle.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
  primaryNav.classList.remove('open');
  primaryNav.setAttribute('aria-hidden', 'true');
  overlay.hidden = true;
  document.body.style.overflow = '';
}

if (menuToggle) {
  menuToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    if (primaryNav.classList.contains('open')) {
      closeMenu();
    } else {
      openMenu();
    }
  });
}

if (navClose) {
  navClose.addEventListener('click', (e) => {
    e.stopPropagation();
    closeMenu();
  });
}

if (overlay) {
  overlay.addEventListener('click', (e) => {
    e.stopPropagation();
    closeMenu();
  });
}

document.querySelectorAll('.primary-nav .menu a').forEach(link => {
  link.addEventListener('click', () => {
    setTimeout(closeMenu, 100);
  });
});

// ===== MENU ACTIONS =====
const menuLikeBtn = document.getElementById('menu-like');
const shareBtn = document.getElementById('share-btn');
const aboutLink = document.getElementById('about-link');
const licenseLink = document.getElementById('license-link');
const contactLink = document.getElementById('contact-link'); // DECLARED HERE ONCE

let isLiked = false;

if (menuLikeBtn) {
  menuLikeBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    isLiked = !isLiked;
    this.setAttribute('aria-pressed', isLiked);
    this.innerHTML = isLiked ? '<i class="fas fa-heart"></i> <span>Liked</span>' : '<i class="fas fa-thumbs-up"></i> <span>Like</span>';
    showMiniScreen(isLiked ? '❤️ THANKS FOR LIKING!' : '👍 LIKE REMOVED');
  });
}

// ===== CONTACT CONTAINER - FIXED =====
const contactContainer = document.getElementById('contact-container');
const contactIframe = document.getElementById('contact-iframe');
const closeContact = document.getElementById('close-contact');

// Use contactLink (already declared above)
if (contactLink) {
  contactLink.addEventListener('click', (e) => {
    e.preventDefault();
    closeMenu();
    
    // Load contact.html in iframe
    if (contactIframe) {
      contactIframe.src = 'contact.html';
    }
    if (contactContainer) {
      contactContainer.hidden = false;
    }
    
    // Add load event to ensure iframe content is properly displayed
    if (contactIframe) {
      contactIframe.onload = function() {
        console.log('Contact loaded successfully');
      };
    }
  });
}

if (closeContact) {
  closeContact.addEventListener('click', () => {
    if (contactContainer) contactContainer.hidden = true;
    if (contactIframe) contactIframe.src = 'about:blank';
  });
}

// Click outside to close
if (contactContainer) {
  contactContainer.addEventListener('click', (e) => {
    if (e.target === contactContainer) {
      contactContainer.hidden = true;
      if (contactIframe) contactIframe.src = 'about:blank';
    }
  });
}

// ===== SHARE DIALOG =====
const shareDialog = document.getElementById('share-dialog');
const closeShareDialog = document.getElementById('close-share-dialog');
const nativeShareBtn = document.getElementById('native-share-btn');
const copyLinkBtn = document.getElementById('copy-link-btn');

if (shareBtn) {
  shareBtn.addEventListener('click', () => {
    if (shareDialog) shareDialog.hidden = false;
    closeMenu();
  });
}

if (closeShareDialog) {
  closeShareDialog.addEventListener('click', () => {
    if (shareDialog) shareDialog.hidden = true;
  });
}

if (nativeShareBtn) {
  nativeShareBtn.addEventListener('click', () => {
    if (navigator.share) {
      navigator.share({
        title: 'ZIKKY Matrix Calculator',
        text: 'Enter the matrix of calculation!',
        url: 'https://github.com/zikky0001-droid/zikkycal.com'
      })
      .then(() => {
        showMiniScreen('✅ SHARED SUCCESSFULLY');
        if (shareDialog) shareDialog.hidden = true;
      })
      .catch(() => showMiniScreen('❌ SHARE CANCELLED'));
    } else {
      showMiniScreen('📱 WEB SHARE NOT SUPPORTED');
    }
  });
}

if (copyLinkBtn) {
  copyLinkBtn.addEventListener('click', () => {
    navigator.clipboard.writeText('https://github.com/zikky0001-droid/zikkycal.com')
      .then(() => {
        showMiniScreen('📋 LINK COPIED!');
        if (shareDialog) shareDialog.hidden = true;
      })
      .catch(() => showMiniScreen('❌ COPY FAILED'));
  });
}

// ===== ABOUT DIALOG =====
const aboutDialog = document.getElementById('about-dialog');
const closeAboutDialog = document.getElementById('close-about-dialog');

if (aboutLink) {
  aboutLink.addEventListener('click', (e) => {
    e.preventDefault();
    if (aboutDialog) aboutDialog.hidden = false;
    closeMenu();
  });
}

if (closeAboutDialog) {
  closeAboutDialog.addEventListener('click', () => {
    if (aboutDialog) aboutDialog.hidden = true;
  });
}

// ===== LICENSE DIALOG =====
const licenseDialog = document.getElementById('license-dialog');
const closeLicenseDialog = document.getElementById('close-license-dialog');

if (licenseLink) {
  licenseLink.addEventListener('click', (e) => {
    e.preventDefault();
    if (licenseDialog) licenseDialog.hidden = false;
    closeMenu();
  });
}

if (closeLicenseDialog) {
  closeLicenseDialog.addEventListener('click', () => {
    if (licenseDialog) licenseDialog.hidden = true;
  });
}

// Close dialogs on Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    if (shareDialog) shareDialog.hidden = true;
    if (aboutDialog) aboutDialog.hidden = true;
    if (licenseDialog) licenseDialog.hidden = true;
    if (contactContainer && !contactContainer.hidden) {
      contactContainer.hidden = true;
      if (contactIframe) contactIframe.src = 'about:blank';
    }
    if (primaryNav.classList.contains('open')) {
      closeMenu();
    }
  }
});

// ===== SCIENTIFIC PANEL SLIDING =====
const sciPanel = document.getElementById('sciPanel');
const sciPrev = document.getElementById('sci-prev');
const sciNext = document.getElementById('sci-next');
const sciDots = document.querySelectorAll('.sci-dot');
let currentPage = 0;
const totalPages = 3;

function updateSciPanel(index) {
  if (sciPanel) {
    sciPanel.style.transform = `translateX(-${index * 100}%)`;
  }
  sciDots.forEach((dot, i) => {
    dot.classList.toggle('active', i === index);
  });
  
  if (sciPrev) sciPrev.disabled = index === 0;
  if (sciNext) sciNext.disabled = index === totalPages - 1;
}

if (sciNext) {
  sciNext.addEventListener('click', () => {
    if (currentPage < totalPages - 1) {
      currentPage++;
      updateSciPanel(currentPage);
    }
  });
}

if (sciPrev) {
  sciPrev.addEventListener('click', () => {
    if (currentPage > 0) {
      currentPage--;
      updateSciPanel(currentPage);
    }
  });
}

sciDots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    currentPage = index;
    updateSciPanel(currentPage);
  });
});

// ===== CALCULATOR LOGIC =====
const display = document.getElementById('display');
const buttons = document.querySelectorAll('.calculator-buttons button, .sci-page button');
const clearBtn = document.getElementById('clear');
const delBtn = document.getElementById('del');
const equalsBtn = document.getElementById('equals');
const parenBtn = document.getElementById('parenBtn');

let currentInput = '0';
let operator = null;
let previousInput = '';
let shouldResetDisplay = false;
let openParens = 0;

function updateDisplay(value) {
  if (display) display.value = value || '0';
}

function handleNumber(value) {
  if (shouldResetDisplay) {
    currentInput = '';
    shouldResetDisplay = false;
  }
  
  if (currentInput === '0' && value !== '.') {
    currentInput = value;
  } else {
    currentInput += value;
  }
  
  updateDisplay(currentInput);
}

function handleOperator(value) {
  const op = value === '÷' ? '/' : value === '×' ? '*' : value === '−' ? '-' : value;
  
  if (currentInput === '' && previousInput !== '') {
    operator = op;
    return;
  }
  
  if (currentInput !== '') {
    if (previousInput !== '' && operator !== null) {
      calculate();
    }
    operator = op;
    previousInput = currentInput;
    currentInput = '';
  }
}

function calculate() {
  if (previousInput === '' || currentInput === '' || operator === null) return;
  
  let prev = parseFloat(previousInput);
  let current = parseFloat(currentInput);
  let result;
  
  switch (operator) {
    case '+': result = prev + current; break;
    case '-': result = prev - current; break;
    case '*': result = prev * current; break;
    case '/': 
      if (current === 0) {
        showMiniScreen('❌ DIVISION BY ZERO', true);
        return;
      }
      result = prev / current; 
      break;
    case '^': result = Math.pow(prev, current); break;
    default: return;
  }
  
  currentInput = result.toString();
  operator = null;
  previousInput = '';
  shouldResetDisplay = true;
  updateDisplay(currentInput);
}

// Handle parentheses
function handleParen() {
  if (shouldResetDisplay) {
    currentInput = '';
    shouldResetDisplay = false;
  }
  
  const lastChar = currentInput[currentInput.length - 1];
  
  // If we need to add multiplication before parenthesis
  if (currentInput && !isNaN(lastChar) && lastChar !== '(' && lastChar !== '.') {
    currentInput += '*';
  }
  
  if (openParens === 0 || (lastChar && !isNaN(lastChar) && lastChar !== ')')) {
    currentInput += '(';
    openParens++;
  } else {
    if (openParens > 0) {
      currentInput += ')';
      openParens--;
    } else {
      currentInput += '(';
      openParens++;
    }
  }
  
  updateDisplay(currentInput);
}

// Handle scientific functions
function handleScientific(action) {
  if (shouldResetDisplay) {
    currentInput = '';
    shouldResetDisplay = false;
  }
  
  let value = parseFloat(currentInput) || 0;
  let result;
  
  switch(action) {
    // Trig functions
    case 'sin': result = Math.sin(value * Math.PI / 180); break;
    case 'cos': result = Math.cos(value * Math.PI / 180); break;
    case 'tan': result = Math.tan(value * Math.PI / 180); break;
    case 'asin': result = Math.asin(value) * 180 / Math.PI; break;
    case 'acos': result = Math.acos(value) * 180 / Math.PI; break;
    case 'atan': result = Math.atan(value) * 180 / Math.PI; break;
    
    // Log functions
    case 'ln': 
      if (value <= 0) {
        showMiniScreen('❌ INVALID INPUT FOR LN', true);
        return;
      }
      result = Math.log(value); 
      break;
    case 'log': 
    case 'log10':
      if (value <= 0) {
        showMiniScreen('❌ INVALID INPUT FOR LOG', true);
        return;
      }
      result = Math.log10(value); 
      break;
    case 'log2':
      if (value <= 0) {
        showMiniScreen('❌ INVALID INPUT FOR LOG', true);
        return;
      }
      result = Math.log2(value); 
      break;
    case 'exp': result = Math.exp(value); break;
    case '10x': result = Math.pow(10, value); break;
    
    // Advanced functions
    case 'fact':
      if (value < 0 || !Number.isInteger(value)) {
        showMiniScreen('❌ FACTORIAL REQUIRES POSITIVE INTEGER', true);
        return;
      }
      result = 1;
      for (let i = 2; i <= value; i++) result *= i;
      break;
    case 'pi': 
      currentInput = Math.PI.toString();
      updateDisplay(currentInput);
      return;
    case 'e': 
      currentInput = Math.E.toString();
      updateDisplay(currentInput);
      return;
    case 'abs': result = Math.abs(value); break;
    case 'round': result = Math.round(value); break;
    case 'floor': result = Math.floor(value); break;
    
    // Basic specials
    case 'square': result = Math.pow(value || 0, 2); break;
    case 'sqrt': 
      if (value < 0) {
        showMiniScreen('❌ CANNOT SQRT NEGATIVE', true);
        return;
      }
      result = Math.sqrt(value || 0); 
      break;
    case 'power':
      if (currentInput) {
        operator = '^';
        previousInput = currentInput;
        currentInput = '';
        updateDisplay(previousInput + ' ^ ');
      }
      return;
    default: return;
  }
  
  currentInput = result.toString();
  shouldResetDisplay = true;
  updateDisplay(currentInput);
}

// Button click handler
if (buttons.length > 0) {
  buttons.forEach(button => {
    button.addEventListener('click', (e) => {
      e.stopPropagation();
      
      // Create glow effect
      const rect = button.getBoundingClientRect();
      const color = button.classList.contains('wide-button') ? '#ff4444' : 
                    button.id === 'equals' ? '#00ff00' : '#00ffff';
      createButtonGlow(rect.left + rect.width/2, rect.top + rect.height/2, color);
      
      const value = button.getAttribute('data-value');
      const action = button.getAttribute('data-action');
      const sci = button.getAttribute('data-sci');
      
      if (value) {
        handleNumber(value);
      } else if (action === 'paren') {
        handleParen();
      } else if (action) {
        handleScientific(action);
      } else if (sci) {
        handleScientific(sci);
      }
    });
  });
}

// Clear button
if (clearBtn) {
  clearBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    currentInput = '0';
    previousInput = '';
    operator = null;
    openParens = 0;
    shouldResetDisplay = false;
    updateDisplay('0');
    createButtonGlow(
      clearBtn.getBoundingClientRect().left + clearBtn.offsetWidth/2,
      clearBtn.getBoundingClientRect().top + clearBtn.offsetHeight/2,
      '#ff4444'
    );
    showMiniScreen('🧹 CLEARED');
  });
}

// Delete button
if (delBtn) {
  delBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    if (shouldResetDisplay) {
      currentInput = '0';
      shouldResetDisplay = false;
    } else {
      const lastChar = currentInput[currentInput.length - 1];
      if (lastChar === '(') openParens--;
      if (lastChar === ')') openParens++;
      currentInput = currentInput.slice(0, -1) || '0';
    }
    updateDisplay(currentInput);
    createButtonGlow(
      delBtn.getBoundingClientRect().left + delBtn.offsetWidth/2,
      delBtn.getBoundingClientRect().top + delBtn.offsetHeight/2,
      '#ff4444'
    );
  });
}

// Equals button
if (equalsBtn) {
  equalsBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    if (previousInput !== '' && currentInput !== '' && operator !== null) {
      calculate();
    } else if (currentInput) {
      // Just evaluate the expression
      try {
        // Safe evaluation
        const result = Function('"use strict";return (' + currentInput + ')')();
        currentInput = result.toString();
        updateDisplay(currentInput);
        shouldResetDisplay = true;
      } catch (e) {
        showMiniScreen('❌ INVALID EXPRESSION', true);
      }
    }
    createButtonGlow(
      equalsBtn.getBoundingClientRect().left + equalsBtn.offsetWidth/2,
      equalsBtn.getBoundingClientRect().top + equalsBtn.offsetHeight/2,
      '#00ff00'
    );
  });
}

// Keyboard support
document.addEventListener('keydown', (e) => {
  // Don't handle if typing in input
  if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
  
  if (e.key >= '0' && e.key <= '9' || e.key === '.') {
    handleNumber(e.key);
    e.preventDefault();
  } else if (['+', '-', '*', '/'].includes(e.key)) {
    handleOperator(e.key);
    e.preventDefault();
  } else if (e.key === 'Enter' || e.key === '=') {
    e.preventDefault();
    if (previousInput !== '' && currentInput !== '' && operator !== null) {
      calculate();
    }
  } else if (e.key === 'Escape' || e.key === 'Delete') {
    currentInput = '0';
    previousInput = '';
    operator = null;
    updateDisplay('0');
  } else if (e.key === 'Backspace') {
    if (!shouldResetDisplay) {
      currentInput = currentInput.slice(0, -1) || '0';
      updateDisplay(currentInput);
    }
  } else if (e.key === '(' || e.key === ')') {
    handleParen();
    e.preventDefault();
  }
});

// Initialize
updateDisplay('0');

// ===== TOUCH DEVICE DETECTION =====
if ('ontouchstart' in window) {
  document.documentElement.classList.add('touch-device');
}

// ===== SERVICE WORKER =====
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js')
    .then(() => console.log('✅ Service Worker registered'))
    .catch(error => console.error('❌ Service Worker registration failed:', error));
}

// ===== ADD POPUP STYLES =====
const style = document.createElement('style');
style.textContent = `
  @keyframes popIn {
    0% { transform: translate(-50%, -50%) scale(0.5); opacity: 0; }
    100% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
  }
  
  @keyframes fadeOut {
    from { opacity: 1; }
    to { opacity: 0; }
  }
`;
document.head.appendChild(style);